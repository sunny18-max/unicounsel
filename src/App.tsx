import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MatchProvider } from './context/MatchContext';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import DashboardRoutes from './pages/DashboardRoutes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
  };

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <MatchProvider>
      <Router>
        <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? 
            <LandingPage /> : 
            hasCompletedOnboarding ?
            <Navigate to="/dashboard" replace /> :
            <Navigate to="/onboarding" replace />
          } 
        />
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? 
            <SignInPage onLogin={handleLogin} /> : 
            hasCompletedOnboarding ?
            <Navigate to="/dashboard" replace /> :
            <Navigate to="/onboarding" replace />
          } 
        />
        <Route 
          path="/signup" 
          element={
            !isAuthenticated ? 
            <SignUpPage onSignUp={handleSignUp} /> : 
            hasCompletedOnboarding ?
            <Navigate to="/dashboard" replace /> :
            <Navigate to="/onboarding" replace />
          } 
        />
        <Route 
          path="/onboarding" 
          element={
            isAuthenticated && !hasCompletedOnboarding ? 
            <VoiceAssistantPage onComplete={handleCompleteOnboarding} /> : 
            hasCompletedOnboarding ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={
            isAuthenticated ? 
            <DashboardRoutes /> : 
            <Navigate to="/login" replace />
          } 
        />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </MatchProvider>
  );
};

export default App;