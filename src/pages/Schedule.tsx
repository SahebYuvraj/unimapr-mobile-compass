import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { BottomSheet } from "@/components/BottomSheet";
import { Plus, MapPin, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

const Schedule = () => {
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [currentWeek, setCurrentWeek] = useState(0);

  // Mock schedule data
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];

  const classes = [
    {
      id: 1,
      name: "Computer Science 101",
      teacher: "Prof. Johnson",
      location: "Engineering 204",
      time: "9:00-10:30",
      day: 0, // Monday
      startSlot: 1,
      duration: 1.5,
      color: "bg-primary"
    },
    {
      id: 2,
      name: "Mathematics",
      teacher: "Dr. Smith",
      location: "Math Building 101",
      time: "11:00-12:00",
      day: 0,
      startSlot: 3,
      duration: 1,
      color: "bg-accent"
    },
    {
      id: 3,
      name: "Physics Lab",
      teacher: "Prof. Wilson",
      location: "Science Center 205",
      time: "2:00-4:00",
      day: 1, // Tuesday
      startSlot: 6,
      duration: 2,
      color: "bg-success"
    },
    {
      id: 4,
      name: "English Literature",
      teacher: "Dr. Brown",
      location: "Liberal Arts 301",
      time: "10:00-11:00",
      day: 2, // Wednesday
      startSlot: 2,
      duration: 1,
      color: "bg-warning"
    }
  ];

  const handleClassClick = (classItem: any) => {
    setSelectedClass(classItem);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="glass"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
              <p className="text-muted-foreground">
                Week of {currentWeek === 0 ? "March 4-8, 2024" : 
                         currentWeek > 0 ? `March ${4 + (currentWeek * 7)}-${8 + (currentWeek * 7)}, 2024` :
                         `Feb ${25 + (currentWeek * 7)}-${29 + (currentWeek * 7)}, 2024`}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="glass"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button size="icon" variant="outline" className="glass">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="p-4">
        <Card className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header Row */}
              <div className="grid grid-cols-6 gap-0 border-b border-border/20">
                <div className="p-3 text-sm font-medium text-muted-foreground">Time</div>
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="p-3 text-sm font-medium text-center text-foreground border-l border-border/20">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((time, timeIndex) => (
                <div key={timeIndex} className="grid grid-cols-6 gap-0 border-b border-border/10 min-h-16">
                  <div className="p-3 text-sm text-muted-foreground">{time}</div>
                  {daysOfWeek.map((_, dayIndex) => {
                    const classInSlot = classes.find(
                      c => c.day === dayIndex && 
                      timeIndex >= c.startSlot && 
                      timeIndex < c.startSlot + c.duration
                    );

                    return (
                      <div key={dayIndex} className="border-l border-border/20 relative">
                        {classInSlot && timeIndex === classInSlot.startSlot && (
                          <button
                            onClick={() => handleClassClick(classInSlot)}
                            className={`absolute inset-x-1 top-1 rounded-lg p-2 text-left transition-transform hover:scale-105 ${classInSlot.color} text-white`}
                            style={{ 
                              height: `${(classInSlot.duration * 64) - 8}px`,
                              zIndex: 1
                            }}
                          >
                            <div className="text-xs font-medium truncate">{classInSlot.name}</div>
                            <div className="text-xs opacity-90 truncate">{classInSlot.location}</div>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Classes Summary */}
      <div className="px-4 pb-4">
        <Card className="glass-card p-4 space-y-4">
          <h3 className="font-semibold text-foreground">Today's Classes</h3>
          <div className="space-y-3">
            {classes.filter(c => c.day === 0).map((classItem) => (
              <div key={classItem.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${classItem.color}`} />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{classItem.name}</div>
                  <div className="text-sm text-muted-foreground">{classItem.time} • {classItem.location}</div>
                </div>
                <Badge variant="outline" className="text-xs">Now</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Class Details Bottom Sheet */}
      <BottomSheet isOpen={!!selectedClass} onClose={() => setSelectedClass(null)}>
        {selectedClass && (
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{selectedClass.name}</h3>
              <p className="text-muted-foreground">{selectedClass.time}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{selectedClass.teacher}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{selectedClass.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">60 minutes</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 smooth-transition">
                <MapPin className="w-4 h-4 mr-2" />
                Navigate to Room
              </Button>
              <Button variant="outline" className="flex-1 glass">
                Add Notes
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>

      <BottomNav />
    </div>
  );
};

export default Schedule;