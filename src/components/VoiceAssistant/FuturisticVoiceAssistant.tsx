import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParticleSystem } from './ParticleSystem';
import { GreetingAnimation } from './GreetingAnimation';
import { MatchResults } from '../MatchResults';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Mic, MicOff, SkipForward, LayoutDashboard, Home } from 'lucide-react';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';
import { useMatches } from '@/context/MatchContext';
import { questions, suggestedAnswers } from '@/data/questions';
import { SuggestedOptions } from './SuggestedOptions';
import { generateMockMatches } from '@/data/mockMatches';
import type { StudentProfile, UniversityMatch, ConversationState } from '@/types';
import { cn } from '@/lib/utils';

interface FuturisticVoiceAssistantProps {
  onComplete?: (matches: UniversityMatch[]) => void;
}

export const FuturisticVoiceAssistant = ({ onComplete }: FuturisticVoiceAssistantProps) => {
  const navigate = useNavigate();
  const { setMatches: setGlobalMatches, setStudentProfile } = useMatches();
  
  // Get user from localStorage
  const getUserName = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.name || 'Guest';
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return 'Guest';
  };
  
  const [showGreeting, setShowGreeting] = useState(true);
  const [conversationState, setConversationState] = useState<ConversationState>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matches, setMatches] = useState<UniversityMatch[]>([]);
  const [textInput, setTextInput] = useState('');

  const { isListening, transcript, isSupported: voiceSupported, startListening, stopListening, resetTranscript } = useVoiceRecognition();
  const { speak, isSpeaking, cancel: cancelSpeech } = useSpeechSynthesis();
  const audioAmplitude = useAudioAnalyzer(isListening);
  
  // Enhanced amplitude with baseline pulse when listening
  const [simulatedAmplitude, setSimulatedAmplitude] = useState(0);
  
  useEffect(() => {
    if (isListening && audioAmplitude < 0.08) {
      // Siri-like baseline pulse when listening but no strong audio
      const interval = setInterval(() => {
        setSimulatedAmplitude(Math.sin(Date.now() * 0.004) * 0.2 + 0.25);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setSimulatedAmplitude(0);
    }
  }, [isListening, audioAmplitude]);
  
  // Use higher of real or simulated amplitude for smooth transitions
  const effectiveAmplitude = Math.max(audioAmplitude, simulatedAmplitude);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const userName = getUserName();

  useEffect(() => {
    if (transcript && isListening) {
      setTextInput(transcript);
    }
  }, [transcript, isListening]);

  const handleGreetingComplete = () => {
    setShowGreeting(false);
    speak(`Hello ${userName}! I'm your AI assistant. I'll help you find your perfect study abroad match. Let's begin when you're ready.`);
  };

  const startConversation = () => {
    setConversationState('speaking');
    setCurrentQuestionIndex(0);
    speak(currentQuestion.text);
    setTimeout(() => {
      setConversationState('listening');
    }, 2000);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      setConversationState('idle');
    } else {
      resetTranscript();
      setTextInput('');
      startListening();
      setConversationState('listening');
    }
  };

  const handleNextQuestion = () => {
    if (!textInput.trim()) return;

    const newAnswers = { ...answers, [currentQuestion.id]: textInput.trim() };
    setAnswers(newAnswers);

    cancelSpeech();
    stopListening();

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextInput('');
      resetTranscript();
      
      setConversationState('speaking');
      speak(questions[currentQuestionIndex + 1].text);
      
      setTimeout(() => {
        setConversationState('listening');
      }, 2000);
    } else {
      setConversationState('processing');
      speak("Thank you! I'm now finding university matches across all your preferred countries and fields.");
      
      setTimeout(async () => {
        const profile = createProfileFromAnswers(newAnswers);
        const generatedMatches = await generateMockMatches(profile);
        setMatches(generatedMatches);
        setGlobalMatches(generatedMatches);
        setStudentProfile(profile);
        setConversationState('completed');
        
        const countries = [...new Set(generatedMatches.map(m => m.country))];
        speak(`Great news! I found ${generatedMatches.length} university matches across ${countries.length} countries including ${countries.slice(0, 3).join(', ')}. Let me show you the results.`);
      }, 3000);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextInput('');
      resetTranscript();
      cancelSpeech();
      
      setConversationState('speaking');
      speak(questions[currentQuestionIndex + 1].text);
      
      setTimeout(() => {
        setConversationState('listening');
      }, 2000);
    }
  };

  const createProfileFromAnswers = (ans: Record<string, string>): StudentProfile => {
    const budgetMatch = ans.budget?.match(/(\d+)/g) || ['20000', '40000'];
    
    // Parse countries - handle comma-separated or space-separated values
    const countriesString = ans.countries || '';
    const preferredCountries = countriesString
      .split(/[,\s]+/)
      .map(c => c.trim())
      .filter(c => c.length > 0);
    
    return {
      name: ans.name || userName,
      nationality: ans.nationality || 'Unknown',
      qualification: (ans.qualification as any) || 'Undergraduate',
      marks: parseFloat(ans.marks) || 80,
      field: ans.field || 'General',
      budgetMin: parseInt(budgetMatch[0]) || 20000,
      budgetMax: parseInt(budgetMatch[1] || budgetMatch[0]) || 40000,
      englishTest: ans.english ? 'IELTS' : undefined,
      englishScore: ans.english ? parseFloat(ans.english) : undefined,
      preferredCountries: preferredCountries.length > 0 ? preferredCountries : undefined,
      gapYears: parseInt(ans.gaps) || 0
    };
  };

  if (showGreeting) {
    return <GreetingAnimation userName={userName} onComplete={handleGreetingComplete} />;
  }

  if (conversationState === 'completed' && matches.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="absolute top-6 right-6 z-10">
          <Button
            size="lg"
            onClick={() => {
              if (onComplete) onComplete(matches);
              navigate('/dashboard');
            }}
            className="bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan"
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Go to Dashboard
          </Button>
        </div>
        <MatchResults matches={matches} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            window.location.href = '/';
          }}
          className="border-border hover:border-glow-cyan/50 backdrop-blur-sm bg-background/50"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {/* Particle System Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleSystem 
          audioAmplitude={effectiveAmplitude}
          isActive={conversationState !== 'idle'}
          isListening={isListening}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* Status Indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-md border border-glow-cyan/30">
              <div className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                conversationState === 'idle' && "bg-muted-foreground",
                conversationState === 'listening' && "bg-glow-cyan animate-pulse-glow",
                conversationState === 'speaking' && "bg-glow-blue animate-pulse-glow",
                conversationState === 'processing' && "bg-glow-teal animate-pulse-glow"
              )} />
              <span className="text-body text-foreground font-medium">
                {conversationState === 'idle' && "Ready to begin"}
                {conversationState === 'listening' && "Listening..."}
                {conversationState === 'speaking' && "Speaking..."}
                {conversationState === 'processing' && "Processing your profile..."}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          {conversationState !== 'idle' && (
            <div className="mb-8 bg-card/50 backdrop-blur-md rounded-lg p-4 border border-border/50">
              <div className="flex justify-between text-body-sm text-muted-foreground mb-2">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Question Display */}
          {conversationState !== 'idle' && currentQuestion && (
            <div className="text-center mb-8 bg-card/30 backdrop-blur-md rounded-xl p-8 border border-glow-cyan/20 shadow-xl">
              <h2 className="text-heading-3 text-foreground mb-6 glow-text-cyan">
                {currentQuestion.text}
              </h2>
              
              {currentQuestion.options ? (
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      variant={textInput === option ? "default" : "outline"}
                      onClick={() => setTextInput(option)}
                      className={cn(
                        "min-w-[120px] backdrop-blur-sm transition-all duration-300 hover:scale-105",
                        textInput === option && "bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan scale-105"
                      )}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={currentQuestion.placeholder || "Type your answer or speak"}
                    className="w-full max-w-md mx-auto px-6 py-4 bg-card/80 backdrop-blur-md border border-glow-cyan/30 rounded-lg text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-glow-cyan focus:border-transparent transition-all duration-300 shadow-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleNextQuestion();
                      }
                    }}
                  />
                  {/* Suggested Options */}
                  {suggestedAnswers[currentQuestion.id] && (
                    <SuggestedOptions
                      suggestions={suggestedAnswers[currentQuestion.id]}
                      onSelect={setTextInput}
                      selectedValue={textInput}
                    />
                  )}
                </>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4 flex-wrap">
            {conversationState === 'idle' ? (
              <Button 
                size="lg"
                onClick={startConversation}
                className="bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
              </Button>
            ) : (
              <>
                {voiceSupported && (
                  <Button
                    size="lg"
                    variant={isListening ? "default" : "outline"}
                    onClick={handleVoiceToggle}
                    disabled={isSpeaking || conversationState === 'processing'}
                    className={cn(
                      "backdrop-blur-sm transition-all duration-300",
                      isListening && "bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan scale-105"
                    )}
                  >
                    {isListening ? <MicOff className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
                    {isListening ? 'Stop' : 'Speak'}
                  </Button>
                )}
                
                <Button
                  size="lg"
                  onClick={handleNextQuestion}
                  disabled={!textInput.trim() || isSpeaking || conversationState === 'processing'}
                  className="bg-glow-blue text-white hover:bg-glow-blue/90 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Find Matches' : 'Next Question'}
                </Button>

                {!currentQuestion.required && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleSkip}
                    disabled={isSpeaking || conversationState === 'processing'}
                    className="backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <SkipForward className="mr-2 h-5 w-5" />
                    Skip
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Voice Support Warning */}
          {!voiceSupported && conversationState !== 'idle' && (
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/20 backdrop-blur-sm border border-warning/30">
                <span className="text-body-sm text-warning">
                  Voice recognition is not supported in your browser. Please type your answers.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};