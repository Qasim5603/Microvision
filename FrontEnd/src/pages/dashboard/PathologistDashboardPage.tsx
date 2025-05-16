import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/layout/DashboardLayout";
import PathologistDashboard from "@/components/dashboard/PathologistDashboard";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation } from "wouter";

export default function PathologistDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  // Redirect if not authenticated or not a pathologist
  React.useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "pathologist")) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, user, setLocation]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "pathologist") {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <Helmet>
        <title>Pathologist Dashboard - MicroVision</title>
        <meta name="description" content="Access your cases, review histopathology slides with AI assistance, manage appointments, and generate reports in the MicroVision pathologist dashboard." />
      </Helmet>
      
      <DashboardLayout title="Pathologist Dashboard">
        <PathologistDashboard />
      </DashboardLayout>
    </>
  );
}
