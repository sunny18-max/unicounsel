import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { DashboardOverview } from '@/components/Dashboard/DashboardOverview';
import { FeeComparison } from '@/components/Dashboard/FeeComparison';
import { VisaProbability } from '@/components/Dashboard/VisaProbability';
import { MapExplorer } from '@/components/Dashboard/MapExplorer';
import { CostCalculator } from '@/components/Dashboard/CostCalculator';
import { ScholarshipFinder } from '@/components/Dashboard/ScholarshipFinder';
import { DocumentGenerator } from '@/components/Dashboard/DocumentGenerator';
import { AccommodationFinder } from '@/components/Dashboard/AccommodationFinder';
import { JobMarketAnalyzer } from '@/components/Dashboard/JobMarketAnalyzer';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { FeaturePlaceholder } from '@/components/Dashboard/FeaturePlaceholder';
import { CareerRoadmap } from '@/components/Dashboard/CareerRoadmap';
import { VisaChecklist } from '@/components/Dashboard/VisaChecklist';
import { SafetyScore } from '@/components/Dashboard/SafetyScore';
import { AIMentor } from '@/components/Dashboard/AIMentor';
import { InterviewTrainer } from '@/components/Dashboard/InterviewTrainer';
import { DocumentVault } from '@/components/Dashboard/DocumentVault';
import { CountrySwitching } from '@/components/Dashboard/CountrySwitching';
import { StudyScore } from '@/components/Dashboard/StudyScore';
import { TimetablePlanner } from '@/components/Dashboard/TimetablePlanner';
import { 
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
        
        {/* Implemented features */}
        <Route path="/cost-calculator" element={<CostCalculator />} />
        <Route path="/scholarships" element={<ScholarshipFinder />} />
        <Route path="/documents" element={<DocumentGenerator />} />
        <Route path="/accommodation" element={<AccommodationFinder />} />
        <Route path="/job-market" element={<JobMarketAnalyzer />} />
        
        <Route path="/career-roadmap" element={<CareerRoadmap />} />
        
        <Route path="/visa-checklist" element={<VisaChecklist />} />
        
        <Route path="/safety-score" element={<SafetyScore />} />
        
        <Route path="/ai-mentor" element={<AIMentor />} />
        
        <Route path="/interview-trainer" element={<InterviewTrainer />} />
        <Route path="/document-vault" element={<DocumentVault />} />
        <Route path="/country-switching" element={<CountrySwitching />} />
        <Route path="/study-score" element={<StudyScore />} />
        <Route path="/timetable" element={<TimetablePlanner />} />
        
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