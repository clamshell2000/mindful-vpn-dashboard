
import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";
import { vpnService } from "@/services/vpnService";
import { authService } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Gamepad } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("vpn_user");
    if (storedUser) {
      setUsername(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.login(username, password);
      setUsername(user);
      setIsAuthenticated(true);
      localStorage.setItem("vpn_user", user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.register(username, email, password);
      setUsername(user);
      setIsAuthenticated(true);
      localStorage.setItem("vpn_user", user);
      toast({
        title: "Registration successful",
        description: `Account created for ${user}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await vpnService.connect();
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Shield activated. Your gaming session is now protected.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to establish VPN connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await vpnService.disconnect();
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "Shield deactivated. Your connection is no longer protected.",
      });
    } catch (error) {
      toast({
        title: "Disconnection failed",
        description: "Failed to terminate VPN connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vpn_user");
    setIsAuthenticated(false);
    setUsername("");
    setIsConnected(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center">
          <div className="relative">
            <div className="bg-primary p-4 rounded-full glow-effect animate-pulse mb-6">
              <Gamepad className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 h-4 w-4 bg-accent rounded-full animate-ping"></div>
          </div>
          <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">GameGuardVPN</h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "450ms" }}></div>
          </div>
          <p className="mt-4 text-muted-foreground">Initializing System...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Dashboard
      username={username}
      isConnected={isConnected}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
      onLogout={handleLogout}
    />
  ) : (
    <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
  );
};

export default Index;
