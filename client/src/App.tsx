import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientDashboardPage from "./pages/dashboard/PatientDashboardPage";
import PathologistDashboardPage from "./pages/dashboard/PathologistDashboardPage";
import AdminDashboardPage from "./pages/dashboard/AdminDashboardPage";
import VideoConsultationPage from "./pages/VideoConsultationPage";
import ResourcesPage from "./pages/ResourcesPage";
import { AuthProvider, useAuth } from "./components/auth/AuthProvider";

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/analysis" component={AnalysisPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/resources" component={ResourcesPage} />

      {/* Protected routes */}
      {user?.role === "patient" && (
        <Route path="/dashboard" component={PatientDashboardPage} />
      )}
      {user?.role === "pathologist" && (
        <Route path="/dashboard" component={PathologistDashboardPage} />
      )}
      {user?.role === "admin" && (
        <Route path="/dashboard" component={AdminDashboardPage} />
      )}
      {user && (
        <Route path="/video-consultation" component={VideoConsultationPage} />
      )}

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
