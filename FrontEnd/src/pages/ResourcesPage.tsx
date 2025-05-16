import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Calendar, Video, Book, GraduationCap, Layers, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Fetch educational resources
  const { data: resources, isLoading } = useQuery({
    queryKey: ['/api/resources'],
  });
  
  // Resource categories
  const categories = [
    { id: "all", name: "All Resources" },
    { id: "guides", name: "Guides" },
    { id: "articles", name: "Articles" },
    { id: "webinars", name: "Webinars" },
    { id: "videos", name: "Videos" }
  ];
  
  // Sample resource items - This would normally come from the API
  const resourceItems = [
    {
      id: "1",
      title: "Understanding Histopathology Reports",
      description: "A comprehensive guide to interpreting your histopathology report and understanding the medical terminology.",
      category: "guides",
      image: "https://pixabay.com/get/g54dc0b5815d0a3debf88d216dd645d516ceb7dab8322201c7b7ca734a4750d21fb6e59a9b926bf6a5d82461ab7af3980118a7a5d8fc79de4e469991ba6c3a4f8_1280.jpg",
      tags: ["report", "interpretation", "terminology"],
      date: "2023-04-15"
    },
    {
      id: "2", 
      title: "The Role of AI in Histopathology",
      description: "Learn how artificial intelligence is transforming histopathology diagnostics and improving patient outcomes.",
      category: "articles",
      image: "https://pixabay.com/get/gc503a0b6641259b0937bdfa2a3e70dfc4f2a1ff0bc4a95f16e03ec02263b2d70816fc44979983e13a39abaeba89e934594bb7e1bc2a29309cacb18f053e6c6e5_1280.jpg",
      tags: ["ai", "technology", "diagnostics"],
      date: "2023-03-22"
    },
    {
      id: "3",
      title: "Questions to Ask Your Pathologist",
      description: "Prepare for your consultation with a comprehensive list of important questions to ask about your histopathology results.",
      category: "guides",
      image: "https://images.unsplash.com/photo-1517120026326-d87759a7b63b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      tags: ["consultation", "questions", "communication"],
      date: "2023-05-10"
    },
    {
      id: "4",
      title: "Digital Pathology Webinar Series",
      description: "Join our live webinars featuring expert pathologists discussing the latest advances in digital pathology.",
      category: "webinars",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      tags: ["webinar", "digital pathology", "experts"],
      date: "2023-06-15"
    },
    {
      id: "5",
      title: "Common Histopathology Patterns",
      description: "A visual guide to common histopathology patterns and what they indicate about tissue health and disease.",
      category: "videos",
      image: "https://images.unsplash.com/photo-1530026454774-50cce722a1fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tags: ["patterns", "visual guide", "education"],
      date: "2023-02-08"
    },
    {
      id: "6",
      title: "Introduction to Tissue Staining Techniques",
      description: "Learn about different staining techniques used in histopathology and how they help identify cellular structures.",
      category: "articles",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
      tags: ["staining", "techniques", "laboratory"],
      date: "2023-01-25"
    }
  ];
  
  // Filter resources based on search query and active category
  const filteredResources = resourceItems.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get icon for resource category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "guides":
        return <FileText className="h-4 w-4" />;
      case "articles":
        return <Layers className="h-4 w-4" />;
      case "webinars":
        return <Video className="h-4 w-4" />;
      case "videos":
        return <Video className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Educational Resources - MicroVision</title>
        <meta name="description" content="Access comprehensive educational resources on histopathology, including guides, articles, webinars, and visual materials to enhance your understanding." />
        <meta property="og:title" content="Educational Resources - MicroVision" />
        <meta property="og:description" content="Explore our histopathology educational materials to better understand diagnostic reports and procedures." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="bg-neutral-50 pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Histopathology Knowledge Center</h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Expand your understanding of histopathology with our comprehensive collection of educational resources.
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-neutral-500" />
                <span className="text-sm text-neutral-500">Filter by:</span>
                <div className="flex overflow-x-auto space-x-2 pb-1">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Resources */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured cards are first 3 items from filtered resources */}
              {filteredResources.slice(0, 3).map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white bg-opacity-90 text-primary">
                        {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{resource.title}</h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2">{resource.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-neutral-500">
                        <Calendar className="h-4 w-4 inline mr-1" /> {formatDate(resource.date)}
                      </div>
                      <Button variant="outline" size="sm">Read More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* All Resources */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">All Resources</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <GraduationCap className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-neutral-700 mb-2">No resources found</h3>
                <p className="text-neutral-500 mb-6">
                  We couldn't find any resources matching your criteria. Please try a different search.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-3">
                        {getCategoryIcon(resource.category)}
                        <Badge variant="outline" className="ml-2 text-xs">
                          {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                        </Badge>
                        <span className="ml-auto text-xs text-neutral-500">{formatDate(resource.date)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{resource.title}</h3>
                      <p className="text-neutral-600 mb-4 text-sm line-clamp-3">{resource.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 cursor-pointer" onClick={() => setSearchQuery(tag)}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Resource
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination - would connect to actual pagination from API */}
            <div className="flex justify-center mt-10">
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
          
          {/* Email Subscription */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 mt-16">
            <div className="text-center mb-6">
              <GraduationCap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Stay Updated</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest educational resources and updates in histopathology.
              </p>
            </div>
            
            <div className="max-w-md mx-auto flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
