import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleSignIn } from '@/components/GoogleSignIn';
import { ArrowLeft } from 'lucide-react';

interface SignInPageProps {
  onLogin: () => void;
}

const SignInPage = ({ onLogin }: SignInPageProps) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
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
            <div className="text-heading-3 text-glow-cyan mb-2">Welcome Back</div>
            <CardTitle className="text-heading-4 text-foreground">Sign In</CardTitle>
            <CardDescription className="text-body-sm text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  required
                  className="bg-card border-border focus:border-glow-cyan focus:ring-glow-cyan"
                />
              </div>
              
              <div className="text-right">
                <Link to="/forgot-password" className="text-body-sm text-glow-cyan hover:text-glow-cyan/80">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan"
                size="lg"
              >
                Sign In
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <GoogleSignIn onSuccess={onLogin} mode="signin" />

              <Button 
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => {
                  // Auto-fill demo credentials
                  const emailInput = document.getElementById('email') as HTMLInputElement;
                  const passwordInput = document.getElementById('password') as HTMLInputElement;
                  if (emailInput) emailInput.value = 'demo@example.com';
                  if (passwordInput) passwordInput.value = 'demo123';
                  onLogin();
                  navigate('/onboarding');
                }}
              >
                Continue as Demo User
              </Button>
              
              <div className="text-center text-body-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-glow-cyan hover:text-glow-cyan/80 font-medium">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;