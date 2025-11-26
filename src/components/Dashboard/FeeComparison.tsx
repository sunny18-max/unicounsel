import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useMatches } from '@/context/MatchContext';
import { Check, X, TrendingUp, TrendingDown, DollarSign, Home as HomeIcon, Briefcase, FileCheck, AlertCircle } from 'lucide-react';

export const FeeComparison = () => {
  const { matches } = useMatches();
  
  const universities = useMemo(() => {
    return matches.slice(0, 6).map((match) => ({
      id: match.id,
      name: match.universityName,
      country: match.country,
      tuition: match.estimatedCost.tuition,
      living: match.estimatedCost.living,
      partTimeAvailable: match.country !== 'USA' || match.degree === 'MSc', // Simplified logic
      prRules: match.visaFitReason,
      difficultyLevel: match.matchScore >= 85 ? 'Easy' : match.matchScore >= 70 ? 'Medium' : match.matchScore >= 60 ? 'Hard' : 'Very Hard',
      totalCost: match.estimatedCost.total
    }));
  }, [matches]);

  const [selectedUniversities, setSelectedUniversities] = useState(() => 
    universities.slice(0, Math.min(2, universities.length))
  );

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Very Hard': return 'text-error';
      case 'Hard': return 'text-warning';
      case 'Medium': return 'text-glow-cyan';
      default: return 'text-success';
    }
  };

  if (universities.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-heading-2 text-foreground mb-2">University Fee Comparison</h1>
          <p className="text-body text-muted-foreground">
            Compare tuition, living costs, and work opportunities side-by-side
          </p>
        </div>
        <Card className="border-glow-cyan/30">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-glow-cyan mx-auto mb-4" />
              <h3 className="text-heading-3 text-foreground mb-2">No Matches Available</h3>
              <p className="text-body text-muted-foreground mb-6">
                Complete the assessment to get university matches for comparison.
              </p>
              <Button 
                className="bg-glow-cyan text-background hover:bg-glow-cyan/90"
                onClick={() => window.location.href = '/onboarding'}
              >
                Start Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">University Fee Comparison</h1>
        <p className="text-body text-muted-foreground">
          Compare tuition, living costs, and work opportunities from your matches
        </p>
      </div>

      {/* University Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Universities to Compare</CardTitle>
          <CardDescription>Choose up to 3 universities from your matches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            {universities.map((uni) => (
              <Button
                key={uni.id}
                variant={selectedUniversities.find(u => u.id === uni.id) ? 'default' : 'outline'}
                onClick={() => {
                  if (selectedUniversities.find(u => u.id === uni.id)) {
                    setSelectedUniversities(selectedUniversities.filter(u => u.id !== uni.id));
                  } else if (selectedUniversities.length < 3) {
                    setSelectedUniversities([...selectedUniversities, uni]);
                  }
                }}
                className={selectedUniversities.find(u => u.id === uni.id) ? 'bg-glow-cyan text-background' : ''}
              >
                {uni.name} ({uni.country})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {selectedUniversities.map((uni, index) => (
          <Card key={uni.id} className="relative">
            {index === 0 && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success">
                Best Value
              </Badge>
            )}
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-heading-3">{uni.name}</CardTitle>
              <CardDescription className="text-body">{uni.country}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tuition Fee */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-body-sm font-medium">Tuition Fee (Annual)</span>
                </div>
                <div className="text-heading-3 text-glow-cyan">
                  ${uni.tuition.toLocaleString()}
                </div>
              </div>

              <Separator />

              {/* Living Cost */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HomeIcon className="h-4 w-4" />
                  <span className="text-body-sm font-medium">Living Cost (Annual)</span>
                </div>
                <div className="text-heading-4 text-foreground">
                  ${uni.living.toLocaleString()}
                </div>
              </div>

              <Separator />

              {/* Part-time Job */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-body-sm font-medium">Part-time Job</span>
                </div>
                <div className="flex items-center gap-2">
                  {uni.partTimeAvailable ? (
                    <>
                      <Check className="h-5 w-5 text-success" />
                      <span className="text-body-sm text-success">Available</span>
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5 text-error" />
                      <span className="text-body-sm text-error">Not Available</span>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              {/* PR/Work Permit */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileCheck className="h-4 w-4" />
                  <span className="text-body-sm font-medium">PR/Work Permit</span>
                </div>
                <p className="text-body-sm text-foreground">{uni.prRules}</p>
              </div>

              <Separator />

              {/* Difficulty Level */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-body-sm font-medium">Difficulty Level</span>
                </div>
                <div className={`text-body font-medium ${getDifficultyColor(uni.difficultyLevel)}`}>
                  {uni.difficultyLevel}
                </div>
              </div>

              <Separator />

              {/* Total Annual Cost */}
              <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                <div className="text-body-sm text-muted-foreground">Total Annual Cost</div>
                <div className="text-heading-2 text-foreground">
                  ${uni.totalCost.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-body-sm">
                  {index === 0 ? (
                    <>
                      <TrendingDown className="h-4 w-4 text-success" />
                      <span className="text-success">Most Affordable</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4 text-warning" />
                      <span className="text-warning">
                        ${(uni.totalCost - selectedUniversities[0].totalCost).toLocaleString()} more
                      </span>
                    </>
                  )}
                </div>
              </div>

              <Button className="w-full bg-glow-cyan text-background hover:bg-glow-cyan/90">
                View Full Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};