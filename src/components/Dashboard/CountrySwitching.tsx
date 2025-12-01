import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RefreshCw, 
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Target,
  Clock
} from 'lucide-react';

interface Alternative {
  country: string;
  university: string;
  program: string;
  matchScore: number;
  visaSuccess: number;
  tuitionFee: number;
  costOfLiving: number;
  applicationDeadline: string;
  startDate: string;
  advantages: string[];
  considerations: string[];
}

const alternatives: Alternative[] = [
  {
    country: 'Canada',
    university: 'University of Toronto',
    program: 'Master of Science in Computer Science',
    matchScore: 88,
    visaSuccess: 85,
    tuitionFee: 45000,
    costOfLiving: 15000,
    applicationDeadline: '2025-03-15',
    startDate: '2025-09-01',
    advantages: [
      'Post-graduation work permit (3 years)',
      'Pathway to permanent residence',
      'Lower tuition compared to USA',
      'High quality of life',
      'Multicultural environment'
    ],
    considerations: [
      'Cold weather in winter',
      'Competitive job market',
      'Higher cost of living in Toronto'
    ]
  },
  {
    country: 'Germany',
    university: 'Technical University of Munich',
    program: 'M.Sc. Computer Science',
    matchScore: 85,
    visaSuccess: 90,
    tuitionFee: 0,
    costOfLiving: 12000,
    applicationDeadline: '2025-05-31',
    startDate: '2025-10-01',
    advantages: [
      'No tuition fees',
      '18-month post-study work visa',
      'Strong tech industry',
      'Excellent research facilities',
      'Central European location'
    ],
    considerations: [
      'German language helpful for daily life',
      'Bureaucratic processes',
      'Fewer English-taught programs'
    ]
  },
  {
    country: 'Australia',
    university: 'University of Melbourne',
    program: 'Master of Information Technology',
    matchScore: 86,
    visaSuccess: 88,
    tuitionFee: 42000,
    costOfLiving: 20000,
    applicationDeadline: '2025-04-30',
    startDate: '2025-07-01',
    advantages: [
      'Post-study work visa (2-4 years)',
      'High employment rates',
      'Great weather and lifestyle',
      'Strong Indian community',
      'Points-based immigration system'
    ],
    considerations: [
      'Higher cost of living',
      'Distance from India',
      'Expensive healthcare initially'
    ]
  },
  {
    country: 'UK',
    university: 'University of Edinburgh',
    program: 'MSc Advanced Computer Science',
    matchScore: 84,
    visaSuccess: 82,
    tuitionFee: 35000,
    costOfLiving: 14000,
    applicationDeadline: '2025-06-30',
    startDate: '2025-09-15',
    advantages: [
      'Graduate visa (2 years)',
      'Shorter program duration (1 year)',
      'Historic universities',
      'No language barrier',
      'Close to Europe'
    ],
    considerations: [
      'Expensive tuition',
      'Rainy weather',
      'Competitive job market post-Brexit'
    ]
  },
  {
    country: 'Netherlands',
    university: 'Delft University of Technology',
    program: 'MSc Computer Science',
    matchScore: 83,
    visaSuccess: 87,
    tuitionFee: 18000,
    costOfLiving: 13000,
    applicationDeadline: '2025-05-01',
    startDate: '2025-09-01',
    advantages: [
      'One-year search visa after graduation',
      'English-taught programs',
      'Bike-friendly cities',
      'Central European location',
      'Affordable tuition'
    ],
    considerations: [
      'Dutch language helpful',
      'Housing shortage',
      'Weather can be rainy'
    ]
  }
];

