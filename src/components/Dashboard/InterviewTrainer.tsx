import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Mic,
  Camera,
  Star,
  MessageSquare
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  category: string;
  tips: string[];
  sampleAnswer: string;
}

interface InterviewSession {
  type: 'university' | 'visa';
  score: number;
  completed: boolean;
  feedback: {
    content: number;
    delivery: number;
    confidence: number;
    bodyLanguage: number;
  };
}

const universityQuestions: Question[] = [
  {
    id: '1',
    question: 'Why do you want to study at our university?',
    category: 'Motivation',
    tips: [
      'Research specific programs and faculty',
      'Mention unique opportunities',
      'Connect to your career goals',
      'Be genuine and specific'
    ],
    sampleAnswer: 'I\'m particularly drawn to your university because of the renowned Computer Science program and the opportunity to work with Professor Smith on AI research. The collaborative learning environment and access to cutting-edge labs align perfectly with my goal of becoming a research scientist in machine learning.'
  },
  {
    id: '2',
    question: 'Tell me about yourself.',
    category: 'Introduction',
    tips: [
      'Keep it concise (2-3 minutes)',
      'Focus on academic and professional background',
      'Highlight relevant achievements',
      'Connect to why you\'re applying'
    ],
    sampleAnswer: 'I\'m a Computer Science graduate from XYZ University with a strong passion for artificial intelligence. During my undergraduate studies, I led a research project on natural language processing that was published in an IEEE conference. I\'ve also worked as a software engineer intern, where I developed machine learning models for predictive analytics.'
  },
  {
    id: '3',
    question: 'What are your career goals?',
    category: 'Future Plans',
    tips: [
      'Be specific but realistic',
      'Show how the program helps achieve goals',
      'Demonstrate long-term thinking',
      'Align with program strengths'
    ],
    sampleAnswer: 'My immediate goal is to complete my Master\'s degree and gain expertise in deep learning and computer vision. Long-term, I aim to work as an AI research scientist, either in academia or industry, developing innovative solutions for real-world problems. Eventually, I\'d like to lead a research team focused on ethical AI development.'
  }
];

const visaQuestions: Question[] = [
  {
    id: '1',
    question: 'Why do you want to study in the United States?',
    category: 'Intent',
    tips: [
      'Focus on academic reasons',
      'Mention specific program benefits',
      'Show you\'ve done research',
      'Be confident and clear'
    ],
    sampleAnswer: 'The United States offers the best programs in my field of study with access to cutting-edge research and industry connections. The specific program I\'ve been accepted to provides unique opportunities for hands-on experience and collaboration with leading experts that aren\'t available in my home country.'
  },
  {
    id: '2',
    question: 'How will you finance your education?',
    category: 'Financial',
    tips: [
      'Be specific about funding sources',
      'Show financial stability',
      'Mention scholarships if applicable',
      'Have documents ready'
    ],
    sampleAnswer: 'My education will be funded through a combination of my family\'s savings, which we\'ve been building for several years, and a partial scholarship from the university. My father has a stable job as a senior manager, and we have sufficient funds in our bank account to cover tuition and living expenses for the entire duration of my program.'
  },
  {
    id: '3',
    question: 'What will you do after graduation?',
    category: 'Return Intent',
    tips: [
      'Show intent to return home',
      'Mention career opportunities in home country',
      'Discuss family ties',
      'Be convincing'
    ],
    sampleAnswer: 'After completing my degree, I plan to return to my home country where there\'s a growing demand for professionals in my field. I have strong family ties and my parents are dependent on me. Additionally, I\'ve already been in touch with several companies in my home country who are interested in hiring graduates with international experience.'
  }
];

