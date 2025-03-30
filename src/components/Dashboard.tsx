
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wifi, WifiOff, LogOut, User, Shield, Gamepad, Trophy, Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DashboardProps {
  username: string;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  username,
  isConnected,
  onConnect,
  onDisconnect,
  onLogout
}) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    pingMs: Math.floor(Math.random() * 20) + 10,
    uptime: 0,
    dataProtected: 0
  });

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setStats(prev => ({
          pingMs: Math.floor(Math.random() * 20) + 10,
          uptime: prev.uptime + 1,
          dataProtected: prev.dataProtected + Math.floor(Math.random() * 500) + 100
        }));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setStats(prev => ({
        ...prev,
        pingMs: 0,
        uptime: 0
      }));
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isConnected]);

  const handleConnect = () => {
    toast({
      title: "Initializing Secure Connection",
      description: "Establishing encrypted tunnel"
    });
    onConnect();
  };

  const handleDisconnect = () => {
    toast({
      title: "Terminating Connection",
      description: "Closing encrypted tunnel"
    });
    onDisconnect();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatData = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-card/80 backdrop-blur-md border-b border-primary/20">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-md glow-effect">
              <Gamepad className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">GameGuardVPN</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center p-2 px-3 bg-card/80 border border-primary/20 rounded-full">
              <User className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">{username}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout} 
              className="border border-primary/20 hover:bg-primary/10 hover:text-primary">
              <LogOut className="h-4 w-4 mr-1" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl py-10 px-4">
        <Card className="shadow-xl border-2 border-primary/20 bg-card/80 backdrop-blur-md hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Shield Status</CardTitle>
            <CardDescription className="text-center">Your connection is currently:</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-6">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500
                              ${isConnected ? 'bg-accent/20 border-4 border-accent' : 'bg-destructive/20 border-4 border-destructive'}`}>
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500
                                ${isConnected ? 'bg-accent/30' : 'bg-destructive/30'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                                  ${isConnected ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                      {isConnected ? <Wifi className="h-8 w-8 animate-pulse" /> : <WifiOff className="h-8 w-8" />}
                    </div>
                  </div>
                </div>
                {isConnected && (
                  <span className="absolute inset-0 rounded-full bg-accent connection-pulse opacity-60"></span>
                )}
              </div>

              <div className="w-full max-w-sm px-2">
                <Progress value={progress} className={`h-2 ${isConnected ? 'bg-accent/20' : 'bg-destructive/20'}`} />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Badge variant={isConnected ? "default" : "destructive"} 
                  className={`px-4 py-1.5 text-lg ${isConnected ? 'bg-accent hover:bg-accent/80' : ''}`}>
                  {isConnected ? "Shield Active" : "Shield Down"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {isConnected 
                    ? "Your gaming data is encrypted and protected." 
                    : "Your gaming traffic is vulnerable."}
                </p>
              </div>

              <Separator className="my-2" />

              <div className="flex gap-4 w-full max-w-xs">
                {isConnected ? (
                  <Button 
                    onClick={handleDisconnect} 
                    className="flex-1 bg-destructive hover:bg-destructive/90 font-semibold"
                  >
                    <WifiOff className="mr-2 h-5 w-5" />
                    Disable Shield
                  </Button>
                ) : (
                  <Button 
                    onClick={handleConnect} 
                    className="flex-1 bg-accent hover:bg-accent/90 font-semibold"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Activate Shield
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-md border-primary/20 bg-card/80 backdrop-blur-md hover-scale">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Security Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Encryption Level</span>
                  <Badge variant="outline" className="font-mono bg-primary/10">256-BIT AES</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Protocol</span>
                  <Badge variant="outline" className="font-mono bg-primary/10">ICARUS-X</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Network Status</span>
                  <Badge variant="outline" className={`font-mono ${isConnected ? 'bg-accent/10' : 'bg-destructive/10'}`}>
                    {isConnected ? "PROTECTED" : "EXPOSED"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Ping</span>
                  <Badge variant="outline" className="font-mono bg-primary/10">
                    {isConnected ? `${stats.pingMs} ms` : "--"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-primary/20 bg-card/80 backdrop-blur-md hover-scale">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Connection Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Session Time</span>
                  <Badge variant="outline" className="font-mono bg-primary/10">
                    {isConnected ? formatTime(stats.uptime) : "00:00"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Protected</span>
                  <Badge variant="outline" className="font-mono bg-primary/10">
                    {isConnected ? formatData(stats.dataProtected) : "0 B"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Shield Strength</span>
                  <div className="w-32">
                    <Progress value={isConnected ? 100 : 0} className={`h-2 ${isConnected ? 'bg-accent/20' : 'bg-destructive/20'}`} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">IP Address</span>
                  <Badge variant="outline" className="font-mono bg-primary/10">
                    {isConnected ? "192.ΦΨ8.XX.21" : "Not Masked"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
