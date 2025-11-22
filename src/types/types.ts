export type UserRole = 'student' | 'admin';

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  role: UserRole;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  level: number;
  order_index: number;
  created_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  video_url: string | null;
  order_index: number;
  created_at: string;
}

export interface Quiz {
  id: string;
  module_id: string;
  title: string;
  passing_score: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  order_index: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, number> | null;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  certificate_number: string;
  issued_at: string;
}

export interface ModuleWithDetails extends Module {
  lessons?: Lesson[];
  quiz?: Quiz;
}

export interface CourseWithModules extends Course {
  modules?: ModuleWithDetails[];
}

export interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  passedQuizzes: number;
  overallProgress: number;
}
