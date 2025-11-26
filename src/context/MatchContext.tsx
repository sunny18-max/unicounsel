import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UniversityMatch, StudentProfile } from '@/types';

interface MatchContextType {
  matches: UniversityMatch[];
  studentProfile: StudentProfile | null;
  setMatches: (matches: UniversityMatch[]) => void;
  setStudentProfile: (profile: StudentProfile) => void;
  clearMatches: () => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatchesState] = useState<UniversityMatch[]>(() => {
    const saved = localStorage.getItem('studentMatches');
    return saved ? JSON.parse(saved) : [];
  });

  const [studentProfile, setStudentProfileState] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('studentProfile');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('studentMatches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    if (studentProfile) {
      localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
    }
  }, [studentProfile]);

  const setMatches = (newMatches: UniversityMatch[]) => {
    setMatchesState(newMatches);
  };

  const setStudentProfile = (profile: StudentProfile) => {
    setStudentProfileState(profile);
  };

  const clearMatches = () => {
    setMatchesState([]);
    setStudentProfileState(null);
    localStorage.removeItem('studentMatches');
    localStorage.removeItem('studentProfile');
  };

  return (
    <MatchContext.Provider value={{ matches, studentProfile, setMatches, setStudentProfile, clearMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatches = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatches must be used within a MatchProvider');
  }
  return context;
};