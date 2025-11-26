import type { UniversityData } from './csvParser';
import type { UniversityMatch, StudentProfile, VisaFitLevel } from '@/types';

// Country-specific data
const countryData: Record<string, {
  visaFit: VisaFitLevel;
  visaReason: string;
  avgLivingCost: number;
  workPRScore: number;
  popularPrograms: string[];
}> = {
  'USA': {
    visaFit: 'High',
    visaReason: 'Strong academic profile increases F-1 visa approval rate',
    avgLivingCost: 18000,
    workPRScore: 10,
    popularPrograms: ['Computer Science', 'Business', 'Engineering', 'Data Science']
  },
  'United Kingdom': {
    visaFit: 'High',
    visaReason: 'Graduate Route visa allows 2 years post-study work',
    avgLivingCost: 15000,
    workPRScore: 7,
    popularPrograms: ['Business', 'Engineering', 'Medicine', 'Law']
  },
  'Canada': {
    visaFit: 'Medium',
    visaReason: 'Study permit straightforward but PR pathway competitive',
    avgLivingCost: 14000,
    workPRScore: 8,
    popularPrograms: ['Computer Science', 'Business', 'Engineering']
  },
  'Australia': {
    visaFit: 'High',
    visaReason: 'Streamlined visa process and post-study work rights',
    avgLivingCost: 16000,
    workPRScore: 7,
    popularPrograms: ['Engineering', 'IT', 'Business', 'Health Sciences']
  },
  'Germany': {
    visaFit: 'Medium',
    visaReason: 'Language requirements and visa interview process',
    avgLivingCost: 12000,
    workPRScore: 6,
    popularPrograms: ['Engineering', 'Computer Science', 'Business']
  },
  'Default': {
    visaFit: 'Medium',
    visaReason: 'Standard visa process with moderate success rate',
    avgLivingCost: 10000,
    workPRScore: 5,
    popularPrograms: ['General Studies']
  }
};

// Program-specific data
const programData: Record<string, {
  degrees: string[];
  avgTuition: number;
  minScore: string;
  documents: string[];
}> = {
  'Computer Science': {
    degrees: ['BSc', 'MSc', 'PhD'],
    avgTuition: 35000,
    minScore: 'GRE 320+, TOEFL 100+ or IELTS 7.0+',
    documents: ['Transcripts', 'SOP', '2-3 LORs', 'Resume', 'Portfolio']
  },
  'Business': {
    degrees: ['BBA', 'MBA', 'MSc'],
    avgTuition: 40000,
    minScore: 'GMAT 650+ or GRE 315+, TOEFL 100+ or IELTS 7.0+',
    documents: ['Transcripts', 'SOP', '2 LORs', 'Resume', 'Work Experience']
  },
  'Engineering': {
    degrees: ['BEng', 'MEng', 'PhD'],
    avgTuition: 32000,
    minScore: 'GRE 315+, TOEFL 90+ or IELTS 6.5+',
    documents: ['Transcripts', 'SOP', '3 LORs', 'Resume', 'Projects']
  },
  'Medicine': {
    degrees: ['MBBS', 'MD', 'PhD'],
    avgTuition: 50000,
    minScore: 'MCAT 510+, TOEFL 100+ or IELTS 7.5+',
    documents: ['Transcripts', 'Personal Statement', '3 LORs', 'Clinical Experience']
  },
  'Default': {
    degrees: ['BA', 'MA', 'PhD'],
    avgTuition: 25000,
    minScore: 'TOEFL 80+ or IELTS 6.0+',
    documents: ['Transcripts', 'SOP', '2 LORs', 'Resume']
  }
};

