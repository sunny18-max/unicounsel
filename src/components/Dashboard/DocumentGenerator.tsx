import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useMatches } from '@/context/MatchContext';
import { FileText, Download, Copy, Sparkles, CheckCircle2, FileCheck, User, AlertCircle } from 'lucide-react';

export const DocumentGenerator = () => {
  const { matches, studentProfile } = useMatches();
  const [documentType, setDocumentType] = useState<'resume' | 'sop' | 'lor'>('resume');
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  // Form states
  const [resumeData, setResumeData] = useState({
    name: studentProfile?.name || '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    projects: ''
  });

  const [sopData, setSOPData] = useState({
    targetProgram: '',
    university: '',
    motivation: '',
    background: '',
    goals: '',
    whyUniversity: ''
  });

  const [lorData, setLORData] = useState({
    recommenderName: '',
    recommenderTitle: '',
    relationship: '',
    duration: '',
    strengths: '',
    achievements: ''
  });

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const sampleResume = `JOHN DOE
Email: john.doe@email.com | Phone: +1-234-567-8900
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

EDUCATION
Bachelor of Technology in Computer Science                    2019 - 2023
XYZ University, India                                         CGPA: 8.5/10

EXPERIENCE
Software Engineering Intern                                   Jun 2022 - Aug 2022
Tech Company Inc., Bangalore
• Developed and deployed 3 full-stack web applications using React and Node.js
• Improved application performance by 40% through code optimization
• Collaborated with cross-functional team of 8 members

TECHNICAL SKILLS
Languages: Python, JavaScript, Java, C++
Frameworks: React, Node.js, Express, Django
Tools: Git, Docker, AWS, MongoDB

PROJECTS
E-Commerce Platform                                           Jan 2023 - Apr 2023
• Built full-stack e-commerce application with React and Node.js
• Implemented secure payment gateway integration
• Deployed on AWS with 99.9% uptime

ACHIEVEMENTS
• Winner, National Hackathon 2022
• Published research paper in IEEE conference
• Dean's List for Academic Excellence (2021, 2022)`;

  const sampleSOP = `Statement of Purpose

I am writing to express my strong interest in pursuing a Master's degree in Computer Science at [University Name]. With a solid foundation in software engineering and a passion for artificial intelligence, I am eager to advance my knowledge and contribute to cutting-edge research in machine learning.

During my undergraduate studies at XYZ University, I developed a deep fascination with AI and its potential to solve real-world problems. My final year project on natural language processing achieved 92% accuracy in sentiment analysis, which reinforced my desire to pursue graduate studies in this field.

My professional experience as a Software Engineering Intern at Tech Company Inc. provided valuable insights into industry practices and strengthened my technical skills. I worked on developing scalable web applications and gained hands-on experience with modern development frameworks.

I am particularly drawn to [University Name] because of its renowned faculty in AI research and state-of-the-art facilities. Professor [Name]'s work on deep learning aligns perfectly with my research interests. I am confident that the rigorous curriculum and research opportunities at your institution will help me achieve my goal of becoming a leading researcher in artificial intelligence.

Upon completion of my Master's degree, I plan to pursue a career in AI research, either in academia or industry, where I can contribute to developing innovative solutions that benefit society.

Thank you for considering my application.

Sincerely,
[Your Name]`;

  const sampleLOR = `Letter of Recommendation

To Whom It May Concern,

I am writing this letter to highly recommend [Student Name] for admission to your Master's program in Computer Science. I have had the pleasure of teaching and mentoring [Student Name] for the past two years as their professor and research supervisor at XYZ University.

[Student Name] has consistently demonstrated exceptional academic ability and a genuine passion for computer science. In my Advanced Algorithms course, they ranked in the top 5% of the class and showed remarkable problem-solving skills. Their ability to grasp complex concepts quickly and apply them creatively sets them apart from their peers.

What impresses me most about [Student Name] is their dedication to research. Under my supervision, they worked on a natural language processing project that resulted in a publication at an IEEE conference. They showed great initiative, worked independently, and demonstrated strong analytical thinking throughout the research process.

Beyond academics, [Student Name] is an excellent team player with strong leadership qualities. They served as the president of the Computer Science Club and organized several successful technical workshops and hackathons.

I have no doubt that [Student Name] will excel in graduate studies and make significant contributions to your program. They have my highest recommendation without reservation.

Sincerely,
Dr. [Professor Name]
Professor of Computer Science
XYZ University`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">AI Document Generator</h1>
        <p className="text-body text-muted-foreground">
          Create professional Resume, SOP, and LOR tailored to your target country
        </p>
      </div>

      {matches.length === 0 && (
        <Card className="border-glow-cyan/30 bg-glow-cyan/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-glow-cyan mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-body font-semibold text-foreground mb-1">Profile Information Needed</h3>
                <p className="text-body-sm text-muted-foreground">
                  Complete the assessment to auto-fill your profile information for better document generation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={documentType} onValueChange={(v) => setDocumentType(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resume" className="gap-2">
            <User className="h-4 w-4" />
            Resume
          </TabsTrigger>
          <TabsTrigger value="sop" className="gap-2">
            <FileText className="h-4 w-4" />
            SOP
          </TabsTrigger>
          <TabsTrigger value="lor" className="gap-2">
            <FileCheck className="h-4 w-4" />
            LOR
          </TabsTrigger>
        </TabsList>

        {/* Resume Tab */}
        <TabsContent value="resume" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Details</CardTitle>
                <CardDescription>Fill in your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Format will be optimized for {selectedCountry}</p>
                </div>

                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={resumeData.name}
                    onChange={(e) => setResumeData({...resumeData, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => setResumeData({...resumeData, email: e.target.value})}
                      placeholder="john@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      value={resumeData.phone}
                      onChange={(e) => setResumeData({...resumeData, phone: e.target.value})}
                      placeholder="+1-234-567-8900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Education</Label>
                  <Textarea 
                    value={resumeData.education}
                    onChange={(e) => setResumeData({...resumeData, education: e.target.value})}
                    placeholder="Bachelor of Technology in Computer Science, XYZ University (2019-2023)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Work Experience</Label>
                  <Textarea 
                    value={resumeData.experience}
                    onChange={(e) => setResumeData({...resumeData, experience: e.target.value})}
                    placeholder="Software Engineer Intern at ABC Company..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <Textarea 
                    value={resumeData.skills}
                    onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
                    placeholder="Python, JavaScript, React, Node.js..."
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate ATS-Optimized Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Resume</CardTitle>
                    <CardDescription>Preview and download</CardDescription>
                  </div>
                  {generated && (
                    <Badge className="bg-success text-white gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Ready
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/30 p-6 rounded-lg min-h-[500px] font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-foreground">
                    {generated ? sampleResume : 'Your resume will appear here after generation...'}
                  </pre>
                </div>

                {generated && (
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Download DOCX
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SOP Tab */}
        <TabsContent value="sop" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SOP Details</CardTitle>
                <CardDescription>Tell us about your goals and motivation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Program</Label>
                  <Input 
                    value={sopData.targetProgram}
                    onChange={(e) => setSOPData({...sopData, targetProgram: e.target.value})}
                    placeholder="Master's in Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Target University</Label>
                  <Select value={sopData.university} onValueChange={(v) => setSOPData({...sopData, university: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select university" />
                    </SelectTrigger>
                    <SelectContent>
                      {matches.length > 0 ? (
                        matches.slice(0, 5).map(match => (
                          <SelectItem key={match.id} value={match.universityName}>
                            {match.universityName}
                          </SelectItem>
                        ))
                      ) : (
                        <>
                          <SelectItem value="MIT">MIT</SelectItem>
                          <SelectItem value="Stanford">Stanford University</SelectItem>
                          <SelectItem value="Cambridge">University of Cambridge</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Your Motivation</Label>
                  <Textarea 
                    value={sopData.motivation}
                    onChange={(e) => setSOPData({...sopData, motivation: e.target.value})}
                    placeholder="Why do you want to pursue this program?"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Academic Background</Label>
                  <Textarea 
                    value={sopData.background}
                    onChange={(e) => setSOPData({...sopData, background: e.target.value})}
                    placeholder="Describe your academic achievements and relevant projects..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Career Goals</Label>
                  <Textarea 
                    value={sopData.goals}
                    onChange={(e) => setSOPData({...sopData, goals: e.target.value})}
                    placeholder="What are your career aspirations?"
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Compelling SOP
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated SOP</CardTitle>
                    <CardDescription>Preview and download</CardDescription>
                  </div>
                  {generated && (
                    <Badge className="bg-success text-white gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Ready
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/30 p-6 rounded-lg min-h-[500px] text-sm">
                  <div className="whitespace-pre-wrap text-foreground">
                    {generated ? sampleSOP : 'Your Statement of Purpose will appear here after generation...'}
                  </div>
                </div>

                {generated && (
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Download DOCX
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* LOR Tab */}
        <TabsContent value="lor" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>LOR Details</CardTitle>
                <CardDescription>Information about your recommender</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Recommender Name</Label>
                  <Input 
                    value={lorData.recommenderName}
                    onChange={(e) => setLORData({...lorData, recommenderName: e.target.value})}
                    placeholder="Dr. John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Recommender Title</Label>
                  <Input 
                    value={lorData.recommenderTitle}
                    onChange={(e) => setLORData({...lorData, recommenderTitle: e.target.value})}
                    placeholder="Professor of Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Your Relationship</Label>
                  <Select value={lorData.relationship} onValueChange={(v) => setLORData({...lorData, relationship: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">Professor/Teacher</SelectItem>
                      <SelectItem value="supervisor">Research Supervisor</SelectItem>
                      <SelectItem value="manager">Work Manager</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Duration of Association</Label>
                  <Input 
                    value={lorData.duration}
                    onChange={(e) => setLORData({...lorData, duration: e.target.value})}
                    placeholder="2 years"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Your Key Strengths</Label>
                  <Textarea 
                    value={lorData.strengths}
                    onChange={(e) => setLORData({...lorData, strengths: e.target.value})}
                    placeholder="Leadership, problem-solving, research skills..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Notable Achievements</Label>
                  <Textarea 
                    value={lorData.achievements}
                    onChange={(e) => setLORData({...lorData, achievements: e.target.value})}
                    placeholder="Published research, won competitions, led projects..."
                    rows={4}
                  />
                </div>

                <Button 
                  className="w-full bg-glow-cyan text-background hover:bg-glow-cyan/90 gap-2"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Professional LOR
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated LOR</CardTitle>
                    <CardDescription>Preview and download</CardDescription>
                  </div>
                  {generated && (
                    <Badge className="bg-success text-white gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Ready
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/30 p-6 rounded-lg min-h-[500px] text-sm">
                  <div className="whitespace-pre-wrap text-foreground">
                    {generated ? sampleLOR : 'Your Letter of Recommendation will appear here after generation...'}
                  </div>
                </div>

                {generated && (
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Download DOCX
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};