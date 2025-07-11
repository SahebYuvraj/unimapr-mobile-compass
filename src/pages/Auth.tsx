import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uniEmail, setUniEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        });
        navigate("/dashboard");
      } else {
        // Sign up
        const redirectUrl = `${window.location.origin}/dashboard`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Check your email",
          description: "We sent you a confirmation link to complete your registration.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUniversityLogin = async () => {
    if (!uniEmail) {
      setEmailError("Please enter your university email");
      return;
    }
    if (!uniEmail.endsWith("@anu.edu.au")) {
      setEmailError("Please use your ANU email address ending with @anu.edu.au");
      return;
    }
    
    setEmailError("");
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signInWithOtp({
        email: uniEmail,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: "Magic Link Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Magic link sent!",
        description: `Check your email at ${uniEmail} for the login link.`,
      });
      setDialogOpen(false);
      setUniEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send magic link",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <img src={logo} alt="UniMapr" className="w-16 h-16 mx-auto" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">UniMapr</h1>
            <p className="text-muted-foreground">Your campus companion</p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full smooth-transition">
              {loading ? "Loading..." : (isLogin ? "Continue" : "Sign Up")}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full glass smooth-transition">
                  Continue with University Account
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card">
                <DialogHeader>
                  <DialogTitle>University Login</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="uni-email">University Email</Label>
                    <Input
                      id="uni-email"
                      type="email"
                      placeholder="your.name@anu.edu.au"
                      value={uniEmail}
                      onChange={(e) => {
                        setUniEmail(e.target.value);
                        setEmailError("");
                      }}
                      className="glass"
                    />
                    {emailError && (
                      <p className="text-destructive text-sm">{emailError}</p>
                    )}
                  </div>
                  <Button onClick={handleUniversityLogin} className="w-full">
                    Continue
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;