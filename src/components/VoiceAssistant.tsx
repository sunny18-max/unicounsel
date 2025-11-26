import { useState, useEffect } from 'react';
import { VoiceOrb } from './VoiceOrb';
import { MatchResults } from './MatchResults';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Mic, MicOff, SkipForward } from 'lucide-react';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { questions } from '@/data/questions';
import { generateMockMatches } from '@/data/mockMatches';
import type { StudentProfile, UniversityMatch, ConversationState } from '@/types';
import { cn } from '@/lib/utils';

export const VoiceAssistant = () => {
  const [conversationState, setConversationState] = useState<ConversationState>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matches, setMatches] = useState<UniversityMatch[]>([]);
  const [textInput, setTextInput] = useState('');

  const { isListening, transcript, isSupported: voiceSupported, startListening, stopListening, resetTranscript } = useVoiceRecognition();
  const { speak, isSpeaking, cancel: cancelSpeech } = useSpeechSynthesis();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (conversationState === 'idle') {
      speak("Welcome to UniCounsel AI Assistant. I'll help you find your perfect study abroad match. Click Start to begin.");
    }
  }, []);

  useEffect(() => {
    if (transcript && isListening) {
      setTextInput(transcript);
    }
  }, [transcript, isListening]);

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

    // Save answer
    const newAnswers = { ...answers, [currentQuestion.id]: textInput.trim() };
    setAnswers(newAnswers);

    // Stop any ongoing speech
    cancelSpeech();
    stopListening();

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextInput('');
      resetTranscript();
      
      setConversationState('speaking');
      speak(questions[currentQuestionIndex + 1].text);
      
      setTimeout(() => {
        setConversationState('listening');
      }, 2000);
    } else {
      // All questions answered - generate matches
      setConversationState('processing');
      speak("Thank you! I'm now finding your perfect matches based on your profile.");
      
      setTimeout(async () => {
        const profile = createProfileFromAnswers(newAnswers);
        const generatedMatches = await generateMockMatches(profile);
        setMatches(generatedMatches);
        setConversationState('completed');
        
        speak(`Great news! I found ${generatedMatches.length} excellent matches for you. Let me show you the results.`);
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
    // Parse budget
    const budgetMatch = ans.budget?.match(/(\d+)/g) || ['20000', '40000'];
    
    return {
      name: ans.name || 'Student',
      nationality: ans.nationality || 'Unknown',
      qualification: (ans.qualification as any) || 'Undergraduate',
      marks: parseFloat(ans.marks) || 80,
      field: ans.field || 'General',
      budgetMin: parseInt(budgetMatch[0]) || 20000,
      budgetMax: parseInt(budgetMatch[1] || budgetMatch[0]) || 40000,
      englishTest: ans.english ? 'IELTS' : undefined,
      englishScore: ans.english ? parseFloat(ans.english) : undefined,
      preferredCountries: ans.countries?.split(',').map(c => c.trim()),
      gapYears: parseInt(ans.gaps) || 0
    };
  };

  if (conversationState === 'completed' && matches.length > 0) {
    return <MatchResults matches={matches} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-heading-1 text-glow-cyan mb-4">
            UniCounsel AI Assistant
          </h1>
          <p className="text-body-lg text-muted-foreground">
            {conversationState === 'idle' && "Let's find your perfect study abroad match"}
            {conversationState === 'listening' && "I'm listening..."}
            {conversationState === 'speaking' && "Speaking..."}
            {conversationState === 'processing' && "Finding your perfect matches..."}
          </p>
        </div>

        {/* Progress Bar */}
        {conversationState !== 'idle' && (
          <div className="mb-8">
            <div className="flex justify-between text-body-sm text-muted-foreground mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Voice Orb */}
        <div className="flex justify-center mb-12">
          <VoiceOrb 
            isActive={conversationState !== 'idle'} 
            isListening={isListening}
            className="w-[320px] h-[320px]"
          />
        </div>

        {/* Question Display */}
        {conversationState !== 'idle' && currentQuestion && (
          <div className="text-center mb-8">
            <h2 className="text-heading-3 text-foreground mb-4">
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
                      "min-w-[120px]",
                      textInput === option && "bg-glow-cyan text-background hover:bg-glow-cyan/90"
                    )}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={currentQuestion.placeholder || "Type your answer or speak"}
                className="w-full max-w-md mx-auto px-6 py-4 bg-card border border-border rounded-lg text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-glow-cyan"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNextQuestion();
                  }
                }}
              />
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {conversationState === 'idle' ? (
            <Button 
              size="lg"
              onClick={startConversation}
              className="bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan text-lg px-8 py-6"
            >
              Start Conversation
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
                    isListening && "bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan"
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
                className="bg-glow-blue text-white hover:bg-glow-blue/90"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Find Matches' : 'Next Question'}
              </Button>

              {!currentQuestion.required && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleSkip}
                  disabled={isSpeaking || conversationState === 'processing'}
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
          <p className="text-center text-body-sm text-warning mt-4">
            Voice recognition is not supported in your browser. Please type your answers.
          </p>
        )}
      </div>
    </div>
  );
};