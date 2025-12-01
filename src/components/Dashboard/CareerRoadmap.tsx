import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMatches } from '@/context/MatchContext';
import { 
  Briefcase, 
  Award, 
  BookOpen, 
  Code, 
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Target,
  Lightbulb,
  FileCode
} from 'lucide-react';

interface Semester {
  number: number;
  courses: string[];
  skills: string[];
  projects: string[];
  certifications: string[];
  internships?: string;
}

interface CareerPath {
  role: string;
  salary: string;
  companies: string[];
  requirements: string[];
}

const roadmapData: Record<string, {
  semesters: Semester[];
  careerPaths: CareerPath[];
}> = {
  'Computer Science': {
    semesters: [
      {
        number: 1,
        courses: ['Programming Fundamentals', 'Data Structures', 'Discrete Mathematics', 'Computer Architecture'],
        skills: ['Python', 'C++', 'Problem Solving', 'Algorithm Design'],
        projects: ['Simple Calculator', 'Student Management System', 'Sorting Visualizer'],
        certifications: ['Python for Beginners', 'Git & GitHub Essentials']
      },
      {
        number: 2,
        courses: ['Object-Oriented Programming', 'Database Systems', 'Web Development', 'Operating Systems'],
        skills: ['Java', 'SQL', 'HTML/CSS', 'JavaScript'],
        projects: ['E-commerce Website', 'Library Management System', 'Personal Portfolio'],
        certifications: ['Full Stack Web Development', 'SQL Fundamentals'],
        internships: 'Start applying for summer internships'
      },
      {
        number: 3,
        courses: ['Software Engineering', 'Computer Networks', 'AI & Machine Learning', 'Cloud Computing'],
        skills: ['React', 'Node.js', 'Machine Learning', 'AWS'],
        projects: ['Social Media App', 'ML Prediction Model', 'Cloud-based Application'],
        certifications: ['AWS Cloud Practitioner', 'Machine Learning Basics'],
        internships: 'Complete first internship'
      },
      {
        number: 4,
        courses: ['Advanced Algorithms', 'Cybersecurity', 'Mobile Development', 'Capstone Project'],
        skills: ['React Native', 'Security Protocols', 'System Design', 'DevOps'],
        projects: ['Mobile App', 'Security Audit Tool', 'Final Year Project'],
        certifications: ['Certified Ethical Hacker', 'Docker & Kubernetes'],
        internships: 'Final internship before graduation'
      }
    ],
    careerPaths: [
      {
        role: 'Software Engineer',
        salary: '$80,000 - $120,000',
        companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
        requirements: ['Strong coding skills', 'System design knowledge', 'Problem-solving ability']
      },
      {
        role: 'Data Scientist',
        salary: '$90,000 - $140,000',
        companies: ['Netflix', 'Airbnb', 'Uber', 'LinkedIn', 'Spotify'],
        requirements: ['Machine Learning', 'Statistics', 'Python/R', 'Data visualization']
      },
      {
        role: 'Full Stack Developer',
        salary: '$75,000 - $110,000',
        companies: ['Shopify', 'Stripe', 'Square', 'Atlassian', 'Salesforce'],
        requirements: ['Frontend frameworks', 'Backend development', 'Database management']
      },
      {
        role: 'DevOps Engineer',
        salary: '$85,000 - $130,000',
        companies: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'HashiCorp'],
        requirements: ['CI/CD', 'Cloud platforms', 'Automation', 'Containerization']
      }
    ]
  },
  'Business Administration': {
    semesters: [
      {
        number: 1,
        courses: ['Business Fundamentals', 'Accounting Principles', 'Economics', 'Business Communication'],
        skills: ['Financial Analysis', 'Excel', 'Business Writing', 'Presentation Skills'],
        projects: ['Market Analysis Report', 'Business Plan', 'Financial Model'],
        certifications: ['Excel for Business', 'Business Communication']
      },
      {
        number: 2,
        courses: ['Marketing Management', 'Operations Management', 'Organizational Behavior', 'Business Law'],
        skills: ['Marketing Strategy', 'Data Analysis', 'Leadership', 'Legal Compliance'],
        projects: ['Marketing Campaign', 'Process Optimization Study', 'Case Study Analysis'],
        certifications: ['Google Analytics', 'Digital Marketing Fundamentals'],
        internships: 'Apply for business internships'
      },
      {
        number: 3,
        courses: ['Strategic Management', 'Financial Management', 'Business Analytics', 'Entrepreneurship'],
        skills: ['Strategic Planning', 'Financial Modeling', 'Data-driven Decision Making', 'Innovation'],
        projects: ['Business Strategy Report', 'Startup Pitch', 'Analytics Dashboard'],
        certifications: ['Financial Modeling', 'Business Strategy'],
        internships: 'Complete first internship'
      },
      {
        number: 4,
        courses: ['International Business', 'Project Management', 'Business Ethics', 'Capstone Project'],
        skills: ['Global Business', 'Project Planning', 'Ethical Leadership', 'Consulting'],
        projects: ['International Market Entry Strategy', 'Consulting Project', 'Final Thesis'],
        certifications: ['PMP Fundamentals', 'Agile Project Management'],
        internships: 'Final internship in target industry'
      }
    ],
    careerPaths: [
      {
        role: 'Management Consultant',
        salary: '$70,000 - $120,000',
        companies: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'Accenture'],
        requirements: ['Problem-solving', 'Business acumen', 'Communication', 'Analytical skills']
      },
      {
        role: 'Product Manager',
        salary: '$85,000 - $140,000',
        companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Meta'],
        requirements: ['Product strategy', 'Technical knowledge', 'User research', 'Roadmap planning']
      },
      {
        role: 'Financial Analyst',
        salary: '$65,000 - $100,000',
        companies: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'Citi', 'Bank of America'],
        requirements: ['Financial modeling', 'Excel expertise', 'Market analysis', 'Valuation']
      },
      {
        role: 'Marketing Manager',
        salary: '$70,000 - $110,000',
        companies: ['P&G', 'Unilever', 'Nike', 'Coca-Cola', 'PepsiCo'],
        requirements: ['Marketing strategy', 'Brand management', 'Digital marketing', 'Analytics']
      }
    ]
  }
};

