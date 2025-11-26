import { StudentProfile, ProgramMatch, MatchingCriteria } from '../types/student';

// Mock data - In a real app, this would come from an API or database
const MOCK_PROGRAMS: ProgramMatch[] = [
  {
    id: '1',
    country: 'Germany',
    city: 'Berlin',
    university: 'Technical University of Berlin',
    programName: 'MSc Data Science',
    degree: 'MSc',
    major: 'Data Science',
    score: 0, // Will be calculated
    scoreBreakdown: {
      academic: 0,
      financial: 0,
      language: 0,
      career: 0,
      timing: 0,
    },
    visaFit: 'high',
    visaFitReason: 'Good post-study work opportunities for STEM graduates',
    estimatedCost: {
      tuition: 3000,
      living: 11000,
      currency: 'EUR',
      period: 'year',
    },
    admissionRequirements: {
      minScores: {
        bachelors: 70, // %
        ielts: 6.5,
      },
      documents: ['CV', 'SOP', 'LORs', 'Transcripts', 'Passport'],
      intakes: ['March', 'September'],
    },
    scholarshipChance: 'medium',
    nextSteps: [
      { action: 'prepare_docs', label: 'Prepare SOP' },
      { action: 'apply', label: 'Start Application' },
    ],
    confidence: 'High match based on academic and financial fit',
    explanation: 'Eligible based on academic background and budget. Visa prospects are good.',
    programLink: 'https://www.tu-berlin.de',
    applicationDeadline: '2024-07-15',
    programDuration: '2 years',
    languageOfInstruction: 'English',
  },
  // Add more programs as needed
];

const DEFAULT_CRITERIA: MatchingCriteria = {
  academicWeight: 0.4,
  financialWeight: 0.25,
  languageWeight: 0.15,
  careerWeight: 0.1,
  timingWeight: 0.1,
  minScoreThreshold: 50,
  maxResults: 10,
};

// Convert CGPA to percentage if needed
const convertToPercentage = (marks: number, maxMarks: number = 10): number => {
  return (marks / maxMarks) * 100;
};

// Calculate academic fit score (0-100)
const calculateAcademicScore = (student: StudentProfile, program: ProgramMatch): number => {
  const minScore = program.admissionRequirements.minScores.bachelors || 60;
  const studentScore = convertToPercentage(student.marks);
  
  if (studentScore >= minScore) {
    return 100; // Max score if meets or exceeds requirements
  }
  return (studentScore / minScore) * 100; // Scale score based on requirements
};

// Calculate financial fit score (0-100)
const calculateFinancialScore = (student: StudentProfile, program: ProgramMatch): number => {
  const annualBudget = student.budget.period === 'monthly' 
    ? student.budget.amount * 12 
    : student.budget.period === 'yearly' 
      ? student.budget.amount 
      : student.budget.amount / 2; // If total, assume 2-year program
  
  const totalCost = program.estimatedCost.tuition + program.estimatedCost.living;
  
  if (annualBudget >= totalCost) {
    return 100; // Can fully afford
  } else if (annualBudget >= totalCost * 0.7) {
    return 70; // Can afford with some adjustments
  } else if (annualBudget >= totalCost * 0.5) {
    return 50; // May need financial aid
  } else {
    return 30; // Significant financial gap
  }
};

// Calculate language fit score (0-100)
const calculateLanguageScore = (student: StudentProfile, program: ProgramMatch): number => {
  const minIelts = program.admissionRequirements.minScores.ielts || 6.5;
  
  if (!student.englishProficiency || student.englishProficiency.test === 'none') {
    return 0; // No language test taken
  }
  
  if (student.englishProficiency.score && student.englishProficiency.score >= minIelts) {
    return 100; // Meets or exceeds requirements
  }
  
  // If score is below requirement, scale the score
  return student.englishProficiency.score 
    ? (student.englishProficiency.score / minIelts) * 100 
    : 0;
};

// Calculate career fit score (0-100)
const calculateCareerScore = (student: StudentProfile, program: ProgramMatch): number => {
  // Simple implementation - in a real app, this would consider career goals, job market, etc.
  if (student.careerGoal === 'PR' && program.visaFit === 'high') {
    return 100;
  } else if (student.careerGoal === 'work' && program.visaFit === 'high') {
    return 90;
  } else if (student.careerGoal === 'research' && program.degree === 'PhD') {
    return 80;
  }
  return 60; // Default score
};

// Calculate timing fit score (0-100)
const calculateTimingScore = (student: StudentProfile, program: ProgramMatch): number => {
  // Simple implementation - check if the desired start date aligns with program intakes
  if (!program.admissionRequirements.intakes) return 50;
  
  const targetYear = student.startTimeframe.match(/\d{4}/)?.[0];
  const targetSeason = student.startTimeframe.toLowerCase().includes('sep') ? 'September' : 'March';
  
  if (program.admissionRequirements.intakes.includes(targetSeason)) {
    return 100;
  }
  return 50; // Partial match if season doesn't align
};

export const findMatchingPrograms = (
  student: StudentProfile,
  criteria: Partial<MatchingCriteria> = {}
): ProgramMatch[] => {
  const finalCriteria = { ...DEFAULT_CRITERIA, ...criteria };
  
  // Calculate scores for each program
  const scoredPrograms = MOCK_PROGRAMS.map(program => {
    const academicScore = calculateAcademicScore(student, program);
    const financialScore = calculateFinancialScore(student, program);
    const languageScore = calculateLanguageScore(student, program);
    const careerScore = calculateCareerScore(student, program);
    const timingScore = calculateTimingScore(student, program);
    
    // Calculate weighted total score
    const totalScore = 
      academicScore * finalCriteria.academicWeight +
      financialScore * finalCriteria.financialWeight +
      languageScore * finalCriteria.languageWeight +
      careerScore * finalCriteria.careerWeight +
      timingScore * finalCriteria.timingWeight;
    
    return {
      ...program,
      score: Math.round(totalScore * 10) / 10, // Round to 1 decimal place
      scoreBreakdown: {
        academic: Math.round(academicScore * 10) / 10,
        financial: Math.round(financialScore * 10) / 10,
        language: Math.round(languageScore * 10) / 10,
        career: Math.round(careerScore * 10) / 10,
        timing: Math.round(timingScore * 10) / 10,
      },
    };
  });
  
  // Filter and sort programs
  return scoredPrograms
    .filter(program => program.score >= finalCriteria.minScoreThreshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, finalCriteria.maxResults);
};
