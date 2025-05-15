import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../auth/AuthProvider";
import { 
  Home, 
  FileText, 
  Calendar, 
  PieChart, 
  Users, 
  Video, 
  Settings, 
  LogOut,
  Menu,
  BellIcon,
  UserIcon
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  
  if (!user) {
    return null;
  }

  const getUserRoleLabel = () => {
    switch (user.role) {
      case "patient":
        return "Patient";
      case "pathologist":
        return "Pathologist";
      case "admin":
        return "Administrator";
      default:
        return "User";
    }
  };

  const navigationLinks = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Cases", href: "/dashboard/cases", icon: FileText },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Analytics", href: "/dashboard/analytics", icon: PieChart },
    { name: "Video Consultation", href: "/video-consultation", icon: Video },
  ];

  // Add role-specific links
  if (user.role === "admin") {
    navigationLinks.splice(4, 0, { name: "Users", href: "/dashboard/users", icon: Users });
  }

  return (
    <div className="h-screen flex overflow-hidden bg-neutral-50">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-neutral-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className="h-8 w-auto rounded-md"
                src="https://images.unsplash.com/photo-1559839697-c95a3f18c8c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                alt="MicroVision Logo"
              />
              <span className="ml-2 text-xl font-bold text-white">
                Micro<span className="text-accent">Vision</span>
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigationLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      location === item.href
                        ? "bg-secondary text-white"
                        : "text-white hover:bg-secondary hover:bg-opacity-75"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-secondary p-4">
            <Link href="/dashboard/settings">
              <a className="group block w-full flex items-center">
                <div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-secondary-300">
                      {getUserRoleLabel()}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
            <button
              onClick={logout}
              className="ml-auto flex items-center justify-center h-10 w-10 rounded-full bg-secondary bg-opacity-25 text-white hover:bg-opacity-40"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Log out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto rounded-md"
                  src="https://images.unsplash.com/photo-1559839697-c95a3f18c8c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                  alt="MicroVision Logo"
                />
                <span className="ml-2 text-xl font-bold text-white">
                  Micro<span className="text-accent">Vision</span>
                </span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigationLinks.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        location === item.href
                          ? "bg-secondary text-white"
                          : "text-white hover:bg-secondary hover:bg-opacity-75"
                      }`}
                    >
                      <item.icon
                        className="mr-3 h-5 w-5"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-secondary p-4">
              <Link href="/dashboard/settings">
                <a className="group block w-full flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-secondary-300">
                      {getUserRoleLabel()}
                    </p>
                  </div>
                </a>
              </Link>
              <button
                onClick={logout}
                className="ml-auto flex items-center justify-center h-8 w-8 rounded-full bg-secondary bg-opacity-25 text-white hover:bg-opacity-40"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
              <div className="flex items-center">
                <button className="p-2 text-neutral-400 hover:text-neutral-500">
                  <BellIcon className="h-6 w-6" />
                </button>
                <button className="p-2 ml-2 text-neutral-400 hover:text-neutral-500 md:hidden">
                  <UserIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
