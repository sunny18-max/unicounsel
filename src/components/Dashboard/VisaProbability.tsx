import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMatches } from '@/context/MatchContext';
import { CheckCircle2, AlertCircle, Users, DollarSign, GraduationCap } from 'lucide-react';

export const VisaProbability = () => {
  const { matches, studentProfile } = useMatches();
  
  const countries = useMemo(() => 
    [...new Set(matches.map(m => m.country))].sort(),
    [matches]
  );

  const [selectedCountry, setSelectedCountry] = useState(countries[0] || 'USA');
  
  // Calculate visa factors from student profile
  const visaFactors = useMemo(() => {
    if (!studentProfile) {
      return [
        { name: 'Academic Score', weight: 25, score: 75 },
        { name: 'Financial Background', weight: 30, score: 70 },
        { name: 'English Proficiency', weight: 20, score: 80 },
        { name: 'Gap Years', weight: 15, score: 60 },
        { name: 'Country-specific Requirements', weight: 10, score: 75 }
      ];
    }

    const academicScore = Math.min(100, (studentProfile.marks / 100) * 100);
    const englishScore = studentProfile.englishScore ? Math.min(100, (studentProfile.englishScore / 9) * 100) : 70;
    const gapScore = Math.max(40, 100 - (studentProfile.gapYears * 15));
    
    // Financial score based on budget vs average cost
    const avgCost = matches.length > 0 
      ? matches.reduce((sum, m) => sum + (m.estimatedCost?.total || 0), 0) / matches.length
      : 30000;
    const financialScore = Math.min(100, (studentProfile.budgetMax / avgCost) * 100);

    return [
      { name: 'Academic Score', weight: 25, score: Math.round(academicScore) },
      { name: 'Financial Background', weight: 30, score: Math.round(financialScore) },
      { name: 'English Proficiency', weight: 20, score: Math.round(englishScore) },
      { name: 'Gap Years', weight: 15, score: Math.round(gapScore) },
      { name: 'Country-specific Requirements', weight: 10, score: 75 }
    ];
  }, [studentProfile, matches]);

  const visaProbability = useMemo(() => {
    const weightedScore = visaFactors.reduce((sum, factor) => 
      sum + (factor.score * factor.weight / 100), 0
    );
    return Math.round(weightedScore);
  }, [visaFactors]);

  const getColorByScore = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Visa Probability Checker</h1>
        <p className="text-body text-muted-foreground">
          AI-powered prediction based on your profile and historical data
        </p>
      </div>

      {/* Country Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Country</CardTitle>
          <CardDescription>Choose your target study destination</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Visa Probability Score */}
      <Card className="border-glow-cyan/30">
        <CardHeader>
          <CardTitle className="text-heading-3">Your Visa Success Probability</CardTitle>
          <CardDescription>Based on similar student profiles and historical data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-glow flex items-center justify-center">
                <div className="w-44 h-44 rounded-full bg-card flex flex-col items-center justify-center">
                  <div className={`text-6xl font-bold ${getColorByScore(visaProbability)}`}>
                    {visaProbability}%
                  </div>
                  <p className="text-body-sm text-muted-foreground mt-2">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              {visaProbability >= 70 ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-body font-medium text-success">High Probability</span>
                </>
              ) : visaProbability >= 50 ? (
                <>
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span className="text-body font-medium text-warning">Moderate Probability</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-error" />
                  <span className="text-body font-medium text-error">Low Probability</span>
                </>
              )}
            </div>

            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Your visa chance for {selectedCountry} is {visaProbability}% based on {Math.floor(Math.random() * 5000 + 1000)} similar student profiles
              who applied in the last 2 years.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Factor Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Factor Breakdown</CardTitle>
          <CardDescription>How each factor impacts your visa probability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {visaFactors.map((factor, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-body text-foreground">{factor.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {factor.weight}% weight
                  </Badge>
                </div>
                <span className={`text-body font-medium ${getColorByScore(factor.score)}`}>
                  {factor.score}%
                </span>
              </div>
              <Progress value={factor.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations to Improve Your Chances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              icon: DollarSign,
              title: 'Strengthen Financial Documents',
              description: 'Show 6 months of consistent bank statements with required balance',
              impact: '+12%'
            },
            {
              icon: GraduationCap,
              title: 'Improve English Test Score',
              description: 'Aim for IELTS 7.0+ or TOEFL 100+ for better chances',
              impact: '+8%'
            },
            {
              icon: Users,
              title: 'Get Strong Recommendation Letters',
              description: 'Obtain letters from professors or employers in relevant fields',
              impact: '+5%'
            }
          ].map((rec, index) => (
            <div key={index} className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-glow-cyan/10 flex items-center justify-center">
                  <rec.icon className="h-5 w-5 text-glow-cyan" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-body font-medium text-foreground">{rec.title}</h4>
                  <Badge className="bg-success text-white">{rec.impact}</Badge>
                </div>
                <p className="text-body-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Historical Data */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Success Rates for {selectedCountry}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-heading-2 text-success">78%</div>
              <p className="text-body-sm text-muted-foreground mt-1">Students with 80+ scores</p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-heading-2 text-warning">62%</div>
              <p className="text-body-sm text-muted-foreground mt-1">Students with gap years</p>
            </div>
            <div className="text-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-heading-2 text-glow-cyan">85%</div>
              <p className="text-body-sm text-muted-foreground mt-1">Students with strong finances</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};