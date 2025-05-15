export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload Slide Images",
      description: "Upload digital slides or scan physical slides for AI-assisted analysis."
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "Our AI algorithms process the slides, identifying patterns and potential abnormalities."
    },
    {
      number: "3",
      title: "Expert Review",
      description: "Pathologists review AI findings and provide final diagnosis with detailed reports."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">How MicroVision Works</h2>
          <p className="section-description">Our platform streamlines the histopathology analysis process with cutting-edge AI technology.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-4">
                <span className="text-primary text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2 text-center">{step.title}</h3>
              <p className="text-neutral-500 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
