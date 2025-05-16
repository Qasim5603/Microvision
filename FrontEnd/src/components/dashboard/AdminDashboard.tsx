import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  PieChart, 
  User, 
  Trash2, 
  Edit, 
  Search, 
  UserPlus,
  Server,
  Database,
  HardDrive
} from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch admin dashboard data
  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
    queryKey: ['/api/admin/dashboard'],
  });

  // Fetch system activity
  const { data: systemActivityData, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['/api/admin/system-activity'],
  });

  // Sample data structure for stats cards (replace with actual API data)
  const statsData = [
    {
      title: "Total Cases",
      value: "1,247",
      change: {
        value: "12%",
        type: "increase"
      }
    },
    {
      title: "Active Users",
      value: "328",
      change: {
        value: "8%",
        type: "increase"
      }
    },
    {
      title: "Pathologists",
      value: "42",
      badge: {
        text: "5 New",
        variant: "primary"
      }
    },
    {
      title: "AI Accuracy",
      value: "92.3%",
      change: {
        value: "1.2%",
        type: "increase"
      }
    }
  ];

  // Sample data structure for system activity (replace with actual API data)
  const systemActivity = [
    {
      id: "1",
      user: "Dr. Emily Chen",
      role: "Pathologist",
      activity: "Case review completed",
      status: "Success",
      time: "10:25 AM"
    },
    {
      id: "2",
      user: "James Wilson",
      role: "Patient",
      activity: "New case uploaded",
      status: "Success",
      time: "10:12 AM"
    },
    {
      id: "3",
      user: "System",
      role: "AI",
      activity: "Model retraining",
      status: "In Progress",
      time: "09:30 AM"
    }
  ];

  // Sample data structure for users (replace with actual API data)
  const usersList = [
    {
      id: "1",
      name: "John Doe",
      role: "Patient",
      initials: "JD"
    },
    {
      id: "2",
      name: "Dr. Rebecca Lee",
      role: "Pathologist",
      initials: "RL"
    },
    {
      id: "3",
      name: "Sarah Johnson",
      role: "Administrator",
      initials: "SJ"
    }
  ];

  // Sample data structure for system health (replace with actual API data)
  const systemHealth = {
    serverStatus: "Operational",
    apiHealth: "All endpoints online",
    resources: [
      { name: "CPU", usage: 42 },
      { name: "Memory", usage: 64 },
      { name: "Storage", usage: 38 }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge variant="outline" className="bg-green-100 text-green-700">Success</Badge>
      case "In Progress":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700">In Progress</Badge>
      case "Failed":
        return <Badge variant="outline" className="bg-red-100 text-red-700">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Stats cards */}
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-500">{stat.title}</h3>
                {stat.badge && (
                  <Badge className="bg-blue-100 text-primary">
                    {stat.badge.text}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-neutral-900 mt-2">{stat.value}</p>
              {stat.change && (
                <div className="flex items-center mt-2 text-xs">
                  <span className={`flex items-center ${
                    stat.change.type === "increase" ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.change.type === "increase" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {stat.change.value}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Activity */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-neutral-50 text-left">
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">User</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Role</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Activity</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Status</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {isLoadingActivity ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-neutral-500">
                      Loading system activity...
                    </td>
                  </tr>
                ) : systemActivity.map((activity) => (
                  <tr key={activity.id}>
                    <td className="py-3 px-4 text-sm">{activity.user}</td>
                    <td className="py-3 px-4 text-sm">{activity.role}</td>
                    <td className="py-3 px-4 text-sm">{activity.activity}</td>
                    <td className="py-3 px-4">
                      {getStatusBadge(activity.status)}
                    </td>
                    <td className="py-3 px-4 text-sm">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="relative flex-1 max-w-xs">
                <Input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-neutral-400">
                  <Search className="h-4 w-4" />
                </span>
              </div>
              <Button className="ml-2">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {usersList.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-3 bg-white rounded border border-neutral-100">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm mr-3 ${
                      user.role === "Pathologist" ? "bg-secondary" : 
                      user.role === "Administrator" ? "bg-accent" : "bg-primary"
                    }`}>
                      {user.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{user.name}</h4>
                      <p className="text-xs text-neutral-500">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-secondary">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-3 rounded border border-neutral-100">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Server Status</h4>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm">{systemHealth.serverStatus}</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-neutral-100">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">API Health</h4>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm">{systemHealth.apiHealth}</span>
                </div>
              </div>
            </div>
            
            <h4 className="text-sm font-medium text-neutral-900 mb-2">Resource Usage</h4>
            <div className="space-y-3">
              {systemHealth.resources.map((resource) => (
                <div key={resource.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-neutral-500">{resource.name}</span>
                    <span className="text-xs font-medium">{resource.usage}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${resource.usage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
