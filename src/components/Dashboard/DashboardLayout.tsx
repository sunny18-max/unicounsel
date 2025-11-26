import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMatches } from '@/context/MatchContext';
import { 
  LayoutDashboard, 
  DollarSign, 
  FileCheck, 
  Calculator, 
  Award, 
  FileText, 
  Home, 
  Briefcase, 
  Map as MapIcon, 
  FileCheck2, 
  Shield, 
  MessageSquare, 
  Video, 
  FolderLock, 
  RefreshCw,
  TrendingUp,
  Calendar,
  Users,
  Zap,
  MessageCircle,
  Menu,
  X,
  MapPin,
  LogOut,
  ArrowLeft,
  Heart
} from 'lucide-react';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'favorites', label: 'My Favorites', icon: Heart, path: '/dashboard/favorites' },
  { id: 'fee-comparison', label: 'Fee Comparison', icon: DollarSign, path: '/dashboard/fee-comparison' },
  { id: 'visa-probability', label: 'Visa Probability', icon: FileCheck, path: '/dashboard/visa-probability' },
  { id: 'location-explorer', label: 'Location Explorer', icon: MapPin, path: '/dashboard/location-explorer' },
  { id: 'cost-calculator', label: 'Cost Calculator', icon: Calculator, path: '/dashboard/cost-calculator' },
  { id: 'scholarships', label: 'Scholarship Finder', icon: Award, path: '/dashboard/scholarships' },
  { id: 'documents', label: 'Resume & SOP Generator', icon: FileText, path: '/dashboard/documents' },
  { id: 'accommodation', label: 'Accommodation Finder', icon: Home, path: '/dashboard/accommodation' },
  { id: 'job-market', label: 'Job Market Analyzer', icon: Briefcase, path: '/dashboard/job-market' },
  { id: 'career-roadmap', label: 'Course to Career', icon: MapIcon, path: '/dashboard/career-roadmap' },
  { id: 'visa-checklist', label: 'Visa Checklist', icon: FileCheck2, path: '/dashboard/visa-checklist' },
  { id: 'safety-score', label: 'Safety & City Insights', icon: Shield, path: '/dashboard/safety-score' },
  { id: 'ai-mentor', label: '24/7 AI Mentor', icon: MessageSquare, path: '/dashboard/ai-mentor' },
  { id: 'interview-trainer', label: 'Interview Trainer', icon: Video, path: '/dashboard/interview-trainer' },
  { id: 'document-vault', label: 'Document Vault', icon: FolderLock, path: '/dashboard/document-vault' },
  { id: 'country-switching', label: 'Country Switching', icon: RefreshCw, path: '/dashboard/country-switching' },
  { id: 'study-score', label: 'Study Abroad Score', icon: TrendingUp, path: '/dashboard/study-score' },
  { id: 'timetable', label: 'Timetable Planner', icon: Calendar, path: '/dashboard/timetable' },
  { id: 'parents-dashboard', label: 'Parents Dashboard', icon: Users, path: '/dashboard/parents' },
  { id: 'one-click-apply', label: 'One-Click Application', icon: Zap, path: '/dashboard/one-click-apply' },
  { id: 'community', label: 'AI Community Forum', icon: MessageCircle, path: '/dashboard/community' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { matches, clearMatches } = useMatches();

  const handleLogout = () => {
    // Clear all stored data
    clearMatches();
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('savedMatches');
    
    // Redirect to home
    navigate('/');
    window.location.reload();
  };

  const handleBackToMatches = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card border-border"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Top Bar */}
      <div className="fixed top-0 right-0 left-0 lg:left-72 z-30 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            {matches.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToMatches}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Matches</span>
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2 border-error text-error hover:bg-error/10"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen bg-card border-r border-border transition-transform duration-300 z-40',
          'w-72',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-heading-3 text-glow-cyan">UniCounsel</h1>
          <p className="text-body-sm text-muted-foreground mt-1">Student Dashboard</p>
        </div>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-secondary/50',
                    isActive && 'bg-glow-cyan/10 text-glow-cyan border border-glow-cyan/30'
                  )}
                >
                  <Icon className={cn('h-5 w-5', isActive && 'text-glow-cyan')} />
                  <span className={cn('text-body-sm', isActive && 'font-medium text-glow-cyan')}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'transition-all duration-300',
          'lg:ml-72',
          'min-h-screen',
          'pt-16'
        )}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};