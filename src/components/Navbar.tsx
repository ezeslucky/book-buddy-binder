
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, User, LogOut } from "lucide-react";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  userName?: string;
}

const Navbar = ({ isLoggedIn, onLogout, userName }: NavbarProps) => {
  return (
    <nav className="bg-card py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen size={24} className="text-primary" />
          <span className="text-xl font-serif font-bold">Book Buddy</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">My Books</Button>
              </Link>
              <div className="flex items-center gap-2">
                <User size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium">{userName || 'User'}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/login?signup=true">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
