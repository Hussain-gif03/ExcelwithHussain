import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/components/auth/AuthProvider';
import { certificatesApi } from '@/db/api';
import type { Certificate } from '@/types/types';
import { Award, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CertificatePage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const cert = await certificatesApi.getUserCertificate(user.id);
        if (!cert) {
          toast({
            title: 'No Certificate',
            description: 'You have not earned a certificate yet. Complete all courses to earn one.',
            variant: 'destructive',
          });
          navigate('/dashboard');
          return;
        }
        setCertificate(cert);
      } catch (error) {
        console.error('Error fetching certificate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [user, navigate, toast]);

  const handleDownload = () => {
    toast({
      title: 'Download Feature',
      description: 'Certificate download functionality would be implemented here.',
    });
  };

  const handleShare = () => {
    toast({
      title: 'Share Feature',
      description: 'Certificate sharing functionality would be implemented here.',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-96 w-full max-w-4xl mx-auto bg-muted" />
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Certificate</h1>
          <p className="text-lg text-muted-foreground">
            Congratulations on completing the Excel with Hussain course!
          </p>
        </div>

        <Card className="shadow-elegant border-2 border-accent/20">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-primary rounded-full">
                  <Award className="h-16 w-16 text-primary-foreground" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-2">Certificate of Completion</h2>
                <p className="text-muted-foreground">This certifies that</p>
              </div>

              <div className="py-4 border-y-2 border-primary/20">
                <p className="text-4xl font-bold text-primary">{profile?.username || 'Student'}</p>
              </div>

              <div className="space-y-2">
                <p className="text-lg">has successfully completed</p>
                <p className="text-2xl font-bold">Excel with Hussain</p>
                <p className="text-lg">Microsoft Excel Training Program</p>
                <p className="text-muted-foreground">
                  Beginner to Advanced Level
                </p>
              </div>

              <div className="pt-6 space-y-2">
                <p className="text-sm text-muted-foreground">Certificate Number</p>
                <p className="font-mono font-bold text-xl">{certificate.certificate_number}</p>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Issued on {new Date(certificate.issued_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="pt-8 border-t">
                <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                  <div>
                    <div className="border-t-2 border-foreground pt-2">
                      <p className="font-semibold">Mohammed Hussain</p>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                    </div>
                  </div>
                  <div>
                    <div className="border-t-2 border-foreground pt-2">
                      <p className="font-semibold">Excel with Hussain</p>
                      <p className="text-sm text-muted-foreground">Platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={handleDownload} size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
          <Button onClick={handleShare} variant="outline" size="lg">
            <Share2 className="h-4 w-4 mr-2" />
            Share Certificate
          </Button>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="ghost">
            <a href="/dashboard">Back to Dashboard</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
