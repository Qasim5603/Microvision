import { Link } from "wouter";

export default function EducationalResources() {
  const resources = [
    {
      title: "Understanding Histopathology Reports",
      description: "A comprehensive guide to interpreting your histopathology report and understanding the medical terminology.",
      image: "https://pixabay.com/get/g54dc0b5815d0a3debf88d216dd645d516ceb7dab8322201c7b7ca734a4750d21fb6e59a9b926bf6a5d82461ab7af3980118a7a5d8fc79de4e469991ba6c3a4f8_1280.jpg",
      type: "Guide",
      link: "/resources/reports-guide"
    },
    {
      title: "The Role of AI in Histopathology",
      description: "Learn how artificial intelligence is transforming histopathology diagnostics and improving patient outcomes.",
      image: "https://pixabay.com/get/gc503a0b6641259b0937bdfa2a3e70dfc4f2a1ff0bc4a95f16e03ec02263b2d70816fc44979983e13a39abaeba89e934594bb7e1bc2a29309cacb18f053e6c6e5_1280.jpg",
      type: "Article",
      link: "/resources/ai-histopathology"
    },
    {
      title: "Questions to Ask Your Pathologist",
      description: "Prepare for your consultation with a comprehensive list of important questions to ask about your histopathology results.",
      image: "https://images.unsplash.com/photo-1517120026326-d87759a7b63b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      type: "Checklist",
      link: "/resources/questions-checklist"
    }
  ];

  return (
    <section id="resources" className="py-16 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-subheading">Educational Resources</h2>
          <p className="section-heading">
            Histopathology Knowledge Center
          </p>
          <p className="section-description">
            Explore our histopathology educational materials to better understand your results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={resource.image} 
                alt={resource.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{resource.title}</h3>
                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary">{resource.type}</span>
                  <Link href={resource.link}>
                    <a className="text-sm font-medium text-primary hover:text-secondary transition flex items-center">
                      Read More 
                      <svg 
                        className="ml-1 h-4 w-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/resources">
            <a className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              View All Resources
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
