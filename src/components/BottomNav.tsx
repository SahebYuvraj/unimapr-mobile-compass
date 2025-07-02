import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Map, Calendar, Users, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Map, label: "Map", path: "/map" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: Users, label: "Events", path: "/events" },
  { icon: User, label: "Profile", path: "/profile" }
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/50 z-50">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex-col h-12 px-3 smooth-transition ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};