import type { StudentProfile, UniversityMatch } from '@/types';
import type { UniversityData } from './csvParser';
import { enrichUniversityData } from './dataEnricher';

export const findBestMatches = (
  universities: UniversityData[],
  profile: StudentProfile,
  topN: number = 10
): UniversityMatch[] => {
  // Filter universities based on preferred countries if specified
  let filteredUniversities = universities;
  
  if (profile.preferredCountries && profile.preferredCountries.length > 0) {
    filteredUniversities = universities.filter(uni => 
      profile.preferredCountries!.some(country => 
        uni.country.toLowerCase().includes(country.toLowerCase()) ||
        country.toLowerCase().includes(uni.country.toLowerCase())
      )
    );
  }
  
  // If no universities match preferred countries, use all
  if (filteredUniversities.length === 0) {
    filteredUniversities = universities;
  }
  
  // Enrich all universities with match data
  const enrichedMatches = filteredUniversities.map(uni => 
    enrichUniversityData(uni, profile)
  );
  
  // Sort by match score (descending)
  const sortedMatches = enrichedMatches.sort((a, b) => b.matchScore - a.matchScore);
  
  // Return top N matches
  return sortedMatches.slice(0, topN);
};