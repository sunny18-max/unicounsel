import { API_ENDPOINTS, apiRequest, type ApiResponse } from '@/config/api';
import type { UniversityMatch, StudentProfile } from '@/types';

export const matchingApi = {
  /**
   * Find best matches for a student profile
   */
  findMatches: async (
    profile: StudentProfile,
    limit: number = 10
  ): Promise<UniversityMatch[]> => {
    const queryParams = limit ? `?limit=${limit}` : '';
    const response = await apiRequest<UniversityMatch[]>(
      `${API_ENDPOINTS.FIND_MATCHES}${queryParams}`,
      {
        method: 'POST',
        body: JSON.stringify(profile),
      }
    );

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to find matches');
  },

  /**
   * Find matches filtered by country
   */
  findMatchesByCountry: async (
    profile: StudentProfile,
    country: string,
    limit: number = 10
  ): Promise<UniversityMatch[]> => {
    const queryParams = limit ? `?limit=${limit}` : '';
    const response = await apiRequest<UniversityMatch[]>(
      `${API_ENDPOINTS.FIND_MATCHES_BY_COUNTRY(country)}${queryParams}`,
      {
        method: 'POST',
        body: JSON.stringify(profile),
      }
    );

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to find matches by country');
  },
};

