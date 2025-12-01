import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useMatches } from '@/context/MatchContext';
import { Award, Search, DollarSign, Calendar, CheckCircle2, Clock, TrendingUp, AlertCircle, ExternalLink } from 'lucide-react';

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  type: 'full' | 'partial' | 'merit' | 'need-based';
  country: string;
  eligibility: string[];
  deadline: string;
  successRate: number;
  matchScore: number;
  status: 'eligible' | 'applied' | 'pending' | 'awarded';
  requirements: string[];
}

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'International Excellence Scholarship',
    provider: 'University of Cambridge',
    amount: 25000,
    type: 'merit',
    country: 'UK',
    eligibility: ['GPA > 3.5', 'IELTS > 7.0', 'International Student'],
    deadline: '2025-03-15',
    successRate: 75,
    matchScore: 92,
    status: 'eligible',
    requirements: ['Academic transcripts', 'Personal statement', 'Letter of recommendation']
  },
  {
    id: '2',
    name: 'Global Leaders Scholarship',
    provider: 'University of Toronto',
    amount: 15000,
    type: 'partial',
    country: 'Canada',
    eligibility: ['GPA > 3.0', 'Leadership experience', 'Community service'],
    deadline: '2025-04-01',
    successRate: 65,
    matchScore: 88,
    status: 'eligible',
    requirements: ['Resume', 'Essay', 'Reference letters']
  },
  {
    id: '3',
    name: 'DAAD Scholarship',
    provider: 'German Academic Exchange',
    amount: 30000,
    type: 'full',
    country: 'Germany',
    eligibility: ['Master\'s program', 'Research proposal', 'German language (B1)'],
    deadline: '2025-02-28',
    successRate: 45,
    matchScore: 78,
    status: 'eligible',
    requirements: ['Research proposal', 'CV', 'Language certificate', 'Motivation letter']
  },
  {
    id: '4',
    name: 'Chevening Scholarship',
    provider: 'UK Government',
    amount: 50000,
    type: 'full',
    country: 'UK',
    eligibility: ['Work experience 2+ years', 'Leadership potential', 'UK university offer'],
    deadline: '2025-11-02',
    successRate: 35,
    matchScore: 72,
    status: 'eligible',
    requirements: ['Work experience proof', 'Leadership essay', 'Two references', 'University offer']
  },
  {
    id: '5',
    name: 'Australia Awards Scholarship',
    provider: 'Australian Government',
    amount: 45000,
    type: 'full',
    country: 'Australia',
    eligibility: ['Developing country citizen', 'Return to home country commitment'],
    deadline: '2025-04-30',
    successRate: 40,
    matchScore: 85,
    status: 'eligible',
    requirements: ['Development proposal', 'Return commitment', 'Academic records']
  },
  {
    id: '6',
    name: 'Fulbright Foreign Student Program',
    provider: 'US Government',
    amount: 55000,
    type: 'full',
    country: 'USA',
    eligibility: ['Master\'s/PhD', 'Academic excellence', 'Leadership qualities'],
    deadline: '2025-05-15',
    successRate: 30,
    matchScore: 68,
    status: 'eligible',
    requirements: ['Research proposal', 'Three references', 'GRE scores', 'English proficiency']
  }
];

