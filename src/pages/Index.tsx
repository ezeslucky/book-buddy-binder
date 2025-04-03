
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Library, BookCheck, Users, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { User } from "@/lib/types";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("bookBuddy_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bookBuddy_user");
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar 
        isLoggedIn={!!user} 
        onLogout={handleLogout}
        userName={user?.name}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-accent to-accent/90 text-accent-foreground py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight">
              Manage Your Personal Library with Ease
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Keep track of your books, manage your reading list, and organize your collection all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="font-medium">
                    Go to My Books
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button size="lg" className="font-medium">
                      Login
                    </Button>
                  </Link>
                  <Link to="/login?signup=true">
                    <Button size="lg" variant="outline" className="font-medium">
                      Sign Up for Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-full h-full bg-primary/20 rounded-lg"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/20 rounded-lg"></div>
              <div className="relative bg-card shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&h=300&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&h=300&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=200&h=300&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=200&h=300&auto=format&fit=crop"
                  ].map((image, index) => (
                    <div key={index} className="aspect-[2/3] overflow-hidden rounded">
                      <img 
                        src={image} 
                        alt="Book cover" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Organize Your Reading Life</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book Buddy provides all the tools you need to catalog and manage your personal book collection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Library className="h-10 w-10 text-primary" />}
              title="Track Your Collection"
              description="Keep an organized catalog of all your books in one place. Add details like genre, publish date, and page count."
            />
            <FeatureCard
              icon={<BookCheck className="h-10 w-10 text-primary" />}
              title="Monitor Your Reading"
              description="Mark books as read or unread, track your reading progress, and build your reading history."
            />
            <FeatureCard
              icon={<Star className="h-10 w-10 text-primary" />}
              title="Personalized Library"
              description="Add notes, customize book details, and organize your books exactly the way you want."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Ready to Organize Your Books?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join Book Buddy today and start building your personal digital library. It's free and easy to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="font-medium">
                  Go to My Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button size="lg" className="font-medium">
                    Login
                  </Button>
                </Link>
                <Link to="/login?signup=true">
                  <Button size="lg" variant="outline" className="font-medium">
                    Create an Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen size={24} className="text-primary" />
            <span className="text-xl font-serif font-bold">Book Buddy</span>
          </div>
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Book Buddy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-serif font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
