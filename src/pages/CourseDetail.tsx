import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { coursesApi, modulesApi, progressApi, quizAttemptsApi } from '@/db/api';
import { useAuth } from '@/components/auth/AuthProvider';
import type { Course, Module } from '@/types/types';
import { BookOpen, CheckCircle, Clock, ChevronRight, ArrowLeft } from 'lucide-react';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleProgress, setModuleProgress] = useState<Record<string, { completed: number; total: number; quizPassed: boolean }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;

      try {
        const courseData = await coursesApi.getCourse(courseId);
        setCourse(courseData);

        const modulesData = await modulesApi.getModulesByCourse(courseId);
        setModules(modulesData);

        if (user) {
          const progress: Record<string, { completed: number; total: number; quizPassed: boolean }> = {};
          const userProgress = await progressApi.getUserProgress(user.id);
          const userAttempts = await quizAttemptsApi.getUserAttempts(user.id);

          for (const module of modulesData) {
            const lessons = await modulesApi.getModuleWithDetails(module.id);
            const totalLessons = lessons?.lessons?.length || 0;
            const completedLessons = userProgress.filter(
              p => lessons?.lessons?.some(l => l.id === p.lesson_id) && p.completed
            ).length;

            const quiz = lessons?.quiz;
            const quizPassed = quiz ? userAttempts.some(a => a.quiz_id === quiz.id && a.passed) : false;

            progress[module.id] = {
              completed: completedLessons,
              total: totalLessons,
              quizPassed
            };
          }
          setModuleProgress(progress);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-8 w-32 mb-8 bg-muted" />
        <Skeleton className="h-12 w-96 mb-4 bg-muted" />
        <Skeleton className="h-6 w-full max-w-2xl mb-12 bg-muted" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">Course not found</p>
        <Button asChild className="mt-4">
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link to="/courses">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>
      </Button>

      <div className="mb-12">
        <Badge className="mb-4">Level {course.level}</Badge>
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {course.description}
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Course Modules</h2>
        {modules.map((module, index) => {
          const progress = moduleProgress[module.id];
          const progressPercent = progress ? Math.round((progress.completed / progress.total) * 100) : 0;
          const isComplete = progress && progress.completed === progress.total && progress.quizPassed;

          return (
            <Card key={module.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">Module {index + 1}</Badge>
                      {isComplete && (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {module.description}
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link to={`/modules/${module.id}`}>
                      Start Module
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              {user && progress && (
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{progress.completed} / {progress.total} lessons completed</span>
                    </div>
                    {progress.quizPassed && (
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span>Quiz passed</span>
                      </div>
                    )}
                  </div>
                  {progress.total > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{progressPercent}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {modules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No modules available for this course yet.</p>
        </div>
      )}
    </div>
  );
}
