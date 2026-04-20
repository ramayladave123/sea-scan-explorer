import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Waves, Microscope, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/scan");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/scan`,
            data: { full_name: fullName, institution, role: "researcher" },
          },
        });
        if (error) throw error;
        toast({ title: "Account created", description: "You can now sign in." });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back, researcher." });
        navigate("/scan");
      }
    } catch (err: any) {
      toast({ title: "Authentication error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left visual */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gradient-deep">
        <div className="absolute inset-0 caustics animate-caustic-shift opacity-40" />
        <div className="absolute inset-0 neural-grid opacity-30" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
            <Waves className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-lg font-bold">SeaScan</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Marine AI · v2.1</div>
          </div>
        </div>
        <div className="relative z-10">
          <div className="label-mono text-aqua mb-3">/ Researcher Portal</div>
          <h1 className="font-display text-4xl font-bold tracking-tight leading-tight">
            Access the Pujada Bay <span className="text-gradient">seagrass intelligence</span> network.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Authenticated access for marine biologists and expert researchers — scan species, explore 3D models, and contribute to the species database.
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <Microscope className="h-3 w-3 text-bio" /> Credentials verified via Lovable Cloud
          </div>
        </div>
        <div className="relative z-10 text-[10px] font-mono text-muted-foreground">06°56'12"N · 126°13'04"E</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-aqua">
              <Waves className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">SeaScan</span>
          </div>

          <div className="label-mono text-aqua">/ {mode === "signin" ? "Sign In" : "Request Access"}</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {mode === "signin" ? "Researcher login" : "Create researcher account"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Enter your credentials to access the scanner and research tools."
              : "Register as an expert or marine researcher to contribute."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Dr. Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inst">Institution</Label>
                  <Input id="inst" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Davao Oriental State University" />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="researcher@institute.edu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="••••••••" />
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>New researcher?{" "}
                <button onClick={() => setMode("signup")} className="text-aqua hover:underline font-medium">Request access</button>
              </>
            ) : (
              <>Already have access?{" "}
                <button onClick={() => setMode("signin")} className="text-aqua hover:underline font-medium">Sign in</button>
              </>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-aqua">
              ← Back to landing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
