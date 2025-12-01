import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User,
  Sparkles,
  Building2,
  Phone,
  Briefcase,
  AlertCircle,
  MapPin,
  Scale,
  Globe
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: string;
}

interface QuickAction {
  icon: any;
  label: string;
  query: string;
  category: string;
}

const quickActions: QuickAction[] = [
  { icon: Building2, label: 'Open Bank Account', query: 'How do I open a bank account as an international student?', category: 'Banking' },
  { icon: Phone, label: 'Get SIM Card', query: 'What are the steps to get a SIM card and phone plan?', category: 'Connectivity' },
  { icon: Briefcase, label: 'Find Part-time Jobs', query: 'How can I find part-time job opportunities as a student?', category: 'Employment' },
  { icon: AlertCircle, label: 'Emergency Help', query: 'What should I do in case of an emergency?', category: 'Safety' },
  { icon: MapPin, label: 'City Navigation', query: 'How do I navigate the city and use public transport?', category: 'Transport' },
  { icon: Scale, label: 'Student Laws', query: 'What are the important laws and rules for international students?', category: 'Legal' },
  { icon: Globe, label: 'Cultural Tips', query: 'What cultural differences should I be aware of?', category: 'Culture' },
];

const sampleResponses: Record<string, string> = {
  'bank': 'To open a bank account as an international student:\n\n1. **Required Documents:**\n   - Valid passport\n   - Student visa\n   - University acceptance letter\n   - Proof of address (university accommodation or rental agreement)\n   - Student ID card\n\n2. **Recommended Banks:**\n   - Most universities have partnerships with specific banks\n   - Look for student accounts with no monthly fees\n   - Consider online banks for better rates\n\n3. **Process:**\n   - Book an appointment online or visit a branch\n   - Bring all required documents\n   - Initial deposit (usually $25-100)\n   - Account activated within 1-2 weeks\n\n4. **Tips:**\n   - Get a debit card immediately\n   - Set up online banking\n   - Understand overdraft policies\n   - Keep your account active with regular transactions',
  
  'sim': 'Getting a SIM card and phone plan:\n\n1. **Where to Buy:**\n   - Airport kiosks (convenient but expensive)\n   - Mobile carrier stores (AT&T, Verizon, T-Mobile)\n   - Supermarkets and convenience stores\n   - Online (best deals)\n\n2. **What You Need:**\n   - Passport\n   - Proof of address\n   - Unlocked phone (check compatibility)\n\n3. **Plan Options:**\n   - Prepaid (no contract, flexible)\n   - Postpaid (monthly contract, better rates)\n   - Student plans (discounts available)\n\n4. **Recommended Carriers:**\n   - T-Mobile: Good international features\n   - Mint Mobile: Budget-friendly\n   - Google Fi: Flexible data\n\n5. **Average Costs:**\n   - Prepaid: $15-40/month\n   - Postpaid: $30-60/month\n   - Unlimited data: $50-80/month',
  
  'job': 'Finding part-time jobs as an international student:\n\n1. **Work Restrictions:**\n   - F-1 visa: Max 20 hours/week during semester\n   - Can work full-time during breaks\n   - Must maintain full-time student status\n\n2. **On-Campus Jobs:**\n   - Library assistant\n   - Research assistant\n   - Teaching assistant\n   - Dining hall staff\n   - Campus tour guide\n\n3. **Off-Campus Options (with CPT/OPT):**\n   - Internships in your field\n   - Retail positions\n   - Food service\n   - Tutoring\n\n4. **Where to Find Jobs:**\n   - University career center\n   - Handshake platform\n   - LinkedIn\n   - Indeed, Glassdoor\n   - Department bulletin boards\n\n5. **Tips:**\n   - Start early (high demand)\n   - Network with professors\n   - Attend career fairs\n   - Update your resume\n   - Get work authorization first',
  
  'emergency': 'Emergency procedures for international students:\n\n1. **Emergency Numbers:**\n   - Police/Fire/Ambulance: 911\n   - University Campus Security: [Check your university]\n   - International Student Office: [Save this number]\n\n2. **Medical Emergencies:**\n   - Call 911 for serious situations\n   - Visit urgent care for non-life-threatening issues\n   - Keep insurance card always with you\n   - Know nearest hospital location\n\n3. **Safety Tips:**\n   - Share your location with trusted friends\n   - Save emergency contacts in phone\n   - Register with your embassy\n   - Download safety apps (SafeTrek, bSafe)\n\n4. **Lost Documents:**\n   - Report to police immediately\n   - Contact your embassy/consulate\n   - Inform international student office\n   - Keep digital copies of all documents\n\n5. **Mental Health:**\n   - University counseling services (usually free)\n   - Crisis hotline: 988 (Suicide & Crisis Lifeline)\n   - International student support groups',
  
  'transport': 'Navigating the city and public transport:\n\n1. **Public Transport Options:**\n   - Subway/Metro (fastest for long distances)\n   - Buses (extensive coverage)\n   - Light rail/Tram\n   - Bike sharing programs\n\n2. **Getting Started:**\n   - Get a student transit pass (discounted)\n   - Download transit apps (Google Maps, Citymapper)\n   - Learn your route to university\n   - Keep emergency cash for backup\n\n3. **Payment Methods:**\n   - Contactless cards accepted\n   - Mobile payment apps\n   - Monthly/semester passes (best value)\n   - Day passes for occasional use\n\n4. **Safety Tips:**\n   - Avoid traveling alone late at night\n   - Stay in well-lit areas\n   - Keep belongings secure\n   - Trust your instincts\n\n5. **Alternative Transport:**\n   - Uber/Lyft (convenient but expensive)\n   - University shuttle services (free)\n   - Bike rentals (eco-friendly)\n   - Walking (great for nearby locations)',
  
  'laws': 'Important laws and rules for international students:\n\n1. **Visa Compliance:**\n   - Maintain full-time enrollment (12+ credits)\n   - Report address changes within 10 days\n   - Don\'t overstay your visa\n   - Keep I-20 valid and updated\n\n2. **Work Authorization:**\n   - Only work with proper authorization (CPT/OPT)\n   - On-campus work allowed (max 20 hrs/week)\n   - Unauthorized work = visa violation\n\n3. **Legal Age Restrictions:**\n   - Drinking age: 21 years\n   - Smoking/Vaping: 21 years\n   - Driving: 16-18 years (varies by state)\n\n4. **Important Rules:**\n   - No plagiarism (serious academic offense)\n   - Respect intellectual property\n   - Follow traffic laws strictly\n   - Pay taxes on any income\n\n5. **Rights:**\n   - Right to safe housing\n   - Protection from discrimination\n   - Access to legal counsel\n   - Freedom of speech and religion\n\n6. **Resources:**\n   - International student office\n   - University legal services\n   - Immigration attorney (if needed)',
  
  'culture': 'Cultural adaptation tips for international students:\n\n1. **Communication Style:**\n   - Direct and informal communication\n   - First names commonly used\n   - Small talk is important\n   - Eye contact shows confidence\n\n2. **Social Norms:**\n   - Punctuality is highly valued\n   - Personal space (arm\'s length)\n   - Tipping culture (15-20% at restaurants)\n   - RSVP to invitations\n\n3. **Academic Culture:**\n   - Active participation expected\n   - Question authority encouraged\n   - Group projects common\n   - Office hours for professor interaction\n\n4. **Making Friends:**\n   - Join student organizations\n   - Attend campus events\n   - Study groups\n   - International student associations\n\n5. **Food & Dining:**\n   - Large portion sizes\n   - Tap water is safe to drink\n   - Diverse food options available\n   - Many vegetarian/vegan options\n\n6. **Dealing with Culture Shock:**\n   - Normal to feel homesick\n   - Stay connected with family\n   - Build support network\n   - Seek counseling if needed\n   - Give yourself time to adjust'
};

