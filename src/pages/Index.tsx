
import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";
import { vpnService } from "@/services/vpnService";
import { authService } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

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

  const handleLogin = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authService.login(username, email, password);
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
        description: "You are now securely connected to MindfulVPN",
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
        description: "VPN connection terminated",
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Please wait...</p>
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
