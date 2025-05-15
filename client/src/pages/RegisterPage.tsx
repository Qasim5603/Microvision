import React from "react";
import { Helmet } from 'react-helmet';
import MainLayout from "@/components/layout/MainLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <MainLayout>
      <Helmet>
        <title>Create Account - MicroVision</title>
        <meta name="description" content="Join MicroVision to access advanced histopathology analysis tools, manage your medical records, and connect with pathologists." />
        <meta property="og:title" content="Create Account - MicroVision" />
        <meta property="og:description" content="Register for MicroVision to access advanced histopathology analysis tools and services." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-neutral-50 py-12">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="pr-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Join MicroVision Today</h2>
                <p className="text-neutral-600 mb-6">
                  Create an account to access advanced histopathology analysis tools and collaborate with healthcare professionals.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900">Secure Data Storage</h3>
                      <p className="mt-1 text-sm text-neutral-600">Your histopathology data is stored securely and accessible only to authorized personnel.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900">Fast Analysis</h3>
                      <p className="mt-1 text-sm text-neutral-600">Get preliminary results in minutes with our AI-powered analysis technology.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900">Expert Collaboration</h3>
                      <p className="mt-1 text-sm text-neutral-600">Connect with pathologists through secure video consultations for comprehensive care.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
