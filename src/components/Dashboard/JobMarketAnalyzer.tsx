import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useMatches } from '@/context/MatchContext';
import { Briefcase, TrendingUp, DollarSign, Award, BookOpen, Clock, AlertCircle, Building2, Target } from 'lucide-react';

interface JobData {
  role: string;
  avgSalary: { entry: number; mid: number; senior: number };
  demand: number;
  growth: number;
  topCompanies: string[];
  requiredSkills: string[];
  partTimeAvailable: boolean;
}

const jobMarketData: Record<string, Record<string, JobData>> = {
  'Computer Science': {
    'USA': {
      role: 'Software Engineer',
      avgSalary: { entry: 85000, mid: 120000, senior: 180000 },
      demand: 92,
      growth: 22,
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
      requiredSkills: ['Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'System Design'],
      partTimeAvailable: true
    },
    'UK': {
      role: 'Software Developer',
      avgSalary: { entry: 45000, mid: 65000, senior: 95000 },
      demand: 88,
      growth: 18,
      topCompanies: ['Google UK', 'Amazon UK', 'Revolut', 'Monzo', 'DeepMind'],
      requiredSkills: ['Java', 'Python', 'TypeScript', 'Docker', 'Kubernetes'],
      partTimeAvailable: true
    },
    'Canada': {
      role: 'Software Engineer',
      avgSalary: { entry: 70000, mid: 95000, senior: 140000 },
      demand: 85,
      growth: 20,
      topCompanies: ['Shopify', 'Amazon Canada', 'Google Canada', 'RBC', 'TD Bank'],
      requiredSkills: ['Python', 'Java', 'React', 'Cloud Computing', 'Agile'],
      partTimeAvailable: true
    },
    'Germany': {
      role: 'Software Entwickler',
      avgSalary: { entry: 55000, mid: 75000, senior: 110000 },
      demand: 90,
      growth: 19,
      topCompanies: ['SAP', 'Siemens', 'BMW', 'Bosch', 'Zalando'],
      requiredSkills: ['Java', 'Python', 'C++', 'Microservices', 'DevOps'],
      partTimeAvailable: true
    },
    'Australia': {
      role: 'Software Engineer',
      avgSalary: { entry: 75000, mid: 105000, senior: 150000 },
      demand: 87,
      growth: 21,
      topCompanies: ['Atlassian', 'Canva', 'Commonwealth Bank', 'Telstra', 'REA Group'],
      requiredSkills: ['JavaScript', 'Python', 'AWS', 'React', 'Agile'],
      partTimeAvailable: true
    }
  },
  'Business': {
    'USA': {
      role: 'Business Analyst',
      avgSalary: { entry: 65000, mid: 90000, senior: 130000 },
      demand: 78,
      growth: 14,
      topCompanies: ['McKinsey', 'BCG', 'Deloitte', 'Accenture', 'IBM'],
      requiredSkills: ['Data Analysis', 'Excel', 'SQL', 'Business Intelligence', 'Communication'],
      partTimeAvailable: false
    }
  },
  'Data Science': {
    'USA': {
      role: 'Data Scientist',
      avgSalary: { entry: 95000, mid: 130000, senior: 190000 },
      demand: 95,
      growth: 28,
      topCompanies: ['Google', 'Meta', 'Netflix', 'Uber', 'Airbnb'],
      requiredSkills: ['Python', 'R', 'Machine Learning', 'SQL', 'Statistics', 'Deep Learning'],
      partTimeAvailable: true
    }
  }
};

export const JobMarketAnalyzer = () => {
  const { matches } = useMatches();
  
  const countries = useMemo(() => {
    if (matches.length > 0) {
      return [...new Set(matches.map(m => m.country))];
    }
    return ['USA', 'UK', 'Canada', 'Germany', 'Australia'];
  }, [matches]);

  const [selectedCountry, setSelectedCountry] = useState(countries[0] || 'USA');
  const [selectedField, setSelectedField] = useState('Computer Science');

  const jobData = jobMarketData[selectedField]?.[selectedCountry] || jobMarketData['Computer Science']['USA'];

  const employabilityScore = Math.round((jobData.demand + jobData.growth) / 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Job Market Analyzer</h1>
        <p className="text-body text-muted-foreground">
          Real-time insights into career prospects for your chosen field
        </p>
      </div>

      {matches.length === 0 && (
        <Card className="border-glow-cyan/30 bg-glow-cyan/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-glow-cyan mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-body font-semibold text-foreground mb-1">Viewing Sample Data</h3>
                <p className="text-body-sm text-muted-foreground">
                  Complete the assessment to see job market analysis for your specific field and target countries.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Select Your Parameters</CardTitle>
          <CardDescription>Choose your field and target country</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-body-sm font-medium">Field of Study</label>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Business">Business Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-body-sm font-medium">Target Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-cyan/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-glow-cyan" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{jobData.demand}%</div>
                <p className="text-body-sm text-muted-foreground">Job Demand</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">+{jobData.growth}%</div>
                <p className="text-body-sm text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-blue/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-glow-blue" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">{employabilityScore}%</div>
                <p className="text-body-sm text-muted-foreground">Employability</p>
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
                <div className="text-heading-4 text-foreground">{jobData.partTimeAvailable ? 'Yes' : 'No'}</div>
                <p className="text-body-sm text-muted-foreground">Part-time Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-success" />
            Salary Insights - {jobData.role}
          </CardTitle>
          <CardDescription>Average annual salaries in {selectedCountry}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-glow-cyan/10 to-glow-blue/10 rounded-lg border border-glow-cyan/30">
              <p className="text-body-sm text-muted-foreground mb-2">Entry Level (0-2 years)</p>
              <p className="text-heading-2 text-glow-cyan mb-1">${jobData.avgSalary.entry.toLocaleString()}</p>
              <p className="text-body-sm text-muted-foreground">per year</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-glow-blue/10 to-success/10 rounded-lg border border-glow-blue/30">
              <p className="text-body-sm text-muted-foreground mb-2">Mid Level (3-7 years)</p>
              <p className="text-heading-2 text-glow-blue mb-1">${jobData.avgSalary.mid.toLocaleString()}</p>
              <p className="text-body-sm text-muted-foreground">per year</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-success/10 to-warning/10 rounded-lg border border-success/30">
              <p className="text-body-sm text-muted-foreground mb-2">Senior Level (8+ years)</p>
              <p className="text-heading-2 text-success mb-1">${jobData.avgSalary.senior.toLocaleString()}</p>
              <p className="text-body-sm text-muted-foreground">per year</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-glow-cyan" />
              Top Hiring Companies
            </CardTitle>
            <CardDescription>Leading employers in {selectedCountry}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {jobData.topCompanies.map((company, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-glow-cyan/10 flex items-center justify-center">
                      <span className="text-body-sm font-semibold text-glow-cyan">{idx + 1}</span>
                    </div>
                    <span className="text-body font-medium text-foreground">{company}</span>
                  </div>
                  <Badge variant="secondary">Hiring</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-glow-blue" />
              In-Demand Skills
            </CardTitle>
            <CardDescription>Skills employers are looking for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobData.requiredSkills.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-medium text-foreground">{skill}</span>
                    <span className="text-body-sm text-muted-foreground">
                      {95 - idx * 5}% demand
                    </span>
                  </div>
                  <Progress value={95 - idx * 5} className="h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-glow-cyan/10 border border-glow-cyan/30 rounded-lg">
              <p className="text-body-sm text-foreground">
                <strong>💡 Recommendation:</strong> Focus on mastering the top 3 skills to maximize your employability.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part-time Opportunities */}
      {jobData.partTimeAvailable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-warning" />
              Part-Time Job Opportunities
            </CardTitle>
            <CardDescription>Work while you study in {selectedCountry}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="text-body font-semibold text-foreground mb-2">Campus Jobs</h4>
                <p className="text-body-sm text-muted-foreground mb-3">
                  Library assistant, research assistant, teaching assistant
                </p>
                <Badge className="bg-success text-white">$15-25/hr</Badge>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="text-body font-semibold text-foreground mb-2">Tech Internships</h4>
                <p className="text-body-sm text-muted-foreground mb-3">
                  Software development, data analysis, QA testing
                </p>
                <Badge className="bg-success text-white">$20-35/hr</Badge>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="text-body font-semibold text-foreground mb-2">Freelancing</h4>
                <p className="text-body-sm text-muted-foreground mb-3">
                  Web development, tutoring, content writing
                </p>
                <Badge className="bg-success text-white">$18-40/hr</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};