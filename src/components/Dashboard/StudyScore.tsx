import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMatches } from '@/context/MatchContext';
import { 
  TrendingUp, 
  Award,
  DollarSign,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Target,
  TrendingDown
} from 'lucide-react';

export const StudyScore = () => {
  const { studentProfile } = useMatches();

  const overallScore = 78;
  const scores = {
    visa: 85,
    financial: 72,
    academic: 88,
    english: 80,
    experience: 65
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success/10 border-success/30';
    if (score >= 60) return 'bg-warning/10 border-warning/30';
    return 'bg-destructive/10 border-destructive/30';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Study Abroad Score</h1>
        <p className="text-body text-muted-foreground">
          Your comprehensive eligibility score (0-100)
        </p>
      </div>

      {/* Overall Score */}
      <Card className={`border ${getScoreBg(overallScore)}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-glow flex items-center justify-center">
              <div className="text-center">
                <div className={`text-heading-1 text-white`}>{overallScore}</div>
                <p className="text-body-sm text-white/80">out of 100</p>
              </div>
            </div>
            <h2 className="text-heading-3 text-foreground mb-2">Your Study Abroad Score</h2>
            <p className="text-body text-muted-foreground">
              {overallScore >= 80 ? 'Excellent! You have a strong profile.' :
               overallScore >= 60 ? 'Good! Some improvements will strengthen your profile.' :
               'Work on key areas to improve your chances.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
          <CardDescription>Detailed analysis of your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visa Chances */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-glow-cyan" />
                <span className="text-body font-medium text-foreground">Visa Approval Chances</span>
              </div>
              <span className={`text-heading-4 ${getScoreColor(scores.visa)}`}>{scores.visa}%</span>
            </div>
            <Progress value={scores.visa} className="h-3 mb-2" />
            <p className="text-body-sm text-muted-foreground">
              Based on your profile, country selection, and documentation
            </p>
          </div>

          {/* Financial Strength */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="text-body font-medium text-foreground">Financial Strength</span>
              </div>
              <span className={`text-heading-4 ${getScoreColor(scores.financial)}`}>{scores.financial}%</span>
            </div>
            <Progress value={scores.financial} className="h-3 mb-2" />
            <p className="text-body-sm text-muted-foreground">
              Your ability to fund education and living expenses
            </p>
          </div>

          {/* Academic Fit */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-glow-blue" />
                <span className="text-body font-medium text-foreground">Academic Fit</span>
              </div>
              <span className={`text-heading-4 ${getScoreColor(scores.academic)}`}>{scores.academic}%</span>
            </div>
            <Progress value={scores.academic} className="h-3 mb-2" />
            <p className="text-body-sm text-muted-foreground">
              Match between your qualifications and program requirements
            </p>
          </div>

          {/* English Proficiency */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                <span className="text-body font-medium text-foreground">English Proficiency</span>
              </div>
              <span className={`text-heading-4 ${getScoreColor(scores.english)}`}>{scores.english}%</span>
            </div>
            <Progress value={scores.english} className="h-3 mb-2" />
            <p className="text-body-sm text-muted-foreground">
              IELTS/TOEFL scores and language capabilities
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-glow-teal" />
                <span className="text-body font-medium text-foreground">Work Experience</span>
              </div>
              <span className={`text-heading-4 ${getScoreColor(scores.experience)}`}>{scores.experience}%</span>
            </div>
            <Progress value={scores.experience} className="h-3 mb-2" />
            <p className="text-body-sm text-muted-foreground">
              Relevant work experience and internships
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-glow-cyan" />
            Improvement Recommendations
          </CardTitle>
          <CardDescription>Actions to boost your score</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-success/10 border border-success/30 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-body font-medium text-foreground mb-1">Increase Financial Documentation</h4>
              <p className="text-body-sm text-muted-foreground">
                Add 3-6 months of additional bank statements to strengthen financial proof. This could increase your score by 8-10 points.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-body font-medium text-foreground mb-1">Gain Relevant Work Experience</h4>
              <p className="text-body-sm text-muted-foreground">
                Complete an internship or part-time work in your field. This could boost your score by 12-15 points.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-glow-blue/10 border border-glow-blue/30 rounded-lg">
            <TrendingUp className="h-5 w-5 text-glow-blue flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-body font-medium text-foreground mb-1">Improve English Test Scores</h4>
              <p className="text-body-sm text-muted-foreground">
                Retake IELTS/TOEFL to achieve 0.5-1 band higher. This could add 5-7 points to your overall score.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Compare with Successful Students</CardTitle>
          <CardDescription>See how you stack up</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body text-foreground">Average Admitted Student</span>
                <span className="text-heading-4 text-glow-cyan">82</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body text-foreground">Your Score</span>
                <span className="text-heading-4 text-foreground">{overallScore}</span>
              </div>
              <Progress value={overallScore} className="h-2" />
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body text-foreground">Minimum Required</span>
                <span className="text-heading-4 text-muted-foreground">65</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button className="bg-glow-cyan text-background hover:bg-glow-cyan/90">
              Get Personalized Action Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};