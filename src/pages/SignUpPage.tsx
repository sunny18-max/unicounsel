import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleSignIn } from '@/components/GoogleSignIn';
import { ArrowLeft } from 'lucide-react';

interface SignUpPageProps {
  onSignUp: () => void;
}

const SignUpPage = ({ onSignUp }: SignUpPageProps) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-glow-cyan/10 via-background to-glow-blue/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-glow-cyan/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-glow-blue/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="w-full max-w-md relative z-10">
        <Button
          variant="outline"
          asChild
          className="mb-6 border-border hover:border-glow-cyan/50"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="border-glow-cyan/30 shadow-lg shadow-glow-cyan/10">
          <CardHeader className="text-center">
            <div className="text-heading-3 text-glow-cyan mb-2">Join UniCounsel</div>
            <CardTitle className="text-heading-4 text-foreground">Create an Account</CardTitle>
            <CardDescription className="text-body-sm text-muted-foreground">
              Start your study abroad journey today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-body-sm text-foreground">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    required
                    className="bg-card border-border focus:border-glow-cyan focus:ring-glow-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-body-sm text-foreground">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    className="bg-card border-border focus:border-glow-cyan focus:ring-glow-cyan"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-body-sm text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-card border-border focus:border-glow-cyan focus:ring-glow-cyan"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-body-sm text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="bg-card border-border focus:border-glow-cyan focus:ring-glow-cyan"
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-body-sm text-foreground">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="bg-card border-border focus:border-glow-cyan focus:ring-glow-cyan"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan"
                size="lg"
              >
                Create Account
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
                </div>
              </div>

              <GoogleSignIn onSuccess={onSignUp} mode="signup" />
              
              <div className="text-center text-body-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-glow-cyan hover:text-glow-cyan/80 font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;