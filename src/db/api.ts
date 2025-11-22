import { supabase } from './supabase';
import type {
  Profile,
  Course,
  Module,
  Lesson,
  Quiz,
  QuizQuestion,
  UserProgress,
  QuizAttempt,
  Certificate,
  CourseWithModules,
  ModuleWithDetails,
  ProgressStats
} from '@/types/types';

export const profilesApi = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};

export const coursesApi = {
  async getAllCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getCourse(courseId: string): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getCourseWithModules(courseId: string): Promise<CourseWithModules | null> {
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .maybeSingle();
    
    if (courseError) throw courseError;
    if (!course) return null;

    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });
    
    if (modulesError) throw modulesError;

    return {
      ...course,
      modules: Array.isArray(modules) ? modules : []
    };
  },

  async createCourse(course: Omit<Course, 'id' | 'created_at'>): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateCourse(courseId: string, updates: Partial<Course>): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', courseId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async deleteCourse(courseId: string): Promise<void> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);
    
    if (error) throw error;
  }
};

export const modulesApi = {
  async getModulesByCourse(courseId: string): Promise<Module[]> {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getModule(moduleId: string): Promise<Module | null> {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getModuleWithDetails(moduleId: string): Promise<ModuleWithDetails | null> {
    const { data: module, error: moduleError } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .maybeSingle();
    
    if (moduleError) throw moduleError;
    if (!module) return null;

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index', { ascending: true });
    
    if (lessonsError) throw lessonsError;

    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('module_id', moduleId)
      .maybeSingle();
    
    if (quizError) throw quizError;

    return {
      ...module,
      lessons: Array.isArray(lessons) ? lessons : [],
      quiz: quiz || undefined
    };
  },

  async createModule(module: Omit<Module, 'id' | 'created_at'>): Promise<Module | null> {
    const { data, error } = await supabase
      .from('modules')
      .insert(module)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateModule(moduleId: string, updates: Partial<Module>): Promise<Module | null> {
    const { data, error } = await supabase
      .from('modules')
      .update(updates)
      .eq('id', moduleId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async deleteModule(moduleId: string): Promise<void> {
    const { error } = await supabase
      .from('modules')
      .delete()
      .eq('id', moduleId);
    
    if (error) throw error;
  }
};

export const lessonsApi = {
  async getLessonsByModule(moduleId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getLesson(lessonId: string): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async createLesson(lesson: Omit<Lesson, 'id' | 'created_at'>): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .insert(lesson)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateLesson(lessonId: string, updates: Partial<Lesson>): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', lessonId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async deleteLesson(lessonId: string): Promise<void> {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', lessonId);
    
    if (error) throw error;
  }
};

export const quizzesApi = {
  async getQuizByModule(moduleId: string): Promise<Quiz | null> {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('module_id', moduleId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getQuiz(quizId: string): Promise<Quiz | null> {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async createQuiz(quiz: Omit<Quiz, 'id' | 'created_at'>): Promise<Quiz | null> {
    const { data, error } = await supabase
      .from('quizzes')
      .insert(quiz)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateQuiz(quizId: string, updates: Partial<Quiz>): Promise<Quiz | null> {
    const { data, error } = await supabase
      .from('quizzes')
      .update(updates)
      .eq('id', quizId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async deleteQuiz(quizId: string): Promise<void> {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quizId);
    
    if (error) throw error;
  }
};

export const quizQuestionsApi = {
  async getQuestionsByQuiz(quizId: string): Promise<QuizQuestion[]> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getQuestion(questionId: string): Promise<QuizQuestion | null> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('id', questionId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async createQuestion(question: Omit<QuizQuestion, 'id' | 'created_at'>): Promise<QuizQuestion | null> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(question)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateQuestion(questionId: string, updates: Partial<QuizQuestion>): Promise<QuizQuestion | null> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .update(updates)
      .eq('id', questionId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async deleteQuestion(questionId: string): Promise<void> {
    const { error } = await supabase
      .from('quiz_questions')
      .delete()
      .eq('id', questionId);
    
    if (error) throw error;
  }
};

export const progressApi = {
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getLessonProgress(userId: string, lessonId: string): Promise<UserProgress | null> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async markLessonComplete(userId: string, lessonId: string): Promise<UserProgress | null> {
    const existing = await this.getLessonProgress(userId, lessonId);
    
    if (existing) {
      const { data, error } = await supabase
        .from('user_progress')
        .update({ completed: true, completed_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        })
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  },

  async getProgressStats(userId: string): Promise<ProgressStats> {
    const { data: allLessons } = await supabase
      .from('lessons')
      .select('id');
    
    const { data: completedProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('completed', true);
    
    const { data: allQuizzes } = await supabase
      .from('quizzes')
      .select('id');
    
    const { data: passedAttempts } = await supabase
      .from('quiz_attempts')
      .select('quiz_id')
      .eq('user_id', userId)
      .eq('passed', true);
    
    const totalLessons = allLessons?.length || 0;
    const completedLessons = completedProgress?.length || 0;
    const totalQuizzes = allQuizzes?.length || 0;
    const uniquePassedQuizzes = new Set(passedAttempts?.map(a => a.quiz_id) || []).size;
    
    const totalItems = totalLessons + totalQuizzes;
    const completedItems = completedLessons + uniquePassedQuizzes;
    const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    return {
      totalLessons,
      completedLessons,
      totalQuizzes,
      passedQuizzes: uniquePassedQuizzes,
      overallProgress
    };
  }
};

export const quizAttemptsApi = {
  async getUserAttempts(userId: string): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getQuizAttempts(userId: string, quizId: string): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getBestAttempt(userId: string, quizId: string): Promise<QuizAttempt | null> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .order('score', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async submitAttempt(attempt: Omit<QuizAttempt, 'id' | 'created_at'>): Promise<QuizAttempt | null> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert(attempt)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};

export const certificatesApi = {
  async getUserCertificate(userId: string): Promise<Certificate | null> {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async generateCertificate(userId: string): Promise<Certificate | null> {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const certificateNumber = `EXCEL-${year}-${random}`;
    
    const { data, error } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        certificate_number: certificateNumber
      })
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async checkEligibility(userId: string): Promise<boolean> {
    const stats = await progressApi.getProgressStats(userId);
    return stats.completedLessons === stats.totalLessons && 
           stats.passedQuizzes === stats.totalQuizzes &&
           stats.totalLessons > 0 &&
           stats.totalQuizzes > 0;
  }
};
