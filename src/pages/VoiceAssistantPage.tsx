import { FuturisticVoiceAssistant } from '@/components/VoiceAssistant/FuturisticVoiceAssistant';
import type { UniversityMatch } from '@/types';

interface VoiceAssistantPageProps {
  onComplete: (matches: UniversityMatch[]) => void;
}

const VoiceAssistantPage = ({ onComplete }: VoiceAssistantPageProps) => {
  return <FuturisticVoiceAssistant onComplete={onComplete} />;
};

export default VoiceAssistantPage;