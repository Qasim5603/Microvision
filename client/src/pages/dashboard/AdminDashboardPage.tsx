import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation } from "wouter";

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  // Redirect if not authenticated or not an admin
  React.useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
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

  if (!isAuthenticated || user?.role !== "admin") {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - MicroVision</title>
        <meta name="description" content="Manage users, monitor system metrics, generate reports, and configure system parameters in the MicroVision admin dashboard." />
      </Helmet>
      
      <DashboardLayout title="Admin Dashboard">
        <AdminDashboard />
      </DashboardLayout>
    </>
  );
}
