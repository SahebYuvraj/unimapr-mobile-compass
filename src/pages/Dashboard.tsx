import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { MapPin, Clock, Calendar, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const nextClass = {
    name: "Computer Science 101",
    time: "2:00 PM",
    location: "Engineering Building, Room 204",
    distance: "5 min walk"
  };

  const todayClasses = [
    { time: "9:00 AM", name: "Mathematics", room: "Math Building 101", status: "completed" },
    { time: "11:00 AM", name: "Physics", room: "Science Center 205", status: "completed" },
    { time: "2:00 PM", name: "Computer Science", room: "Engineering 204", status: "current" },
    { time: "4:00 PM", name: "English Literature", room: "Liberal Arts 301", status: "upcoming" }
  ];

  const upcomingEvents = [
    { name: "Tech Club Meeting", time: "6:00 PM", type: "Club" },
    { name: "Career Fair", time: "Tomorrow", type: "Event" },
    { name: "Study Group", time: "Friday", type: "Academic" }
  ];

  const savedLocations = [
    { name: "Library", type: "Study Space" },
    { name: "Student Center", type: "Dining" },
    { name: "Gym", type: "Recreation" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good afternoon!</h1>
            <p className="text-muted-foreground">Ready for your next class?</p>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-medium">JD</span>
          </div>
        </div>

        {/* Next Class Card */}
        <Card className="glass-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="default" className="bg-primary/10 text-primary">Next Class</Badge>
            <span className="text-sm text-muted-foreground">{nextClass.time}</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{nextClass.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{nextClass.location}</span>
              <span>•</span>
              <span>{nextClass.distance}</span>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full smooth-transition"
            onClick={() => navigate("/map")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Navigate
          </Button>
        </Card>

        {/* Today's Timetable */}
        <Card className="glass-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Today's Classes</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/schedule")}
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {todayClasses.map((cls, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground w-16">{cls.time}</div>
                <div className={`w-2 h-2 rounded-full ${
                  cls.status === 'completed' ? 'bg-success' :
                  cls.status === 'current' ? 'bg-primary' : 'bg-muted'
                }`} />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{cls.name}</div>
                  <div className="text-sm text-muted-foreground">{cls.room}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Explore Events */}
        <Card className="glass-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Upcoming Events</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/events")}
            >
              Explore <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="min-w-40 p-3 bg-accent/5 border-accent/20">
                <Badge variant="secondary" className="text-xs mb-2">{event.type}</Badge>
                <h4 className="font-medium text-sm text-foreground">{event.name}</h4>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </Card>
            ))}
          </div>
        </Card>

        {/* Saved Locations */}
        <Card className="glass-card p-4 space-y-4">
          <h3 className="font-semibold text-foreground">Quick Access</h3>
          <div className="grid grid-cols-3 gap-3">
            {savedLocations.map((location, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="h-16 flex-col gap-1 glass"
                onClick={() => navigate("/map")}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-xs">{location.name}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;