import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { coursesApi, modulesApi } from '@/db/api';
import type { Course, Module } from '@/types/types';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modulesByCourse, setModulesByCourse] = useState<Record<string, Module[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await coursesApi.getAllCourses();
        setCourses(coursesData);

        const modulesData: Record<string, Module[]> = {};
        for (const course of coursesData) {
          const modules = await modulesApi.getModulesByCourse(course.id);
          modulesData[course.id] = modules;
        }
        setModulesByCourse(modulesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-primary text-primary-foreground';
      case 2:
        return 'bg-secondary text-secondary-foreground';
      case 3:
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Intermediate';
      case 3:
        return 'Advanced';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Skeleton className="h-12 w-64 mb-4 bg-muted" />
          <Skeleton className="h-6 w-96 bg-muted" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-8 w-32 mb-4 bg-muted" />
                <Skeleton className="h-6 w-full mb-2 bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Excel Courses</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Master Microsoft Excel through our comprehensive three-level curriculum. 
          Each course contains multiple modules with lessons, practice exercises, and quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {courses.map((course) => {
          const modules = modulesByCourse[course.id] || [];
          return (
            <Card key={course.id} className="shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col">
              <CardHeader>
                <Badge className={`${getLevelColor(course.level)} w-fit mb-4`}>
                  {getLevelName(course.level)} Level
                </Badge>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Modules ({modules.length})
                  </h3>
                  <ul className="space-y-2">
                    {modules.slice(0, 3).map((module) => (
                      <li key={module.id} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                        <span>{module.title}</span>
                      </li>
                    ))}
                    {modules.length > 3 && (
                      <li className="text-sm text-muted-foreground italic">
                        And {modules.length - 3} more modules...
                      </li>
                    )}
                  </ul>
                </div>
                <div className="mt-auto">
                  <Button asChild className="w-full">
                    <Link to={`/courses/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {courses.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
}
