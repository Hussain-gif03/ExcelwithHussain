import { useEffect, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface RequireAuthProps {
  children: ReactNode;
  whiteList?: string[];
}

export function RequireAuth({ children, whiteList = [] }: RequireAuthProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      const isWhitelisted = whiteList.some(pattern => {
        if (pattern.endsWith('/*')) {
          const basePath = pattern.slice(0, -2);
          return location.pathname.startsWith(basePath);
        }
        return location.pathname === pattern;
      });

      if (!isWhitelisted) {
        navigate('/login', { state: { from: location.pathname } });
      }
    }
  }, [user, loading, navigate, location, whiteList]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
