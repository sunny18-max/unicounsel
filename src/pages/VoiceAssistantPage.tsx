import { VoiceAssistant } from '@/components/VoiceAssistant';
import type { UniversityMatch } from '@/types';

interface VoiceAssistantPageProps {
  onComplete: (matches: UniversityMatch[]) => void;
}

const VoiceAssistantPage = ({ onComplete }: VoiceAssistantPageProps) => {
  return <VoiceAssistant onComplete={onComplete} />;
};

export default VoiceAssistantPage;