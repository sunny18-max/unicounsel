import type { StudentProfile, UniversityMatch } from '@/types';
import type { UniversityData } from './csvParser';
import { enrichUniversityData } from './dataEnricher';

export const findBestMatches = (
  universities: UniversityData[],
  profile: StudentProfile,
  topN: number = 50
): UniversityMatch[] => {
  let allMatches: UniversityMatch[] = [];
  
  // If preferred countries specified, ensure we get matches from ALL of them
  if (profile.preferredCountries && profile.preferredCountries.length > 0) {
    // Get matches from each preferred country
    profile.preferredCountries.forEach(preferredCountry => {
      const countryUniversities = universities.filter(uni => 
        uni.country.toLowerCase().includes(preferredCountry.toLowerCase()) ||
        preferredCountry.toLowerCase().includes(uni.country.toLowerCase())
      );
      
      // Enrich universities from this country
      const countryMatches = countryUniversities.map(uni => 
        enrichUniversityData(uni, profile)
      );
      
      allMatches.push(...countryMatches);
    });
    
    // If we didn't get enough matches from preferred countries, add from other countries
    if (allMatches.length < topN) {
      const otherUniversities = universities.filter(uni => 
        !profile.preferredCountries!.some(country => 
          uni.country.toLowerCase().includes(country.toLowerCase()) ||
          country.toLowerCase().includes(uni.country.toLowerCase())
        )
      );
      
      const otherMatches = otherUniversities.map(uni => 
        enrichUniversityData(uni, profile)
      );
      
      allMatches.push(...otherMatches);
    }
  } else {
    // No country preference - use all universities
    allMatches = universities.map(uni => 
      enrichUniversityData(uni, profile)
    );
  }
  
  // Remove duplicates (same university might appear multiple times)
  const uniqueMatches = Array.from(
    new Map(allMatches.map(match => [match.universityName + match.country, match])).values()
  );
  
  // Sort by match score (descending)
  const sortedMatches = uniqueMatches.sort((a, b) => b.matchScore - a.matchScore);
  
  // Return top N matches ensuring diversity across countries
  return ensureCountryDiversity(sortedMatches, profile, topN);
};

/**
 * Ensure matches include universities from all preferred countries
 */
const ensureCountryDiversity = (
  matches: UniversityMatch[],
  profile: StudentProfile,
  topN: number
): UniversityMatch[] => {
  if (!profile.preferredCountries || profile.preferredCountries.length === 0) {
    return matches.slice(0, topN);
  }
  
  const result: UniversityMatch[] = [];
  const matchesByCountry = new Map<string, UniversityMatch[]>();
  
  // Group matches by country
  matches.forEach(match => {
    const country = match.country;
    if (!matchesByCountry.has(country)) {
      matchesByCountry.set(country, []);
    }
    matchesByCountry.get(country)!.push(match);
  });
  
  // Ensure at least some matches from each preferred country
  const minPerCountry = Math.max(3, Math.floor(topN / profile.preferredCountries.length));
  
  profile.preferredCountries.forEach(preferredCountry => {
    // Find matches from this country
    for (const [country, countryMatches] of matchesByCountry.entries()) {
      if (country.toLowerCase().includes(preferredCountry.toLowerCase()) ||
          preferredCountry.toLowerCase().includes(country.toLowerCase())) {
        // Add top matches from this country
        const toAdd = countryMatches.slice(0, minPerCountry);
        result.push(...toAdd);
        
        // Remove added matches
        matchesByCountry.set(country, countryMatches.slice(minPerCountry));
        break;
      }
    }
  });
  
  // Fill remaining slots with best remaining matches
  const remaining = matches.filter(m => !result.includes(m));
  result.push(...remaining.slice(0, topN - result.length));
  
  return result.slice(0, topN);
};