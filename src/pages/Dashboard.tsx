import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/components/auth/AuthProvider';
import { progressApi, certificatesApi } from '@/db/api';
import type { ProgressStats, Certificate } from '@/types/types';
import { Award, BookOpen, CheckCircle, TrendingUp, Trophy } from 'lucide-react';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const statsData = await progressApi.getProgressStats(user.id);
        setStats(statsData);

        const certData = await certificatesApi.getUserCertificate(user.id);
        setCertificate(certData);

        const isEligible = await certificatesApi.checkEligibility(user.id);
        setEligible(isEligible);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleGenerateCertificate = async () => {
    if (!user) return;

    setGenerating(true);
    try {
      const cert = await certificatesApi.generateCertificate(user.id);
      setCertificate(cert);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-64 mb-8 bg-muted" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Welcome back, {profile?.username || 'Student'}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.overallProgress || 0}%</div>
            <Progress value={stats?.overallProgress || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats?.completedLessons || 0} / {stats?.totalLessons || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.totalLessons ? Math.round(((stats.completedLessons || 0) / stats.totalLessons) * 100) : 0}% complete
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Passed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats?.passedQuizzes || 0} / {stats?.totalQuizzes || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.totalQuizzes ? Math.round(((stats.passedQuizzes || 0) / stats.totalQuizzes) * 100) : 0}% passed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {certificate ? (
                <Trophy className="h-8 w-8 text-accent" />
              ) : (
                <span className="text-muted-foreground text-lg">Not earned</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {certificate ? 'Earned' : eligible ? 'Eligible!' : 'Complete all to earn'}
            </p>
          </CardContent>
        </Card>
      </div>

      {eligible && !certificate && (
        <Card className="mb-8 border-accent shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-accent" />
              Congratulations! You're Eligible for a Certificate
            </CardTitle>
            <CardDescription>
              You've completed all lessons and passed all quizzes. Generate your certificate now!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGenerateCertificate} disabled={generating} size="lg">
              {generating ? 'Generating...' : 'Generate Certificate'}
            </Button>
          </CardContent>
        </Card>
      )}

      {certificate && (
        <Card className="mb-8 border-success shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-success" />
              Your Certificate
            </CardTitle>
            <CardDescription>
              Congratulations on completing the Excel with Hussain course!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Certificate Number</p>
                <p className="font-mono font-bold text-lg">{certificate.certificate_number}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Issued on {new Date(certificate.issued_at).toLocaleDateString()}
                </p>
              </div>
              <Button asChild>
                <Link to="/certificate">View Certificate</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
            {stats && stats.overallProgress < 100 && (
              <Button asChild variant="outline">
                <Link to="/courses">Continue Progress</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
