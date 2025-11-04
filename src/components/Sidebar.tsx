import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, LayoutDashboard, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          TaskFlow
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {user?.role === 'admin' ? 'Admin Panel' : 'Employee Portal'}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          <span className="font-medium">Dashboard</span>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
          <ClipboardList className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">Tasks</span>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="mb-4 p-3 bg-secondary rounded-lg">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full inline-block mt-2">
            {user?.role}
          </span>
        </div>
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          className="w-full justify-start gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
