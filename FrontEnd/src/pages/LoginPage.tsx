import React from "react";
import { Helmet } from 'react-helmet';
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <MainLayout>
      <Helmet>
        <title>Login - MicroVision</title>
        <meta name="description" content="Log in to MicroVision to access your histopathology analysis dashboard, view reports, and manage appointments." />
        <meta property="og:title" content="Log in - MicroVision" />
        <meta property="og:description" content="Access your MicroVision account to view histopathology analysis results and reports." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-neutral-50 py-12">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="pr-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Welcome Back to MicroVision</h2>
                <p className="text-neutral-600 mb-6">
                  Log in to access your histopathology reports, manage appointments, and collaborate with healthcare providers.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-primary mb-2">
                    AI-Powered Analysis at Your Fingertips
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Our advanced AI technology helps analyze histopathology slides with high precision, providing faster and more accurate results.
                  </p>
                </div>
                
                <div className="mt-8 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="Advanced medical microscope" 
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
