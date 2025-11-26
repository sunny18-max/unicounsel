import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = '1073684776924-dtuue457sas2dmrb7jqmaelt9v7572k1.apps.googleusercontent.com';

// Google icon SVG component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

interface GoogleSignInProps {
  onSuccess: () => void;
  mode?: 'signin' | 'signup';
}

// Google OAuth types
interface CredentialResponse {
  credential: string;
  select_by: string;
}

type PromptMomentNotification = {
  isDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  isSkipped: () => boolean;
  getSkippedReason: () => string;
  isDismissed: () => boolean;
  getDismissedReason: () => string;
  getMomentType: () => string;
};

type PromptCallback = (notification: PromptMomentNotification) => void;

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (element: HTMLElement, config: {
            type: string;
            theme: string;
            size: string;
            text: string;
            shape: string;
            logo_alignment: string;
            width: string | number;
          }) => void;
          prompt: (callback?: PromptCallback) => void;
        };
      };
    };
  }
}

export const GoogleSignIn = ({ onSuccess, mode = 'signin' }: GoogleSignInProps) => {
  const navigate = useNavigate();

  const handleCredentialResponse = (response: CredentialResponse) => {
    try {
      // Decode the JWT token to get user info
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const userInfo = JSON.parse(jsonPayload);
      
      // Store user info
      const user = {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        sub: userInfo.sub,
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Call success callback and navigate
      onSuccess();
      navigate('/onboarding');
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    // Check if running on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      alert(
        '🔒 Google Sign-In on Localhost\n\n' +
        'Google Sign-In requires a production domain to work properly.\n\n' +
        '✅ For testing, please use the "Continue as Demo User" button below.\n\n' +
        'To enable Google Sign-In in production:\n' +
        '1. Deploy your app to a production domain\n' +
        '2. Add the domain to Google Cloud Console authorized domains\n' +
        '3. Update the OAuth client settings with your domain'
      );
      return;
    }

    if (window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Trigger the Google Sign-In popup
        window.google.accounts.id.prompt();
      } catch (error) {
        console.error('Google Sign-In initialization error:', error);
        alert(
          'Unable to initialize Google Sign-In.\n\n' +
          'Please use the "Continue as Demo User" button to proceed.'
        );
      }
    } else {
      console.error('Google Sign-In library not loaded');
      alert('Google Sign-In is not available. Please refresh the page and try again.');
    }
  };

  return (
    <Button 
      type="button"
      variant="outline"
      className="w-full"
      size="lg"
      onClick={handleGoogleSignIn}
    >
      <GoogleIcon />
      <span className="ml-2">
        {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
      </span>
    </Button>
  );
};