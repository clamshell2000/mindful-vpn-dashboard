
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, LogOut, User, Shield } from "lucide-react";
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

  const handleConnect = () => {
    toast({
      title: "Connecting...",
      description: "Establishing secure connection"
    });
    onConnect();
  };

  const handleDisconnect = () => {
    toast({
      title: "Disconnecting...",
      description: "Terminating secure connection"
    });
    onDisconnect();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wifi className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">MindfulVPN</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{username}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl py-10 px-4">
        <Card className="shadow-lg border-2 border-primary/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center">Connection Status</CardTitle>
            <CardDescription className="text-center">Your VPN connection is currently:</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-6">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="relative">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center
                              ${isConnected ? 'bg-vpn-green/20 border-2 border-vpn-green' : 'bg-vpn-red/20 border-2 border-vpn-red'}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center
                                ${isConnected ? 'bg-vpn-green/30' : 'bg-vpn-red/30'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                  ${isConnected ? 'bg-vpn-green text-white' : 'bg-vpn-red text-white'}`}>
                      {isConnected ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
                    </div>
                  </div>
                </div>
                {isConnected && (
                  <span className="absolute inset-0 rounded-full bg-vpn-green/20 connection-pulse"></span>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Badge variant={isConnected ? "default" : "destructive"} className="px-3 py-1 text-base">
                  {isConnected ? "Connected" : "Disconnected"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {isConnected 
                    ? "Your connection is secure and private." 
                    : "Your connection is not protected."}
                </p>
              </div>

              <Separator className="my-4" />

              <div className="flex gap-4 w-full max-w-xs">
                {isConnected ? (
                  <Button 
                    onClick={handleDisconnect} 
                    className="flex-1 bg-vpn-red hover:bg-vpn-red/90"
                  >
                    <WifiOff className="mr-2 h-5 w-5" />
                    Disconnect
                  </Button>
                ) : (
                  <Button 
                    onClick={handleConnect} 
                    className="flex-1 bg-vpn-green hover:bg-vpn-green/90"
                  >
                    <Wifi className="mr-2 h-5 w-5" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Encryption</span>
                <Badge variant="outline" className="font-mono">AES-256</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Protocol</span>
                <Badge variant="outline" className="font-mono">OpenVPN</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">IP Address</span>
                <Badge variant="outline" className="font-mono">
                  {isConnected ? "192.168.xx.xx" : "Not Protected"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
