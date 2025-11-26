// Student qualification levels
export type QualificationType = '10th' | '12th' | 'Undergraduate' | 'Postgraduate';

// English proficiency tests
export type EnglishTestType = 'IELTS' | 'TOEFL' | 'PTE' | 'Duolingo' | 'None';

// Visa fit levels
export type VisaFitLevel = 'High' | 'Medium' | 'Low';

// Question types
export type QuestionType = 'name' | 'nationality' | 'qualification' | 'marks' | 'field' | 'budget' | 'english' | 'countries' | 'gaps';

// Conversation states
export type ConversationState = 'idle' | 'listening' | 'processing' | 'speaking' | 'completed';

// Student profile data
export interface StudentProfile {
  name: string;
  nationality: string;
  qualification: QualificationType;
  marks: number; // CGPA or percentage
  field: string;
  budgetMin: number;
  budgetMax: number;
  englishTest?: EnglishTestType;
  englishScore?: number;
  preferredCountries?: string[];
  gapYears: number;
}

// Match result data
export interface UniversityMatch {
  id: string;
  country: string;
  city: string;
  universityName: string;
  programName: string;
  degree: string;
  major: string;
  matchScore: number;
  scoreBreakdown: {
    academicFit: number;
    financialFit: number;
    languageFit: number;
    intakeTiming: number;
    workPRFriendliness: number;
  };
  visaFit: VisaFitLevel;
  visaFitReason: string;
  estimatedCost: {
    tuition: number;
    living: number;
    total: number;
  };
  requirements: {
    minScore: string;
    documents: string[];
    nextIntakes: string[];
  };
}

// Question data
export interface Question {
  id: QuestionType;
  text: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
}