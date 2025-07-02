import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";
import onboardingIllustration from "@/assets/onboarding-illustration.png";

const onboardingSteps = [
  {
    icon: MapPin,
    title: "Find rooms with live map navigation",
    description: "Never get lost on campus again. Get real-time directions to any room or building.",
    image: onboardingIllustration
  },
  {
    icon: Calendar,
    title: "Track your timetable",
    description: "Sync your classes and get reminded before each lecture starts.",
    image: onboardingIllustration
  },
  {
    icon: Users,
    title: "Discover clubs & events",
    description: "Stay connected with campus life. Find events and join clubs that match your interests.",
    image: onboardingIllustration
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/permissions");
    }
  };

  const handleSkip = () => {
    navigate("/permissions");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        {/* Illustration */}
        <div className="w-72 h-56 relative">
          <img 
            src={step.image} 
            alt={step.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 max-w-sm">
          <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <Button onClick={handleNext} className="w-full smooth-transition">
          {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;