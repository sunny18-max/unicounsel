import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { DashboardOverview } from '@/components/Dashboard/DashboardOverview';
import { FeeComparison } from '@/components/Dashboard/FeeComparison';
import { VisaProbability } from '@/components/Dashboard/VisaProbability';
import { MapExplorer } from '@/components/Dashboard/MapExplorer';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { FeaturePlaceholder } from '@/components/Dashboard/FeaturePlaceholder';
import { 
  Calculator, 
  Award, 
  FileText, 
  Home, 
  Briefcase, 
  MapIcon, 
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
  MessageCircle
} from 'lucide-react';

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/fee-comparison" element={<FeeComparison />} />
        <Route path="/visa-probability" element={<VisaProbability />} />
        <Route path="/location-explorer" element={<MapExplorer />} />
        
        {/* Placeholder routes for other features */}
        <Route 
          path="/cost-calculator" 
          element={
            <FeaturePlaceholder
              title="Cost Calculator & Budget Planner"
              description="Calculate your monthly expenses and create a 6-month financial plan"
              icon={Calculator}
              features={[
                'Select country and city for accurate cost estimates',
                'Choose accommodation type and food preferences',
                'Get detailed monthly breakdown: Rent, Food, Transport, Insurance',
                'Generate comprehensive 6-month financial plan',
                'Compare costs across different cities',
                'Track actual expenses vs. budget'
              ]}
            />
          } 
        />
        
        <Route 
          path="/scholarships" 
          element={
            <FeaturePlaceholder
              title="Scholarship Finder & Auto-Application"
              description="Discover scholarships you qualify for and auto-fill applications"
              icon={Award}
              features={[
                'AI-powered scholarship matching based on your profile',
                'Auto-detect eligibility for 1000+ scholarships',
                'One-click application with auto-filled forms',
                'Track application status in real-time',
                'Get deadline reminders and notifications',
                'Success rate prediction for each scholarship'
              ]}
            />
          } 
        />
        
        <Route 
          path="/documents" 
          element={
            <FeaturePlaceholder
              title="AI Resume, SOP & LOR Generator"
              description="Create professional documents tailored to your target country"
              icon={FileText}
              features={[
                'Generate ATS-optimized resumes',
                'Create compelling Statement of Purpose (SOP)',
                'Draft professional Letters of Recommendation (LOR)',
                'Country-specific formatting and requirements',
                'Multiple templates and styles',
                'AI-powered content suggestions',
                'Export in multiple formats (PDF, DOCX)'
              ]}
            />
          } 
        />
        
        <Route 
          path="/accommodation" 
          element={
            <FeaturePlaceholder
              title="Accommodation Finder"
              description="Find your perfect place to stay near campus"
              icon={Home}
              features={[
                'Search hostels, student housing, and PGs',
                'Filter by price, distance, and room type',
                'View photos and virtual tours',
                'Read reviews from other students',
                'Compare amenities and facilities',
                'Direct booking integration',
                'Temporary stay options (Airbnb-like)'
              ]}
            />
          } 
        />
        
        <Route 
          path="/job-market" 
          element={
            <FeaturePlaceholder
              title="Real-Time Job Market Analyzer"
              description="Understand career prospects for your chosen course"
              icon={Briefcase}
              features={[
                'Job demand analysis by course and country',
                'Salary range insights (entry to senior level)',
                'Top hiring companies in your field',
                'Skill gap analysis and recommendations',
                'Employability score calculation',
                'Industry growth trends',
                'Part-time job opportunities while studying'
              ]}
            />
          } 
        />
        
        <Route 
          path="/career-roadmap" 
          element={
            <FeaturePlaceholder
              title="Course to Career Roadmap"
              description="Get a clear path from enrollment to employment"
              icon={MapIcon}
              features={[
                'Semester-wise course subjects breakdown',
                'Essential skills to learn for each semester',
                'Project ideas and portfolio building',
                'Recommended certifications',
                'Internship opportunities timeline',
                'Job roles after graduation',
                'Step-by-step career progression path'
              ]}
            />
          } 
        />
        
        <Route 
          path="/visa-checklist" 
          element={
            <FeaturePlaceholder
              title="Visa Document Auto-Checklist"
              description="Never miss a document with our dynamic checklist"
              icon={FileCheck2}
              features={[
                'Country-specific document requirements',
                'Program and student finance-based checklist',
                'Real-time document tracking',
                'Missing document alerts',
                'Document upload and storage',
                'Verification status tracking',
                'Embassy appointment reminders'
              ]}
            />
          } 
        />
        
        <Route 
          path="/safety-score" 
          element={
            <FeaturePlaceholder
              title="Country Safety Score & City Insights"
              description="Make informed decisions about your study destination"
              icon={Shield}
              features={[
                'Crime rate and safety statistics',
                'Weather and climate information',
                'Indian community size and support',
                'Food availability and dietary options',
                'Travel routes and connectivity',
                'Cultural behavior and customs',
                'Emergency services and healthcare'
              ]}
            />
          } 
        />
        
        <Route 
          path="/ai-mentor" 
          element={
            <FeaturePlaceholder
              title="24/7 AI Mentor"
              description="Your personal assistant for studying abroad"
              icon={MessageSquare}
              features={[
                'Open bank account guidance',
                'Get SIM card and phone setup',
                'Find part-time job opportunities',
                'Emergency help and support',
                'City navigation and transport',
                'Law rules for international students',
                'Cultural adaptation tips'
              ]}
            />
          } 
        />
        
        <Route 
          path="/interview-trainer" 
          element={
            <FeaturePlaceholder
              title="AI Interview Trainer"
              description="Practice and ace your university and visa interviews"
              icon={Video}
              features={[
                'University admission interview prep',
                'Visa interview simulation',
                'Common embassy questions practice',
                'AI-powered feedback and scoring',
                'Video recording and playback',
                'Body language analysis',
                'Unlimited practice sessions'
              ]}
            />
          } 
        />
        
        <Route 
          path="/document-vault" 
          element={
            <FeaturePlaceholder
              title="Secure Document Vault"
              description="Store all your important documents in one safe place"
              icon={FolderLock}
              features={[
                'Encrypted cloud storage',
                'Store passport, visa, certificates',
                'Fee receipts and financial documents',
                'Easy access from anywhere',
                'Share documents securely',
                'Automatic backup',
                'Document expiry reminders'
              ]}
            />
          } 
        />
        
        <Route 
          path="/country-switching" 
          element={
            <FeaturePlaceholder
              title="Country Switching Advisor"
              description="Get backup options if your application is rejected"
              icon={RefreshCw}
              features={[
                'Alternative country suggestions',
                'Backup university recommendations',
                'Similar course options',
                'New timeline generation',
                'Visa success probability for alternatives',
                'Cost comparison with original choice',
                'Quick application process'
              ]}
            />
          } 
        />
        
        <Route 
          path="/study-score" 
          element={
            <FeaturePlaceholder
              title="Study Abroad Score"
              description="Your comprehensive eligibility score (0-100)"
              icon={TrendingUp}
              features={[
                'Overall eligibility assessment',
                'Visa chances calculation',
                'Financial strength evaluation',
                'Academic fit analysis',
                'Detailed score breakdown',
                'Improvement recommendations',
                'Compare with successful students'
              ]}
            />
          } 
        />
        
        <Route 
          path="/timetable" 
          element={
            <FeaturePlaceholder
              title="AI Timetable Planner"
              description="Plan your preparation and application timeline"
              icon={Calendar}
              features={[
                'IELTS/TOEFL preparation schedule',
                'Visa application timeline',
                'Document collection deadlines',
                'University application dates',
                'Scholarship deadlines',
                'Smart reminders and notifications',
                'Sync with calendar apps'
              ]}
            />
          } 
        />
        
        <Route 
          path="/parents" 
          element={
            <FeaturePlaceholder
              title="Parents Dashboard"
              description="Keep parents informed about your study abroad journey"
              icon={Users}
              features={[
                'Student progress tracking',
                'Safety updates and check-ins',
                'Fee payment tracking',
                'Accommodation information',
                'Academic performance reports',
                'Emergency contact integration',
                'Real-time location sharing (optional)'
              ]}
            />
          } 
        />
        
        <Route 
          path="/one-click-apply" 
          element={
            <FeaturePlaceholder
              title="One-Click University Application"
              description="Apply to multiple universities with a single click"
              icon={Zap}
              features={[
                'Pre-filled application forms',
                'Apply to multiple universities at once',
                'Auto-upload required documents',
                'Track all applications in one place',
                'Application fee payment integration',
                'Status updates and notifications',
                'Success rate prediction'
              ]}
            />
          } 
        />
        
        <Route 
          path="/community" 
          element={
            <FeaturePlaceholder
              title="AI Community Forum"
              description="Connect with students and get AI-powered answers"
              icon={MessageCircle}
              features={[
                'Ask questions to AI and community',
                'Learn from past student experiences',
                'Country-specific discussion threads',
                'University-specific groups',
                'Share tips and advice',
                'Verified answers from successful students',
                'Real-time chat with peers'
              ]}
            />
          } 
        />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;