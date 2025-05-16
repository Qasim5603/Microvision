import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: "About", path: "/#about" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <img 
                    className="block h-8 w-auto rounded-md" 
                    src="https://images.unsplash.com/photo-1559839697-c95a3f18c8c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" 
                    alt="MicroVision Logo" 
                  />
                  <span className="ml-2 text-xl font-bold text-primary">Micro<span className="text-accent">Vision</span></span>
                </a>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location === link.path 
                      ? "border-primary text-neutral-900" 
                      : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                  }`}>
                    {link.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <a className="text-primary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                </Link>
                <button
                  onClick={logout}
                  className="text-neutral-500 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="text-neutral-500 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </a>
                </Link>
                <Link href="/register">
                  <a className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Register
                  </a>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path}>
                <a 
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location === link.path
                      ? "bg-primary-50 border-primary text-primary"
                      : "border-transparent text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-neutral-200">
            <div className="flex items-center px-4 space-x-2">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <a 
                      className="text-primary hover:text-secondary px-3 py-2 rounded-md text-sm font-medium block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-neutral-500 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium block"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <a 
                      className="text-neutral-500 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </a>
                  </Link>
                  <Link href="/register">
                    <a 
                      className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-md text-sm font-medium transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
