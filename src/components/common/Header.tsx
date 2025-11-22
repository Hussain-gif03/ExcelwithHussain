import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/components/auth/AuthProvider';
import routes from '@/routes';
import { GraduationCap, Menu, LogOut, User, LayoutDashboard, Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const navigation = routes.filter((route) => route.visible !== false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const NavLinks = () => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            location.pathname === item.path
              ? 'text-primary bg-primary/10'
              : 'text-foreground hover:text-primary hover:bg-muted'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Excel with Hussain</span>
            </Link>
            <div className="hidden xl:flex items-center gap-2">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden xl:flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                {profile?.role === 'admin' && (
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/admin">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Link>
                  </Button>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{profile?.username}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>
            )}

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  {user ? (
                    <>
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md mb-4">
                          <User className="h-4 w-4" />
                          <span className="text-sm font-medium">{profile?.username}</span>
                        </div>
                        <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        {profile?.role === 'admin' && (
                          <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                              <Shield className="h-4 w-4 mr-2" />
                              Admin
                            </Link>
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          className="w-full justify-start mt-2" 
                          size="sm"
                          onClick={() => {
                            handleSignOut();
                            setIsMenuOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t pt-4 space-y-2">
                      <Button asChild variant="ghost" className="w-full" size="sm">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button asChild className="w-full" size="sm">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
