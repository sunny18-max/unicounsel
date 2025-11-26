import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { MapPin, GraduationCap, DollarSign, FileText, Calendar, Bookmark, ArrowRight } from 'lucide-react';
import type { UniversityMatch } from '@/types';
import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface MatchResultsProps {
  matches: UniversityMatch[];
}

export const MatchResults = ({ matches }: MatchResultsProps) => {
  const handleApply = (match: UniversityMatch) => {
    // Open university website in new tab
    window.open(match.universityName, '_blank');
  };

  const handleSave = (match: UniversityMatch) => {
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('savedMatches') || '[]');
    if (!saved.find((m: UniversityMatch) => m.id === match.id)) {
      saved.push(match);
      localStorage.setItem('savedMatches', JSON.stringify(saved));
      alert(`${match.universityName} saved to your favorites!`);
    } else {
      alert('This university is already in your saved list.');
    }
  };

  const getVisaFitColor = (fit: string) => {
    switch (fit) {
      case 'High':
        return 'bg-success/20 text-success border-success/50';
      case 'Medium':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'Low':
        return 'bg-error/20 text-error border-error/50';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-heading-1 text-glow-cyan mb-4">
            Your Perfect Matches
          </h1>
          <p className="text-body-lg text-muted-foreground">
            Based on your profile, here are your top {matches.length} recommendations
          </p>
        </div>

        {/* Results Grid */}
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-6 pr-4">
            {matches.map((match, index) => (
              <Card 
                key={match.id} 
                className={cn(
                  "border-2 transition-all duration-300 hover:shadow-lg hover:shadow-glow-cyan/20",
                  index === 0 && "border-glow-cyan glow-cyan"
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-lg font-semibold">
                          #{index + 1}
                        </Badge>
                        {index === 0 && (
                          <Badge className="bg-glow-cyan text-background">
                            Best Match
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-heading-3 mb-2">
                        {match.universityName}
                      </CardTitle>
                      <CardDescription className="text-body flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {match.city}, {match.country}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-heading-2 text-glow-cyan font-bold">
                        {match.matchScore}
                      </div>
                      <div className="text-body-sm text-muted-foreground">
                        Match Score
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Program Info */}
                  <div className="flex items-center gap-2 text-body">
                    <GraduationCap className="h-5 w-5 text-glow-blue" />
                    <span className="font-semibold">{match.programName}</span>
                    <Badge variant="outline">{match.degree}</Badge>
                  </div>

                  <Separator />

                  {/* Score Breakdown */}
                  <div>
                    <h4 className="text-heading-4 mb-4">Score Breakdown</h4>
                    <div className="space-y-3">
                      <ScoreBar 
                        label="Academic Fit" 
                        value={match.scoreBreakdown.academicFit} 
                        max={40}
                      />
                      <ScoreBar 
                        label="Financial Fit" 
                        value={match.scoreBreakdown.financialFit} 
                        max={25}
                      />
                      <ScoreBar 
                        label="Language Fit" 
                        value={match.scoreBreakdown.languageFit} 
                        max={15}
                      />
                      <ScoreBar 
                        label="Intake Timing" 
                        value={match.scoreBreakdown.intakeTiming} 
                        max={10}
                      />
                      <ScoreBar 
                        label="Work/PR Friendliness" 
                        value={match.scoreBreakdown.workPRFriendliness} 
                        max={10}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Visa Fit */}
                  <div>
                    <h4 className="text-heading-4 mb-3">Visa Success Probability</h4>
                    <div className="flex items-start gap-3">
                      <Badge className={cn("text-sm", getVisaFitColor(match.visaFit))}>
                        {match.visaFit}
                      </Badge>
                      <p className="text-body-sm text-muted-foreground flex-1">
                        {match.visaFitReason}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Cost Breakdown */}
                  <div>
                    <h4 className="text-heading-4 mb-3 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-glow-blue" />
                      Estimated Annual Cost
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-card p-4 rounded-lg border border-border">
                        <div className="text-body-sm text-muted-foreground mb-1">Tuition</div>
                        <div className="text-body font-semibold text-foreground">
                          {formatCurrency(match.estimatedCost.tuition)}
                        </div>
                      </div>
                      <div className="bg-card p-4 rounded-lg border border-border">
                        <div className="text-body-sm text-muted-foreground mb-1">Living</div>
                        <div className="text-body font-semibold text-foreground">
                          {formatCurrency(match.estimatedCost.living)}
                        </div>
                      </div>
                      <div className="bg-card p-4 rounded-lg border border-border">
                        <div className="text-body-sm text-muted-foreground mb-1">Total</div>
                        <div className="text-body font-semibold text-glow-cyan">
                          {formatCurrency(match.estimatedCost.total)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Requirements */}
                  <div>
                    <h4 className="text-heading-4 mb-3">Key Requirements</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-glow-blue mt-0.5" />
                        <div>
                          <div className="text-body-sm font-semibold mb-1">Minimum Score</div>
                          <div className="text-body-sm text-muted-foreground">
                            {match.requirements.minScore}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-glow-blue mt-0.5" />
                        <div>
                          <div className="text-body-sm font-semibold mb-1">Documents Required</div>
                          <div className="flex flex-wrap gap-2">
                            {match.requirements.documents.map((doc) => (
                              <Badge key={doc} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-glow-blue mt-0.5" />
                        <div>
                          <div className="text-body-sm font-semibold mb-1">Next Intakes</div>
                          <div className="text-body-sm text-muted-foreground">
                            {match.requirements.nextIntakes.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 bg-glow-cyan text-background hover:bg-glow-cyan/90"
                      onClick={() => handleApply(match)}
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleSave(match)}
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

interface ScoreBarProps {
  label: string;
  value: number;
  max: number;
}

const ScoreBar = ({ label, value, max }: ScoreBarProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-body-sm mb-1">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{value}/{max}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};