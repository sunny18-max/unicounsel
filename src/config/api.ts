// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const API_ENDPOINTS = {
  // University endpoints
  UNIVERSITIES: `${API_BASE_URL}/universities`,
  UNIVERSITY_BY_ID: (id: string) => `${API_BASE_URL}/universities/${id}`,
  SEARCH_UNIVERSITIES: `${API_BASE_URL}/universities/search`,
  UNIVERSITIES_BY_COUNTRY: (country: string) => `${API_BASE_URL}/universities/countries/${country}`,
  CITIES_BY_COUNTRY: (country: string) => `${API_BASE_URL}/universities/countries/${country}/cities`,
  COUNTRIES: `${API_BASE_URL}/universities/countries`,
  UNIVERSITY_STATS: `${API_BASE_URL}/universities/stats`,
  
  // Matching endpoints
  FIND_MATCHES: `${API_BASE_URL}/matches`,
  FIND_MATCHES_BY_COUNTRY: (country: string) => `${API_BASE_URL}/matches/country/${country}`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      return {
        success: false,
        error: errorData.error || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
};

