import type { UniversityMatch, StudentProfile } from '@/types';
import type { UniversityData } from '@/lib/csvParser';
import { parseUniversityCSV } from '@/lib/csvParser';
import { findBestMatches } from '@/lib/matchingAlgorithm';

let universitiesCache: UniversityData[] | null = null;

export const loadUniversities = async (): Promise<UniversityData[]> => {
  if (universitiesCache) {
    return universitiesCache;
  }
  
  try {
    const response = await fetch('/unidata.csv');
    const csvContent = await response.text();
    universitiesCache = parseUniversityCSV(csvContent);
    return universitiesCache;
  } catch (error) {
    console.error('Error loading university data:', error);
    return [];
  }
};

export const generateMockMatches = async (profile: StudentProfile): Promise<UniversityMatch[]> => {
  const universities = await loadUniversities();
  
  if (universities.length === 0) {
    console.warn('No universities loaded, returning empty matches');
    return [];
  }
  
  return findBestMatches(universities, profile, 10);
};