
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Wifi, LogIn, User, Lock, Mail, Gamepad } from "lucide-react";

interface AuthFormProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    onLogin(username, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    onRegister(username, email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-full glow-effect">
              <Gamepad className="h-10 w-10 text-primary-foreground animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">GameGuardVPN</h1>
          <p className="text-muted-foreground mt-2">Secure. Private. Game On.</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 cyber-gradient text-primary-foreground">
            <TabsTrigger value="login" className="data-[state=active]:bg-background/20 data-[state=active]:text-white text-white/70">Login</TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-background/20 data-[state=active]:text-white text-white/70">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="animate-fade-in">
            <Card className="border-primary/20 bg-card/90 backdrop-blur-sm hover-scale">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Mission Briefing</CardTitle>
                <CardDescription className="text-center">Enter your credentials to access the network</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <Input 
                        id="username" 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 border-primary/30 focus:border-primary/70 bg-background/50"
                        placeholder="Enter your callsign"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-primary" />
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 border-primary/30 focus:border-primary/70 bg-background/50"
                        placeholder="Enter your access code"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full cyber-gradient hover:opacity-90 transition-opacity">
                    <LogIn className="mr-2 h-4 w-4" /> Deploy
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register" className="animate-fade-in">
            <Card className="border-primary/20 bg-card/90 backdrop-blur-sm hover-scale">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">New Recruit</CardTitle>
                <CardDescription className="text-center">Create your account for network access</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-username">Username</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <Input 
                        id="new-username" 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 border-primary/30 focus:border-primary/70 bg-background/50"
                        placeholder="Choose a callsign"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <Input 
                        id="new-email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-primary/30 focus:border-primary/70 bg-background/50"
                        placeholder="Enter your comms channel"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-primary" />
                      </div>
                      <Input 
                        id="new-password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 border-primary/30 focus:border-primary/70 bg-background/50"
                        placeholder="Set your access code"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full cyber-gradient hover:opacity-90 transition-opacity">
                    Enlist
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthForm;
