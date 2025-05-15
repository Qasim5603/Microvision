import { Link } from "wouter";

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-neutral-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Advanced AI for</span>
              <span className="block text-primary">Histopathology Analysis</span>
            </h1>
            <p className="mt-3 text-base text-neutral-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              MicroVision delivers cutting-edge artificial intelligence for fast, accurate analysis of histopathology slides, helping pathologists and clinicians make better diagnostic decisions.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Link href="/analysis">
                  <a className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Try AI Analysis
                  </a>
                </Link>
                <a 
                  href="#services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <img 
              src="https://pixabay.com/get/g3cc4627e5d027e486ee8c58585fb72ed6097dfa7239ac4595385bd3cd657e19623c98836dbeba53d73d0ede4bcf68316efa6e73ab7dfb46bec86288731f6771e_1280.jpg" 
              alt="Digital microscope with AI analysis overlay" 
              className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