export const CareerRoadmap = () => {
  const [selectedField, setSelectedField] = useState('Computer Science');
  const [selectedSemester, setSelectedSemester] = useState(1);

  const currentRoadmap = roadmapData[selectedField] || roadmapData['Computer Science'];
  const currentSemester = currentRoadmap.semesters.find(s => s.number === selectedSemester);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Course to Career Roadmap</h1>
        <p className="text-body text-muted-foreground">
          Get a clear path from enrollment to employment with semester-wise guidance
        </p>
      </div>

      {/* Field Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Your Field</CardTitle>
          <CardDescription>Choose your area of study to see customized roadmap</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Business Administration">Business Administration</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {currentRoadmap.semesters.map((sem) => (
          <Card 
            key={sem.number}
            className={selectedSemester === sem.number ? 'border-glow-cyan/50 bg-glow-cyan/5' : ''}
          >
            <CardContent className="pt-6">
              <Button
                variant={selectedSemester === sem.number ? 'default' : 'ghost'}
                className="w-full justify-start gap-3"
                onClick={() => setSelectedSemester(sem.number)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedSemester === sem.number 
                    ? 'bg-glow-cyan text-background' 
                    : 'bg-secondary text-foreground'
                }`}>
                  {sem.number}
                </div>
                <div className="text-left">
                  <div className="text-body font-medium">Semester {sem.number}</div>
                  <div className="text-body-sm text-muted-foreground">{sem.courses.length} courses</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Semester Details */}
      {currentSemester && (
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-glow-cyan" />
                  Semester {currentSemester.number} Courses
                </CardTitle>
                <CardDescription>Core subjects you'll study this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentSemester.courses.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-body text-foreground">{course}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-glow-blue" />
                  Essential Skills to Learn
                </CardTitle>
                <CardDescription>Technical and soft skills for this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentSemester.skills.map((skill, idx) => (
                    <Badge key={idx} className="bg-glow-blue text-white px-4 py-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-glow-teal" />
                  Project Ideas
                </CardTitle>
                <CardDescription>Build these projects to strengthen your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSemester.projects.map((project, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Lightbulb className="h-5 w-5 text-glow-teal flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-body font-medium text-foreground mb-1">{project}</h4>
                        <p className="text-body-sm text-muted-foreground">
                          Add this to your GitHub portfolio
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-warning" />
                  Recommended Certifications
                </CardTitle>
                <CardDescription>Industry-recognized certifications to boost your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSemester.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-warning" />
                        <span className="text-body text-foreground">{cert}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="internships" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-glow-cyan" />
                  Internship Timeline
                </CardTitle>
                <CardDescription>When and where to apply for internships</CardDescription>
              </CardHeader>
              <CardContent>
                {currentSemester.internships ? (
                  <div className="p-6 bg-glow-cyan/10 border border-glow-cyan/30 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-glow-cyan/20 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-glow-cyan" />
                      </div>
                      <div>
                        <h4 className="text-heading-4 text-foreground mb-2">Action Required</h4>
                        <p className="text-body text-foreground mb-4">{currentSemester.internships}</p>
                        <div className="flex gap-2">
                          <Button className="bg-glow-cyan text-background hover:bg-glow-cyan/90">
                            Browse Opportunities
                          </Button>
                          <Button variant="outline">
                            Resume Tips
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-body">No specific internship requirements for this semester</p>
                    <p className="text-body-sm mt-1">Focus on building your skills and projects</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-success" />
            Career Paths After Graduation
          </CardTitle>
          <CardDescription>Potential job roles and career progression</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRoadmap.careerPaths.map((path, idx) => (
              <Card key={idx} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-heading-4 text-foreground mb-1">{path.role}</h4>
                      <p className="text-body font-semibold text-success">{path.salary}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-body-sm font-medium text-muted-foreground mb-2">Top Companies:</p>
                      <div className="flex flex-wrap gap-2">
                        {path.companies.slice(0, 3).map((company, cidx) => (
                          <Badge key={cidx} variant="secondary">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-body-sm font-medium text-muted-foreground mb-2">Key Requirements:</p>
                      <ul className="space-y-1">
                        {path.requirements.map((req, ridx) => (
                          <li key={ridx} className="flex items-center gap-2 text-body-sm text-foreground">
                            <ChevronRight className="h-3 w-3 text-glow-cyan" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};