export const ScholarshipFinder = () => {
  const { matches } = useMatches();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const countries = useMemo(() => {
    if (matches.length > 0) {
      return ['all', ...new Set(matches.map(m => m.country))];
    }
    return ['all', 'UK', 'USA', 'Canada', 'Germany', 'Australia'];
  }, [matches]);

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter(scholarship => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = filterCountry === 'all' || scholarship.country === filterCountry;
      const matchesType = filterType === 'all' || scholarship.type === filterType;
      
      return matchesSearch && matchesCountry && matchesType;
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [searchTerm, filterCountry, filterType]);

  const stats = {
    totalEligible: mockScholarships.filter(s => s.status === 'eligible').length,
    totalAmount: mockScholarships.reduce((sum, s) => sum + s.amount, 0),
    avgSuccessRate: Math.round(mockScholarships.reduce((sum, s) => sum + s.successRate, 0) / mockScholarships.length),
    deadlinesSoon: mockScholarships.filter(s => {
      const deadline = new Date(s.deadline);
      const today = new Date();
      const daysUntil = Math.floor((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 30 && daysUntil > 0;
    }).length
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-success text-white';
      case 'partial': return 'bg-glow-blue text-white';
      case 'merit': return 'bg-glow-cyan text-background';
      case 'need-based': return 'bg-warning text-background';
      default: return 'bg-secondary';
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Scholarship Finder</h1>
        <p className="text-body text-muted-foreground">
          Discover scholarships you qualify for and track your applications
        </p>
      </div>

      {matches.length === 0 && (
        <Card className="border-glow-cyan/30 bg-glow-cyan/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-glow-cyan mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-body font-semibold text-foreground mb-1">Viewing Sample Scholarships</h3>
                <p className="text-body-sm text-muted-foreground">
                  Complete the assessment to get personalized scholarship recommendations based on your profile.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-cyan/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-glow-cyan" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{stats.totalEligible}</div>
                <p className="text-body-sm text-muted-foreground">Eligible</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">${(stats.totalAmount / 1000).toFixed(0)}K</div>
                <p className="text-body-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-blue/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-glow-blue" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{stats.avgSuccessRate}%</div>
                <p className="text-body-sm text-muted-foreground">Avg. Success</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{stats.deadlinesSoon}</div>
                <p className="text-body-sm text-muted-foreground">Due Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Scholarships</CardTitle>
          <CardDescription>Filter and search for opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country === 'all' ? 'All Countries' : country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full">Full Scholarship</SelectItem>
                <SelectItem value="partial">Partial Scholarship</SelectItem>
                <SelectItem value="merit">Merit-Based</SelectItem>
                <SelectItem value="need-based">Need-Based</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Scholarships List */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship) => {
          const daysUntil = getDaysUntilDeadline(scholarship.deadline);
          const isUrgent = daysUntil <= 30 && daysUntil > 0;

          return (
            <Card key={scholarship.id} className={isUrgent ? 'border-warning/50' : ''}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-glow-cyan/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-6 w-6 text-glow-cyan" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-heading-4 text-foreground mb-1">{scholarship.name}</h3>
                            <p className="text-body-sm text-muted-foreground">{scholarship.provider} • {scholarship.country}</p>
                          </div>
                          <Badge className={getTypeColor(scholarship.type)}>
                            {scholarship.type.replace('-', ' ')}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="gap-1">
                            <DollarSign className="h-3 w-3" />
                            ${scholarship.amount.toLocaleString()}
                          </Badge>
                          <Badge variant="secondary" className="gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {new Date(scholarship.deadline).toLocaleDateString()}
                          </Badge>
                          {isUrgent && (
                            <Badge className="bg-warning text-background gap-1">
                              <Clock className="h-3 w-3" />
                              {daysUntil} days left
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-body-sm font-medium text-foreground mb-1">Eligibility:</p>
                            <div className="flex flex-wrap gap-2">
                              {scholarship.eligibility.map((req, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <CheckCircle2 className="h-3 w-3 mr-1 text-success" />
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-body-sm font-medium text-foreground mb-1">Required Documents:</p>
                            <p className="text-body-sm text-muted-foreground">
                              {scholarship.requirements.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-64 space-y-3">
                    <div className="p-4 bg-glow-cyan/10 border border-glow-cyan/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-body-sm text-muted-foreground">Match Score</span>
                        <span className="text-heading-4 text-glow-cyan">{scholarship.matchScore}%</span>
                      </div>
                      <Progress value={scholarship.matchScore} className="h-2" />
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-body-sm text-muted-foreground">Success Rate</span>
                        <span className="text-body font-medium text-foreground">{scholarship.successRate}%</span>
                      </div>
                      <Progress value={scholarship.successRate} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-glow-cyan text-background hover:bg-glow-cyan/90">
                        Apply Now
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-heading-3 text-foreground mb-2">No Scholarships Found</h3>
            <p className="text-body text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};