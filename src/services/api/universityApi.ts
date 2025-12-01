import { API_ENDPOINTS, apiRequest, type PaginatedResponse } from '@/config/api';
import type { UniversityData } from '@/lib/csvParser';

export const universityApi = {
  /**
   * Get all universities
   */
  getAll: async (): Promise<UniversityData[]> => {
    const response = await apiRequest<UniversityData[]>(API_ENDPOINTS.UNIVERSITIES);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch universities');
  },

  /**
   * Get university by ID
   */
  getById: async (id: string): Promise<UniversityData> => {
    const response = await apiRequest<UniversityData>(API_ENDPOINTS.UNIVERSITY_BY_ID(id));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch university');
  },

  /**
   * Search universities
   */
  search: async (params: {
    query?: string;
    country?: string;
    city?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<UniversityData>> => {
    const queryParams = new URLSearchParams();
    if (params.query) queryParams.append('query', params.query);
    if (params.country) queryParams.append('country', params.country);
    if (params.city) queryParams.append('city', params.city);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.offset) queryParams.append('offset', params.offset.toString());

    const url = `${API_ENDPOINTS.SEARCH_UNIVERSITIES}?${queryParams.toString()}`;
    const response = await apiRequest<PaginatedResponse<UniversityData>>(url);
    
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to search universities');
  },

  /**
   * Get universities by country
   */
  getByCountry: async (country: string): Promise<UniversityData[]> => {
    const response = await apiRequest<UniversityData[]>(API_ENDPOINTS.UNIVERSITIES_BY_COUNTRY(country));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch universities by country');
  },

  /**
   * Get all countries
   */
  getCountries: async (): Promise<string[]> => {
    const response = await apiRequest<string[]>(API_ENDPOINTS.COUNTRIES);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch countries');
  },

  /**
   * Get cities by country
   */
  getCitiesByCountry: async (country: string): Promise<string[]> => {
    const response = await apiRequest<string[]>(API_ENDPOINTS.CITIES_BY_COUNTRY(country));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch cities');
  },

  /**
   * Get university statistics
   */
  getStats: async () => {
    const response = await apiRequest(API_ENDPOINTS.UNIVERSITY_STATS);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch statistics');
  },
};

