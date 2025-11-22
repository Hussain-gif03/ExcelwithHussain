import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Award, TrendingUp, CheckCircle, Users } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { profilesApi } from '@/db/api';

export default function Home() {
  const { user } = useAuth();
  const [enrolledCount, setEnrolledCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollmentCount = async () => {
      try {
        const profiles = await profilesApi.getAllProfiles();
        setEnrolledCount(profiles.length);
      } catch (error) {
        console.error('Error fetching enrollment count:', error);
        setEnrolledCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollmentCount();
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Structured Learning Path',
      description: 'Progress from beginner to advanced with our carefully designed curriculum'
    },
    {
      icon: CheckCircle,
      title: 'Practice Exercises',
      description: 'Apply what you learn with hands-on exercises for each module'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed progress analytics'
    },
    {
      icon: Award,
      title: 'Certificate of Completion',
      description: 'Earn a certificate upon completing all courses and passing quizzes'
    }
  ];

  const levels = [
    {
      title: 'Beginner Level',
      description: 'Master the fundamentals of Microsoft Excel',
      topics: ['Excel Interface', 'Basic Formulas', 'Cell Formatting', 'Data Entry'],
      color: 'bg-primary'
    },
    {
      title: 'Intermediate Level',
      description: 'Advance your Excel skills',
      topics: ['Advanced Formulas', 'Data Analysis', 'Charts & Graphs', 'Conditional Formatting'],
      color: 'bg-secondary'
    },
    {
      title: 'Advanced Level',
      description: 'Become an Excel expert',
      topics: ['Pivot Tables', 'Macros & VBA', 'Data Visualization', 'Automation'],
      color: 'bg-accent'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 xl:py-32 bg-gradient-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/8bb3140c-c8d4-4859-b1e1-fde192f0ec94.jpg" 
            alt="Excel training background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <GraduationCap className="h-12 w-12" />
            </div>
            <h1 className="text-4xl xl:text-6xl font-bold mb-6">
              Excel with Hussain
            </h1>
            <p className="text-xl xl:text-2xl mb-8 text-primary-foreground/90">
              Master Microsoft Excel from Beginner to Advanced
            </p>
            <p className="text-lg mb-8 text-primary-foreground/80">
              Learn at your own pace with structured lessons, practice exercises, and quizzes. 
              Earn a certificate upon completion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/courses">Continue Learning</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/login">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </>
              )}
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-3 text-primary-foreground/90">
              <div className="flex items-center gap-2 px-6 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
                <Users className="h-5 w-5" />
                <span className="text-lg font-semibold">
                  {isLoading ? (
                    <span className="inline-block w-16 h-6 bg-primary-foreground/20 animate-pulse rounded" />
                  ) : (
                    <span className="tabular-nums">{enrolledCount.toLocaleString()}</span>
                  )}
                </span>
                <span className="text-base">
                  {enrolledCount === 1 ? 'member enrolled' : 'members enrolled'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Why Learn Excel with Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides everything you need to become an Excel expert
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Learning Path</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Progress through three comprehensive levels designed to take you from beginner to expert
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {levels.map((level, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className={`${level.color} text-white px-4 py-2 rounded-lg inline-block mb-4`}>
                    Level {index + 1}
                  </div>
                  <CardTitle className="text-2xl">{level.title}</CardTitle>
                  <CardDescription className="text-base">{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {level.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/courses">Explore All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/c8a3c792-ca4f-49fe-b5ee-15e463280746.jpg" 
                  alt="Excel learning interface"
                  className="rounded-lg shadow-elegant w-full"
                />
              </div>
              <div>
                <h2 className="text-3xl xl:text-4xl font-bold mb-6">
                  Learn at Your Own Pace
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform is designed to fit your schedule. Access lessons anytime, anywhere, 
                  and progress through the material at a pace that works for you.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block">Interactive Lessons</strong>
                      <span className="text-muted-foreground">Engaging content with real-world examples</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block">Hands-on Practice</strong>
                      <span className="text-muted-foreground">Apply concepts with practical exercises</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block">Assessment Quizzes</strong>
                      <span className="text-muted-foreground">Test your knowledge and track progress</span>
                    </div>
                  </li>
                </ul>
                {!user && (
                  <Button asChild size="lg">
                    <Link to="/login">Start Learning Today</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl xl:text-4xl font-bold mb-4">
            Earn Your Certificate
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Complete all lessons and pass the quizzes to receive your official 
            Excel with Hussain Certificate of Completion
          </p>
          {!user && (
            <Button asChild size="lg" variant="secondary">
              <Link to="/login">Begin Your Journey</Link>
            </Button>
          )}
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl xl:text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Excel with Hussain today and transform your Excel skills from beginner to expert
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button asChild size="lg">
                <Link to="/courses">Go to Courses</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/login">Create Free Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Contact Instructor</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
