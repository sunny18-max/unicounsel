import type { UniversityMatch, StudentProfile } from '@/types';
import type { UniversityData } from '@/lib/csvParser';
import { parseUniversityCSV } from '@/lib/csvParser';
import { findBestMatches } from '@/lib/matchingAlgorithm';
import { universityApi } from '@/services/api/universityApi';
import { matchingApi } from '@/services/api/matchingApi';

let universitiesCache: UniversityData[] | null = null;

/**
 * Load universities from backend API or fallback to CSV
 */
export const loadUniversities = async (): Promise<UniversityData[]> => {
  if (universitiesCache) {
    return universitiesCache;
  }
  
  try {
    // Try to load from backend API first
    const universities = await universityApi.getAll();
    universitiesCache = universities;
    return universities;
  } catch (error) {
    console.warn('Failed to load from API, falling back to CSV:', error);
    
    // Fallback to CSV if API fails
    try {
      const response = await fetch('/unidata.csv');
      const csvContent = await response.text();
      universitiesCache = parseUniversityCSV(csvContent);
      return universitiesCache;
    } catch (csvError) {
      console.error('Error loading university data from CSV:', csvError);
      return [];
    }
  }
};

/**
 * Generate matches using backend API or fallback to local matching
 * Returns more matches to show variety across preferred countries and fields
 */
export const generateMockMatches = async (profile: StudentProfile): Promise<UniversityMatch[]> => {
  try {
    // Try to use backend API first - request more matches
    const matches = await matchingApi.findMatches(profile, 50);
    return matches;
  } catch (error) {
    console.warn('Failed to get matches from API, using local matching:', error);
    
    // Fallback to local matching algorithm
    const universities = await loadUniversities();
    
    if (universities.length === 0) {
      console.warn('No universities loaded, returning empty matches');
      return [];
    }
    
    // Get more matches to show variety - up to 50 universities
    return findBestMatches(universities, profile, 50);
  }
};