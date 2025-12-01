import type { Question } from '@/types';

export const questions: Question[] = [
  {
    id: 'name',
    text: "What is your name?",
    placeholder: "Enter your full name",
    required: true
  },
  {
    id: 'nationality',
    text: "What is your nationality?",
    placeholder: "e.g., Indian, American, Chinese",
    required: true
  },
  {
    id: 'qualification',
    text: "What is your highest qualification?",
    options: ['10th', '12th', 'Undergraduate', 'Postgraduate'],
    required: true
  },
  {
    id: 'marks',
    text: "What are your marks or CGPA?",
    placeholder: "e.g., 85% or 8.5 CGPA",
    required: true
  },
  {
    id: 'field',
    text: "What field or subjects are you interested in?",
    placeholder: "e.g., Computer Science, Business, Medicine",
    required: true
  },
  {
    id: 'budget',
    text: "What is your budget range per year for tuition and living expenses?",
    placeholder: "e.g., $20,000 - $40,000",
    required: true
  },
  {
    id: 'english',
    text: "Do you have an English proficiency score like IELTS or TOEFL?",
    placeholder: "e.g., IELTS 7.0, TOEFL 100, or None",
    required: false
  },
  {
    id: 'countries',
    text: "Which countries do you prefer to study in?",
    placeholder: "e.g., USA, UK, Canada, Australia, Germany",
    required: false
  },
  {
    id: 'gaps',
    text: "Do you have any gap years in your education?",
    placeholder: "e.g., 0, 1, 2 years",
    required: false
  }
];

// Suggested responses for common questions
export const suggestedAnswers: Record<string, string[]> = {
  field: [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Medicine',
    'Data Science',
    'Psychology',
    'Law',
    'Arts & Design'
  ],
  budget: [
    '$10,000 - $20,000',
    '$20,000 - $40,000',
    '$40,000 - $60,000',
    '$60,000+'
  ],
  countries: [
    'USA',
    'UK',
    'Canada',
    'Australia',
    'Germany',
    'Netherlands',
    'Ireland',
    'New Zealand'
  ],
  english: [
    'IELTS 6.5',
    'IELTS 7.0',
    'IELTS 7.5',
    'TOEFL 90',
    'TOEFL 100',
    'None'
  ],
  gaps: [
    '0 years',
    '1 year',
    '2 years',
    '3+ years'
  ],
  nationality: [
    'Indian',
    'Chinese',
    'Nigerian',
    'Pakistani',
    'Bangladeshi',
    'Vietnamese',
    'Other'
  ],
  marks: [
    '60-70%',
    '70-80%',
    '80-90%',
    '90%+',
    '6.0-7.0 CGPA',
    '7.0-8.0 CGPA',
    '8.0+ CGPA'
  ]
};