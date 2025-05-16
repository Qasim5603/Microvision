import React from "react";
import { Helmet } from 'react-helmet';
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation } from "wouter";

export default function PatientDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  // Redirect if not authenticated or not a patient
  React.useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "patient")) {
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

  if (!isAuthenticated || user?.role !== "patient") {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <Helmet>
        <title>Patient Dashboard - MicroVision</title>
        <meta name="description" content="View your histopathology reports, upcoming appointments, and manage your healthcare information in the MicroVision patient dashboard." />
      </Helmet>
      
      <DashboardLayout title="Patient Dashboard">
        <PatientDashboard />
      </DashboardLayout>
    </>
  );
}