export const CountrySwitching = () => {
  const [selectedAlternative, setSelectedAlternative] = useState<Alternative | null>(null);

  const originalChoice = {
    country: 'USA',
    university: 'Stanford University',
    program: 'MS Computer Science',
    tuitionFee: 55000,
    costOfLiving: 25000
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Country Switching Advisor</h1>
        <p className="text-body text-muted-foreground">
          Get backup options if your application is rejected
        </p>
      </div>

      {/* Original Choice */}
      <Card className="border-glow-cyan/30 bg-glow-cyan/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-glow-cyan" />
            Your Original Choice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-heading-3 text-foreground mb-2">{originalChoice.university}</h3>
              <p className="text-body text-muted-foreground mb-1">{originalChoice.program}</p>
              <p className="text-body-sm text-muted-foreground">{originalChoice.country}</p>
            </div>
            <div className="text-right">
              <div className="text-heading-4 text-foreground mb-1">
                ${(originalChoice.tuitionFee + originalChoice.costOfLiving).toLocaleString()}
              </div>
              <p className="text-body-sm text-muted-foreground">Total Annual Cost</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      <div>
        <h2 className="text-heading-3 text-foreground mb-4">Alternative Options</h2>
        <div className="space-y-4">
          {alternatives.map((alt, idx) => {
            const totalCost = alt.tuitionFee + alt.costOfLiving;
            const costDifference = totalCost - (originalChoice.tuitionFee + originalChoice.costOfLiving);
            const isSelected = selectedAlternative?.university === alt.university;

            return (
              <Card 
                key={idx}
                className={`cursor-pointer transition-all ${
                  isSelected ? 'border-glow-cyan/50 bg-glow-cyan/5' : 'hover:border-glow-cyan/30'
                }`}
                onClick={() => setSelectedAlternative(isSelected ? null : alt)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-heading-4 text-foreground">{alt.university}</h3>
                          <Badge className="bg-glow-cyan text-background">{alt.country}</Badge>
                        </div>
                        <p className="text-body text-muted-foreground mb-3">{alt.program}</p>
                        
                        {/* Scores */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-body-sm text-muted-foreground">Match Score</span>
                              <span className="text-body-sm font-medium text-glow-cyan">{alt.matchScore}%</span>
                            </div>
                            <Progress value={alt.matchScore} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-body-sm text-muted-foreground">Visa Success</span>
                              <span className="text-body-sm font-medium text-success">{alt.visaSuccess}%</span>
                            </div>
                            <Progress value={alt.visaSuccess} className="h-2" />
                          </div>
                        </div>
                      </div>

                      {/* Cost Comparison */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-heading-4 text-foreground mb-1">
                          ${totalCost.toLocaleString()}
                        </div>
                        <p className="text-body-sm text-muted-foreground mb-2">Total Annual Cost</p>
                        {costDifference !== 0 && (
                          <Badge 
                            className={costDifference < 0 ? 'bg-success text-white' : 'bg-warning text-background'}
                          >
                            {costDifference < 0 ? 'Save' : 'Extra'} ${Math.abs(costDifference).toLocaleString()}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isSelected && (
                      <Tabs defaultValue="advantages" className="mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="advantages">Advantages</TabsTrigger>
                          <TabsTrigger value="considerations">Considerations</TabsTrigger>
                          <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        </TabsList>

                        <TabsContent value="advantages" className="space-y-2 mt-4">
                          {alt.advantages.map((adv, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-success/10 rounded-lg">
                              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                              <span className="text-body-sm text-foreground">{adv}</span>
                            </div>
                          ))}
                        </TabsContent>

                        <TabsContent value="considerations" className="space-y-2 mt-4">
                          {alt.considerations.map((con, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
                              <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                              <span className="text-body-sm text-foreground">{con}</span>
                            </div>
                          ))}
                        </TabsContent>

                        <TabsContent value="timeline" className="space-y-3 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-secondary/30 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-glow-cyan" />
                                <span className="text-body-sm font-medium text-foreground">Application Deadline</span>
                              </div>
                              <p className="text-body text-foreground">
                                {new Date(alt.applicationDeadline).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>

                            <div className="p-4 bg-secondary/30 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-4 w-4 text-glow-blue" />
                                <span className="text-body-sm font-medium text-foreground">Program Start</span>
                              </div>
                              <p className="text-body text-foreground">
                                {new Date(alt.startDate).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>

                            <div className="p-4 bg-secondary/30 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-4 w-4 text-success" />
                                <span className="text-body-sm font-medium text-foreground">Tuition Fee</span>
                              </div>
                              <p className="text-body text-foreground">
                                {alt.tuitionFee === 0 ? 'Free' : `$${alt.tuitionFee.toLocaleString()}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button className="flex-1 bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2">
                              <ArrowRight className="h-4 w-4" />
                              Start Application
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Learn More
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}

                    {/* Quick Action */}
                    {!isSelected && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAlternative(alt);
                        }}
                      >
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Comparison</CardTitle>
          <CardDescription>Compare key factors across alternatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-body-sm font-medium text-muted-foreground">Country</th>
                  <th className="text-left p-3 text-body-sm font-medium text-muted-foreground">Match Score</th>
                  <th className="text-left p-3 text-body-sm font-medium text-muted-foreground">Visa Success</th>
                  <th className="text-left p-3 text-body-sm font-medium text-muted-foreground">Total Cost</th>
                  <th className="text-left p-3 text-body-sm font-medium text-muted-foreground">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {alternatives.slice(0, 5).map((alt, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="p-3 text-body-sm text-foreground font-medium">{alt.country}</td>
                    <td className="p-3">
                      <Badge className="bg-glow-cyan text-background">{alt.matchScore}%</Badge>
                    </td>
                    <td className="p-3">
                      <Badge className="bg-success text-white">{alt.visaSuccess}%</Badge>
                    </td>
                    <td className="p-3 text-body-sm text-foreground">
                      ${(alt.tuitionFee + alt.costOfLiving).toLocaleString()}
                    </td>
                    <td className="p-3 text-body-sm text-muted-foreground">
                      {new Date(alt.applicationDeadline).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};