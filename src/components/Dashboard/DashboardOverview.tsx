import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMatches } from '@/context/MatchContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/formatters';
import { 
  TrendingUp, 
  DollarSign, 
  Award, 
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  AlertCircle,
  Building2
} from 'lucide-react';

export const DashboardOverview = () => {
  const { matches, studentProfile } = useMatches();
  const navigate = useNavigate();

  // Calculate statistics from real match data
  const stats = {
    totalMatches: matches.length,
    avgTuition: matches.length > 0 
      ? Math.round(matches.reduce((sum, m) => sum + (m.estimatedCost?.tuition || 0), 0) / matches.length)
      : 0,
    scholarshipsAvailable: Math.floor(matches.length * 0.5), // Estimate 50% have scholarships
    countries: [...new Set(matches.map(m => m.country))].length,
    avgMatchScore: matches.length > 0
      ? Math.round(matches.reduce((sum, m) => sum + m.matchScore, 0) / matches.length)
      : 0,
    highVisaFit: matches.filter(m => m.visaFit === 'High').length,
    mediumVisaFit: matches.filter(m => m.visaFit === 'Medium').length,
  };

  // Calculate profile scores
  const profileScores = {
    eligibility: studentProfile ? Math.min(95, 60 + (studentProfile.marks / 100) * 35) : 85,
    visaChances: stats.highVisaFit > 0 ? 85 : stats.mediumVisaFit > 0 ? 65 : 45,
    financialStrength: studentProfile && matches.length > 0
      ? Math.min(95, ((studentProfile.budgetMax / stats.avgTuition) * 100) * 0.75)
      : 75,
    academicFit: stats.avgMatchScore || 88,
  };

  const overallScore = Math.round(
    (profileScores.eligibility + profileScores.visaChances + 
     profileScores.financialStrength + profileScores.academicFit) / 4
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">
          Welcome back, {studentProfile?.name || 'Student'}!
        </h1>
        <p className="text-body text-muted-foreground">
          {matches.length > 0 
            ? `You have ${matches.length} university matches across ${stats.countries} ${stats.countries === 1 ? 'country' : 'countries'} based on your profile`
            : "Complete your assessment to see personalized university matches"
          }
        </p>
      </div>

      {matches.length === 0 ? (
        <Card className="border-glow-cyan/30">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-glow-cyan mx-auto mb-4" />
              <h3 className="text-heading-3 text-foreground mb-2">No Matches Yet</h3>
              <p className="text-body text-muted-foreground mb-6 max-w-md mx-auto">
                Complete the voice assessment to get personalized university recommendations based on your profile.
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
      ) : (
        <>
          {/* Study Abroad Score Card */}
          <Card className="bg-gradient-glow border-glow-cyan/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-heading-3 text-white">Your Study Abroad Score</CardTitle>
                  <CardDescription className="text-white/80">Based on your profile analysis</CardDescription>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-white">{overallScore}</div>
                  <p className="text-body-sm text-white/80">out of 100</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-body-sm text-white/90 mb-2">
                    <span>Eligibility</span>
                    <span>{Math.round(profileScores.eligibility)}%</span>
                  </div>
                  <Progress value={profileScores.eligibility} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-body-sm text-white/90 mb-2">
                    <span>Visa Chances</span>
                    <span>{Math.round(profileScores.visaChances)}%</span>
                  </div>
                  <Progress value={profileScores.visaChances} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-body-sm text-white/90 mb-2">
                    <span>Financial Strength</span>
                    <span>{Math.round(profileScores.financialStrength)}%</span>
                  </div>
                  <Progress value={profileScores.financialStrength} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-body-sm text-white/90 mb-2">
                    <span>Academic Fit</span>
                    <span>{Math.round(profileScores.academicFit)}%</span>
                  </div>
                  <Progress value={profileScores.academicFit} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-body text-muted-foreground">Matched Universities</CardTitle>
                  <TrendingUp className="h-5 w-5 text-glow-cyan" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-heading-2 text-foreground">{stats.totalMatches}</div>
                <p className="text-body-sm text-muted-foreground mt-1">
                  Universities matched
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-body text-muted-foreground">Avg. Tuition</CardTitle>
                  <DollarSign className="h-5 w-5 text-glow-blue" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-heading-2 text-foreground">
                  {stats.avgTuition > 0 ? formatCurrency(stats.avgTuition) : 'N/A'}
                </div>
                <p className="text-body-sm text-muted-foreground mt-1">Per year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-body text-muted-foreground">Scholarships</CardTitle>
                  <Award className="h-5 w-5 text-warning" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-heading-2 text-foreground">{stats.scholarshipsAvailable}</div>
                <p className="text-body-sm text-muted-foreground mt-1">Available for you</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-body text-muted-foreground">Countries</CardTitle>
                  <MapPin className="h-5 w-5 text-glow-teal" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-heading-2 text-foreground">{stats.countries}</div>
                <p className="text-body-sm text-muted-foreground mt-1">Top destinations</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Matches Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-heading-4">Your Top Matches</CardTitle>
                  <CardDescription>Based on your profile and preferences</CardDescription>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/onboarding')}
                >
                  View All {matches.length} Matches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matches.slice(0, 5).map((match, index) => (
                  <div key={match.id} className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors border border-border hover:border-glow-cyan/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-glow-cyan/10 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-6 w-6 text-glow-cyan" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            {index === 0 && (
                              <Badge className="bg-glow-cyan text-background text-xs">
                                Top Match
                              </Badge>
                            )}
                          </div>
                          <h4 className="text-body font-semibold text-foreground mb-1 truncate">{match.universityName}</h4>
                          <p className="text-body-sm text-muted-foreground flex items-center gap-1 mb-2">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{match.city}, {match.country}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-3 flex-shrink-0">
                        <div className="text-heading-4 text-glow-cyan">{match.matchScore}%</div>
                        <p className="text-body-sm text-muted-foreground">Match</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <GraduationCap className="h-4 w-4 text-glow-blue flex-shrink-0" />
                      <span className="text-body-sm text-foreground flex-1 min-w-0 truncate">{match.programName}</span>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{match.degree}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 text-body-sm flex-wrap">
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">{formatCurrency(match.estimatedCost?.tuition || 0)}</span>/yr
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        Visa: <span className={
                          match.visaFit === 'High' ? 'text-success font-medium' :
                          match.visaFit === 'Medium' ? 'text-warning font-medium' : 'text-error font-medium'
                        }>{match.visaFit}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity & Next Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: `Found ${matches.length} perfect matches`, time: 'Just now', status: 'completed' },
                  { action: 'Completed profile assessment', time: 'Just now', status: 'completed' },
                  { action: 'Account created', time: 'Today', status: 'completed' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <div className="flex-1">
                      <p className="text-body-sm text-foreground">{activity.action}</p>
                      <p className="text-body-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Next Steps</CardTitle>
                <CardDescription>Complete these to improve your chances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { task: 'Review your top matches', priority: 'high', progress: 0 },
                  { task: 'Check visa probability', priority: 'high', progress: 0 },
                  { task: 'Compare university fees', priority: 'medium', progress: 0 },
                  { task: 'Explore campus locations', priority: 'medium', progress: 0 }
                ].map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-body-sm text-foreground">{step.task}</span>
                        <Badge 
                          variant={step.priority === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {step.priority}
                        </Badge>
                      </div>
                      <span className="text-body-sm text-muted-foreground">{step.progress}%</span>
                    </div>
                    <Progress value={step.progress} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-4">Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Compare Universities', description: 'Side-by-side comparison', link: '/dashboard/fee-comparison' },
                  { title: 'Check Visa Probability', description: 'AI-powered prediction', link: '/dashboard/visa-probability' },
                  { title: 'Location Explorer', description: 'Nearby places & jobs', link: '/dashboard/location-explorer' },
                  { title: 'Calculate Costs', description: 'Budget planner', link: '/dashboard/cost-calculator' },
                  { title: 'Find Scholarships', description: 'Auto-match & apply', link: '/dashboard/scholarships' },
                  { title: 'Generate Documents', description: 'Resume, SOP, LOR', link: '/dashboard/documents' },
                  { title: 'AI Mentor Chat', description: '24/7 assistance', link: '/dashboard/ai-mentor' }
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start gap-2 hover:border-glow-cyan hover:bg-glow-cyan/5"
                    onClick={() => navigate(action.link)}
                  >
                    <div className="text-left w-full">
                      <div className="text-body font-medium text-foreground">{action.title}</div>
                      <div className="text-body-sm text-muted-foreground">{action.description}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-glow-cyan ml-auto" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};