export const enrichUniversityData = (
  university: UniversityData,
  profile: StudentProfile
): UniversityMatch => {
  // Get country-specific data
  const countryInfo = countryData[university.country] || countryData['Default'];
  
  // Determine program based on student's field
  const programKey = Object.keys(programData).find(key => 
    profile.field.toLowerCase().includes(key.toLowerCase())
  ) || 'Default';
  const programInfo = programData[programKey];
  
  // Calculate match scores
  const academicFit = calculateAcademicFit(profile, programInfo);
  const financialFit = calculateFinancialFit(profile, programInfo.avgTuition, countryInfo.avgLivingCost);
  const languageFit = calculateLanguageFit(profile);
  const intakeTiming = calculateIntakeTiming();
  const workPRFriendliness = countryInfo.workPRScore;
  
  const matchScore = academicFit + financialFit + languageFit + intakeTiming + workPRFriendliness;
  
  // Select appropriate degree based on qualification
  const degree = selectDegree(profile.qualification, programInfo.degrees);
  
  return {
    id: `${university.name}-${Date.now()}`,
    country: university.country,
    city: university.city,
    universityName: university.name,
    programName: `${degree} in ${profile.field}`,
    degree: degree,
    major: profile.field,
    matchScore: Math.round(matchScore),
    scoreBreakdown: {
      academicFit: Math.round(academicFit),
      financialFit: Math.round(financialFit),
      languageFit: Math.round(languageFit),
      intakeTiming: Math.round(intakeTiming),
      workPRFriendliness: workPRFriendliness
    },
    visaFit: countryInfo.visaFit,
    visaFitReason: countryInfo.visaReason,
    estimatedCost: {
      tuition: programInfo.avgTuition,
      living: countryInfo.avgLivingCost,
      total: programInfo.avgTuition + countryInfo.avgLivingCost
    },
    requirements: {
      minScore: programInfo.minScore,
      documents: programInfo.documents,
      nextIntakes: generateIntakes()
    }
  };
};

const calculateAcademicFit = (profile: StudentProfile, _programInfo: typeof programData['Default']): number => {
  let score = 0;
  
  // Base score from marks (max 25)
  if (profile.marks >= 90) score += 25;
  else if (profile.marks >= 80) score += 22;
  else if (profile.marks >= 70) score += 18;
  else if (profile.marks >= 60) score += 14;
  else score += 10;
  
  // Qualification match (max 10)
  if (profile.qualification === 'Postgraduate') score += 10;
  else if (profile.qualification === 'Undergraduate') score += 8;
  else score += 5;
  
  // Gap years penalty (max -5)
  score -= Math.min(profile.gapYears * 1, 5);
  
  return Math.max(0, Math.min(40, score));
};

const calculateFinancialFit = (profile: StudentProfile, tuition: number, living: number): number => {
  const totalCost = tuition + living;
  const budgetMid = (profile.budgetMin + profile.budgetMax) / 2;
  
  if (totalCost <= budgetMid) return 25;
  if (totalCost <= budgetMid * 1.2) return 20;
  if (totalCost <= budgetMid * 1.5) return 15;
  if (totalCost <= budgetMid * 2) return 10;
  return 5;
};

const calculateLanguageFit = (profile: StudentProfile): number => {
  if (!profile.englishTest || profile.englishTest === 'None') return 8;
  
  const score = profile.englishScore || 0;
  
  if (profile.englishTest === 'IELTS') {
    if (score >= 7.5) return 15;
    if (score >= 7.0) return 13;
    if (score >= 6.5) return 11;
    if (score >= 6.0) return 9;
    return 7;
  }
  
  if (profile.englishTest === 'TOEFL') {
    if (score >= 100) return 15;
    if (score >= 90) return 13;
    if (score >= 80) return 11;
    if (score >= 70) return 9;
    return 7;
  }
  
  return 10;
};

const calculateIntakeTiming = (): number => {
  // Random score for demo - in production, calculate based on current date vs intake dates
  return Math.floor(Math.random() * 5) + 5;
};

const selectDegree = (qualification: string, availableDegrees: string[]): string => {
  if (qualification === 'Postgraduate') {
    return availableDegrees.find(d => d.includes('PhD')) || availableDegrees[availableDegrees.length - 1];
  }
  if (qualification === 'Undergraduate') {
    return availableDegrees.find(d => d.includes('M') || d.includes('MSc') || d.includes('MA')) || availableDegrees[1] || availableDegrees[0];
  }
  return availableDegrees[0];
};

const generateIntakes = (): string[] => {
  const intakes = [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = new Date().getMonth();
  
  // Add next 2-3 upcoming intakes
  for (let i = 0; i < 3; i++) {
    const monthIndex = (currentMonth + (i * 4)) % 12;
    const year = new Date().getFullYear() + Math.floor((currentMonth + (i * 4)) / 12);
    intakes.push(`${months[monthIndex]} ${year}`);
  }
  
  return intakes;
};