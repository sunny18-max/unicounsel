import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, 
  DollarSign, 
  FileCheck, 
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-heading-3 text-glow-cyan">
              UniCounsel
            </Link>
            <div className="flex items-center gap-4">
              <Button 
                asChild
                variant="outline"
                className="border-border hover:border-glow-cyan/50"
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button 
                asChild
                className="bg-glow-cyan text-background hover:bg-glow-cyan/90"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-glow-cyan/10 via-background to-glow-blue/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-glow-cyan/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-glow-blue/20 rounded-full blur-3xl animate-pulse-glow" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-glow-cyan/10 border border-glow-cyan/30 rounded-full">
              <Sparkles className="h-4 w-4 text-glow-cyan" />
              <span className="text-body-sm text-glow-cyan">AI-Powered Study Abroad Assistant</span>
            </div>
            
            <h1 className="text-heading-1 text-glow-cyan glow-text-cyan">
              Find Your Perfect University Program
            </h1>
            
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized university and program recommendations based on your academic profile, 
              budget, and career goals. Start your journey to studying abroad today with our AI assistant.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan text-lg px-8 py-6"
              >
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-glow-cyan text-glow-cyan hover:bg-glow-cyan/10 text-lg px-8 py-6"
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-foreground mb-4">Why Choose UniCounsel?</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and AI-powered insights to make your study abroad journey seamless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Personalized Matches',
                description: 'Get program recommendations tailored to your academic background and goals.',
                color: 'text-glow-cyan'
              },
              {
                icon: DollarSign,
                title: 'Cost Analysis',
                description: 'Understand the full cost of studying abroad, including tuition and living expenses.',
                color: 'text-glow-blue'
              },
              {
                icon: FileCheck,
                title: 'Visa Guidance',
                description: 'Learn about visa requirements and success rates for your chosen destination.',
                color: 'text-glow-teal'
              },
              {
                icon: TrendingUp,
                title: 'Career Outcomes',
                description: 'See employment rates and potential career paths after graduation.',
                color: 'text-warning'
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-glow-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-glow-cyan/20"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-glow flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-heading-4 text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-body-sm text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '10,000+', label: 'Students Helped' },
              { number: '500+', label: 'Universities' },
              { number: '50+', label: 'Countries' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-glow-cyan glow-text-cyan mb-2">
                  {stat.number}
                </div>
                <div className="text-body text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading-2 text-foreground text-center mb-12">
              Everything You Need in One Place
            </h2>
            
            <div className="space-y-4">
              {[
                'AI-powered university matching based on your profile',
                'Real-time visa probability checker with success predictions',
                'Comprehensive cost calculator and budget planner',
                'Scholarship finder with auto-application features',
                'Resume, SOP, and LOR generator',
                '24/7 AI mentor for guidance and support',
                'Interactive map showing nearby facilities and jobs',
                'Document vault for secure storage'
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-glow-cyan/30 transition-all"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-glow-cyan/10 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-glow-cyan" />
                  </div>
                  <span className="text-body text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-glow border-glow-cyan/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-glow-cyan/20 via-transparent to-glow-blue/20" />
            <CardContent className="relative z-10 p-12 text-center">
              <h2 className="text-heading-2 text-white mb-4">
                Ready to Find Your Perfect Program?
              </h2>
              <p className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of students who found their dream university with UniCounsel's AI-powered platform.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-white text-glow-cyan hover:bg-white/90 text-lg px-8 py-6"
              >
                <Link to="/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-heading-3 text-glow-cyan">UniCounsel</div>
            <div className="text-body-sm text-muted-foreground">
              © 2024 UniCounsel. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;