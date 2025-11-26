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
    text: "What is your budget range per year?",
    placeholder: "e.g., $20,000 - $40,000",
    required: true
  },
  {
    id: 'english',
    text: "Do you have an English proficiency score?",
    placeholder: "e.g., IELTS 7.0, TOEFL 100",
    required: false
  },
  {
    id: 'countries',
    text: "Which countries do you prefer to study in?",
    placeholder: "e.g., USA, UK, Canada, Australia",
    required: false
  },
  {
    id: 'gaps',
    text: "Do you have any gap years in your education?",
    placeholder: "e.g., 0, 1, 2 years",
    required: false
  }
];