export interface StudentProfile {
  name: string;
  nationality: string;
  highestQualification: '10th' | '12th' | 'bachelors' | 'masters' | 'phd';
  marks: number;
  fieldOfStudy: string[];
  budget: {
    amount: number;
    currency: string;
    period: 'monthly' | 'yearly' | 'total';
  };
  englishProficiency?: {
    test: 'IELTS' | 'TOEFL' | 'PTE' | 'Duolingo' | 'none';
    score?: number;
    level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  };
  preferredCountries?: string[];
  gapYears?: number;
  workExperience?: number;
  startTimeframe: string;
  preferredCityType?: 'big' | 'medium' | 'small' | 'any';
  needsScholarship?: boolean;
  careerGoal?: 'PR' | 'work' | 'research' | 'further_studies' | 'entrepreneurship';
  hasDisability?: boolean;
  disabilityType?: string;
}

export interface ProgramMatch {
  id: string;
  country: string;
  city: string;
  university: string;
  programName: string;
  degree: string;
  major: string;
  score: number;
  scoreBreakdown: {
    academic: number;
    financial: number;
    language: number;
    career: number;
    timing: number;
  };
  visaFit: 'high' | 'medium' | 'low';
  visaFitReason: string;
  estimatedCost: {
    tuition: number;
    living: number;
    currency: string;
    period: 'year' | 'month';
  };
  admissionRequirements: {
    minScores: Record<string, number>;
    documents: string[];
    intakes: string[];
  };
  scholarshipChance: 'high' | 'medium' | 'low';
  nextSteps: {
    action: 'apply' | 'prepare_docs' | 'take_tests' | 'shortlist' | 'compare';
    label: string;
  }[];
  confidence: string;
  explanation: string;
  programLink?: string;
  applicationDeadline?: string;
  programDuration?: string;
  languageOfInstruction?: string;
}

export interface MatchingCriteria {
  academicWeight: number;
  financialWeight: number;
  languageWeight: number;
  careerWeight: number;
  timingWeight: number;
  minScoreThreshold: number;
  maxResults: number;
}
