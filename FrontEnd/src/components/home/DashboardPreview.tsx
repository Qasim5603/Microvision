import { useState } from "react";
import { Link } from "wouter";

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("patient");
  
  return (
    <section id="dashboards" className="py-16 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-subheading">Dashboards</h2>
          <p className="section-heading">
            Role-Based Interfaces
          </p>
          <p className="section-description">
            Our platform provides specialized dashboards for patients, pathologists, and administrators.
          </p>
        </div>
        
        <div className="mt-10">
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {/* Pathologist Dashboard Preview */}
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img 
                  src="https://pixabay.com/get/gf86c1ea7183df490004a6911674f6abb08e836a03af87328a6ebb4b7732a07d7d8c26eaad0ed1c5fa9eea8c84cb5ec8b40913d790b87e77c3bce65c35ed97c39_1280.jpg" 
                  alt="Pathologist dashboard showing slide analysis" 
                  className="h-full w-full object-cover object-center" 
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-neutral-900">
                <Link href="/dashboard">
                  <a className="relative">
                    <span className="absolute inset-0"></span>
                    Pathologist Dashboard
                  </a>
                </Link>
              </h3>
              <p className="text-base text-neutral-500">
                Access patient cases, analyze slides with AI assistance, collaborate with colleagues, and generate comprehensive reports.
              </p>
            </div>

            {/* Patient Dashboard Preview */}
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80" 
                  alt="Patient dashboard showing medical records" 
                  className="h-full w-full object-cover object-center" 
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-neutral-900">
                <Link href="/dashboard">
                  <a className="relative">
                    <span className="absolute inset-0"></span>
                    Patient Dashboard
                  </a>
                </Link>
              </h3>
              <p className="text-base text-neutral-500">
                View test results, schedule appointments, access reports in simplified language, and communicate with healthcare providers.
              </p>
            </div>

            {/* Admin Dashboard Preview */}
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80" 
                  alt="Admin dashboard showing system overview" 
                  className="h-full w-full object-cover object-center" 
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-neutral-900">
                <Link href="/dashboard">
                  <a className="relative">
                    <span className="absolute inset-0"></span>
                    Admin Dashboard
                  </a>
                </Link>
              </h3>
              <p className="text-base text-neutral-500">
                Manage user accounts, monitor system metrics, generate institutional reports, and configure system parameters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
