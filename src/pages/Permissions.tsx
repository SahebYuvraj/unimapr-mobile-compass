import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MapPin, Bell, Calendar } from "lucide-react";

const permissions = [
  {
    id: "location",
    icon: MapPin,
    title: "Location Access",
    description: "To find buildings & live directions, enable location",
    microcopy: "We'll help you navigate campus with turn-by-turn directions",
    required: true
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    description: "Get reminders before class & club events",
    microcopy: "Stay on top of your schedule with smart reminders",
    required: false
  },
  {
    id: "calendar",
    icon: Calendar,
    title: "Calendar Access",
    description: "We'll auto-sync your classes to your calendar",
    microcopy: "Seamlessly integrate with your existing calendar",
    required: false
  }
];

const Permissions = () => {
  const [currentPermission, setCurrentPermission] = useState(0);
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAllow = () => {
    const permission = permissions[currentPermission];
    setGrantedPermissions([...grantedPermissions, permission.id]);
    
    // Simulate permission request
    if (permission.id === "location") {
      navigator.geolocation?.getCurrentPosition(() => {}, () => {});
    }
    
    handleNext();
  };

  const handleNext = () => {
    if (currentPermission < permissions.length - 1) {
      setCurrentPermission(currentPermission + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    if (permissions[currentPermission].required) {
      return; // Can't skip required permissions
    }
    handleNext();
  };

  const permission = permissions[currentPermission];
  const Icon = permission.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Icon */}
        <div className="text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Content */}
        <Card className="glass-card p-6 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-xl font-bold text-foreground">{permission.title}</h2>
            <p className="text-foreground text-base">{permission.description}</p>
            <p className="text-muted-foreground text-sm">{permission.microcopy}</p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleAllow} className="w-full smooth-transition">
              Allow {permission.title}
            </Button>
            
            {!permission.required && (
              <Button 
                variant="ghost" 
                onClick={handleSkip}
                className="w-full text-muted-foreground"
              >
                Not now
              </Button>
            )}
          </div>
        </Card>

        {/* Progress */}
        <div className="flex justify-center space-x-2">
          {permissions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPermission ? 'bg-primary' : 
                index < currentPermission ? 'bg-success' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Permissions;