export const InterviewTrainer = () => {
  const [interviewType, setInterviewType] = useState<'university' | 'visa'>('university');
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = interviewType === 'university' ? universityQuestions : visaQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  const mockSession: InterviewSession = {
    type: interviewType,
    score: 85,
    completed: true,
    feedback: {
      content: 90,
      delivery: 85,
      confidence: 80,
      bodyLanguage: 85
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would start video/audio recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">AI Interview Trainer</h1>
        <p className="text-body text-muted-foreground">
          Practice and ace your university and visa interviews with AI-powered feedback
        </p>
      </div>

      {/* Interview Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Interview Type</CardTitle>
          <CardDescription>Choose the type of interview you want to practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant={interviewType === 'university' ? 'default' : 'outline'}
              className={`h-24 ${interviewType === 'university' ? 'bg-glow-cyan text-background' : ''}`}
              onClick={() => {
                setInterviewType('university');
                setCurrentQuestionIndex(0);
                setShowFeedback(false);
              }}
            >
              <div className="text-center">
                <Video className="h-8 w-8 mx-auto mb-2" />
                <div className="text-body font-medium">University Admission</div>
                <div className="text-body-sm opacity-70">Practice for university interviews</div>
              </div>
            </Button>
            <Button
              variant={interviewType === 'visa' ? 'default' : 'outline'}
              className={`h-24 ${interviewType === 'visa' ? 'bg-glow-cyan text-background' : ''}`}
              onClick={() => {
                setInterviewType('visa');
                setCurrentQuestionIndex(0);
                setShowFeedback(false);
              }}
            >
              <div className="text-center">
                <Video className="h-8 w-8 mx-auto mb-2" />
                <div className="text-body font-medium">Visa Interview</div>
                <div className="text-body-sm opacity-70">Practice for embassy interviews</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-body text-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-body text-glow-cyan">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Interview Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video/Recording Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-glow-cyan" />
              Practice Area
            </CardTitle>
            <CardDescription>Record your answer and get AI feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mock Video Area */}
            <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isRecording ? (
                <div className="absolute inset-0 bg-gradient-to-br from-glow-cyan/20 to-glow-blue/20 animate-pulse" />
              ) : null}
              <div className="text-center z-10">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-body text-muted-foreground">
                  {isRecording ? 'Recording in progress...' : 'Click Start to begin recording'}
                </p>
              </div>
              {isRecording && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-destructive text-white gap-2 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    REC
                  </Badge>
                </div>
              )}
            </div>

            {/* Recording Controls */}
            <div className="flex gap-2 justify-center">
              {!isRecording ? (
                <Button
                  size="lg"
                  onClick={handleStartRecording}
                  className="bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2"
                >
                  <Play className="h-5 w-5" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleStopRecording}
                  className="bg-destructive text-white hover:bg-destructive/90 gap-2"
                >
                  <Pause className="h-5 w-5" />
                  Stop Recording
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowFeedback(false)}
                className="gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                Reset
              </Button>
            </div>

            {/* AI Feedback */}
            {showFeedback && (
              <Card className="border-glow-cyan/30 bg-glow-cyan/5">
                <CardHeader>
                  <CardTitle className="text-heading-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-glow-cyan" />
                    AI Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-heading-2 text-glow-cyan mb-1">{mockSession.score}/100</div>
                    <p className="text-body-sm text-muted-foreground">Overall Score</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-body-sm text-foreground">Content Quality</span>
                        <span className="text-body-sm font-medium text-foreground">{mockSession.feedback.content}%</span>
                      </div>
                      <Progress value={mockSession.feedback.content} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-body-sm text-foreground">Delivery</span>
                        <span className="text-body-sm font-medium text-foreground">{mockSession.feedback.delivery}%</span>
                      </div>
                      <Progress value={mockSession.feedback.delivery} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-body-sm text-foreground">Confidence</span>
                        <span className="text-body-sm font-medium text-foreground">{mockSession.feedback.confidence}%</span>
                      </div>
                      <Progress value={mockSession.feedback.confidence} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-body-sm text-foreground">Body Language</span>
                        <span className="text-body-sm font-medium text-foreground">{mockSession.feedback.bodyLanguage}%</span>
                      </div>
                      <Progress value={mockSession.feedback.bodyLanguage} className="h-2" />
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="text-body font-medium text-foreground mb-2">Key Improvements:</h4>
                    <ul className="space-y-1 text-body-sm text-muted-foreground">
                      <li>• Maintain better eye contact with the camera</li>
                      <li>• Speak slightly slower for clarity</li>
                      <li>• Provide more specific examples</li>
                      <li>• Reduce filler words (um, uh)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Question and Tips */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-glow-blue" />
                Current Question
              </CardTitle>
              <Badge variant="secondary">{currentQuestion.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-heading-4 text-foreground mb-4">{currentQuestion.question}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-body font-medium text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Tips for a Great Answer:
                  </h4>
                  <ul className="space-y-2">
                    {currentQuestion.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-body-sm text-foreground">
                        <Star className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                  <h4 className="text-body font-medium text-foreground mb-2">Sample Answer:</h4>
                  <p className="text-body-sm text-foreground">{currentQuestion.sampleAnswer}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex-1 bg-glow-cyan text-background hover:bg-glow-cyan/90"
            >
              Next Question
            </Button>
          </div>
        </div>
      </div>

      {/* Practice Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Practice Stats</CardTitle>
          <CardDescription>Track your interview preparation progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-heading-3 text-glow-cyan mb-1">12</div>
              <p className="text-body-sm text-muted-foreground">Sessions Completed</p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-heading-3 text-success mb-1">85%</div>
              <p className="text-body-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-heading-3 text-glow-blue mb-1">24</div>
              <p className="text-body-sm text-muted-foreground">Questions Practiced</p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-heading-3 text-warning mb-1">3.5h</div>
              <p className="text-body-sm text-muted-foreground">Total Practice Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};