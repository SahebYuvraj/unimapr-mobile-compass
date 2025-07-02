import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BottomNav } from "@/components/BottomNav";
import { useTheme } from "@/components/theme-provider";
import { 
  User, 
  MapPin, 
  Calendar, 
  Bell, 
  Moon, 
  Sun, 
  Settings, 
  Bookmark, 
  LogOut,
  ChevronRight
} from "lucide-react";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [calendarSync, setCalendarSync] = useState(true);

  const savedLocations = [
    { name: "Library - Study Room 204", type: "Study Space" },
    { name: "Engineering Building", type: "Academic" },
    { name: "Student Center - Food Court", type: "Dining" },
    { name: "Gym - Basketball Court", type: "Recreation" }
  ];

  const stats = [
    { label: "Classes Today", value: "4" },
    { label: "Events Attended", value: "12" },
    { label: "Saved Locations", value: "8" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 space-y-6">
        {/* Profile Info */}
        <Card className="glass-card p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
              <p className="text-muted-foreground">Computer Science • Junior</p>
              <p className="text-sm text-muted-foreground">john.doe@university.edu</p>
            </div>
            <Button variant="outline" size="sm" className="glass">
              <User className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Settings */}
        <Card className="glass-card divide-y divide-border/20">
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </h3>
            
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Sun className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-foreground">Dark Mode</span>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">Notifications</span>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {/* Calendar Sync */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">Calendar Sync</span>
              </div>
              <Switch
                checked={calendarSync}
                onCheckedChange={setCalendarSync}
              />
            </div>
          </div>
        </Card>

        {/* Saved Locations */}
        <Card className="glass-card">
          <div className="p-4 border-b border-border/20">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Saved Locations
            </h3>
          </div>
          <div className="divide-y divide-border/20">
            {savedLocations.map((location, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{location.name}</div>
                    <div className="text-sm text-muted-foreground">{location.type}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="glass-card">
          <div className="p-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start text-foreground">
              <Settings className="w-4 h-4 mr-3" />
              Account Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-foreground">
              <Bell className="w-4 h-4 mr-3" />
              Notification Preferences
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;