export const AIMentor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your 24/7 AI Mentor. I\'m here to help you with everything from opening a bank account to finding part-time jobs. How can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (content: string = input) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerContent = content.toLowerCase();
      let response = 'I understand your question. Let me help you with that.\n\n';
      
      if (lowerContent.includes('bank') || lowerContent.includes('account')) {
        response = sampleResponses.bank;
      } else if (lowerContent.includes('sim') || lowerContent.includes('phone')) {
        response = sampleResponses.sim;
      } else if (lowerContent.includes('job') || lowerContent.includes('work')) {
        response = sampleResponses.job;
      } else if (lowerContent.includes('emergency') || lowerContent.includes('help')) {
        response = sampleResponses.emergency;
      } else if (lowerContent.includes('transport') || lowerContent.includes('navigate')) {
        response = sampleResponses.transport;
      } else if (lowerContent.includes('law') || lowerContent.includes('rule')) {
        response = sampleResponses.laws;
      } else if (lowerContent.includes('culture') || lowerContent.includes('adapt')) {
        response = sampleResponses.culture;
      } else {
        response = 'That\'s a great question! While I have extensive knowledge about studying abroad, I recommend checking with your university\'s international student office for the most accurate and up-to-date information specific to your situation.\n\nIn the meantime, you can ask me about:\n- Opening bank accounts\n- Getting a SIM card\n- Finding part-time jobs\n- Emergency procedures\n- Public transportation\n- Student laws and regulations\n- Cultural adaptation tips';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">24/7 AI Mentor</h1>
        <p className="text-body text-muted-foreground">
          Your personal assistant for all study abroad questions
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-glow-cyan" />
            Quick Help Topics
          </CardTitle>
          <CardDescription>Click on any topic to get instant guidance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-auto flex-col gap-2 p-4 hover:border-glow-cyan/50 hover:bg-glow-cyan/5"
                  onClick={() => handleQuickAction(action.query)}
                >
                  <Icon className="h-6 w-6 text-glow-cyan" />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="border-glow-cyan/30">
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-glow flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle>AI Mentor Chat</CardTitle>
              <CardDescription>Ask me anything about studying abroad</CardDescription>
            </div>
            <Badge className="ml-auto bg-success text-white">Online</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-glow flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-glow-cyan text-background'
                        : 'bg-secondary/50 text-foreground'
                    }`}
                  >
                    <p className="text-body-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-background/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-glow-blue/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-glow-blue" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-glow flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-glow-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-glow-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-glow-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question here..."
                className="flex-1"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-glow-cyan text-background hover:bg-glow-cyan/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};