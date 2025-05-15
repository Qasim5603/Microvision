import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                className="h-8 w-auto rounded-md" 
                src="https://images.unsplash.com/photo-1559839697-c95a3f18c8c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" 
                alt="MicroVision Logo" 
              />
              <span className="ml-2 text-xl font-bold text-white">Micro<span className="text-accent">Vision</span></span>
            </div>
            <p className="text-neutral-400 text-sm">
              Advanced AI solutions for histopathology analysis, empowering healthcare professionals with accurate diagnostic tools.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Solutions</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/analysis">
                  <a className="text-base text-neutral-400 hover:text-white">AI Analysis</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">Digital Pathology</a>
              </li>
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">Reporting Tools</a>
              </li>
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">Collaboration Suite</a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">Documentation</a>
              </li>
              <li>
                <Link href="/resources">
                  <a className="text-base text-neutral-400 hover:text-white">Resources</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="text-base text-neutral-400 hover:text-white">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#about" className="text-base text-neutral-400 hover:text-white">About</a>
              </li>
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">Partners</a>
              </li>
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="#" className="text-base text-neutral-400 hover:text-white">Legal</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-neutral-400">&copy; 2023 MicroVision, Inc. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-neutral-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
