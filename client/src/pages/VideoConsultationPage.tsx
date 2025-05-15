import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import MainLayout from "@/components/layout/MainLayout";
import VideoConsultation from "@/components/video/VideoConsultation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Clock, Calendar, User, Video, Info } from "lucide-react";

export default function VideoConsultationPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isCallActive, setIsCallActive] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Check for any active or scheduled sessions
  const { data: sessions, isLoading: isLoadingSessions } = useQuery({
    queryKey: ['/api/video-consultation/sessions'],
  });

  // Sample session data (replace with actual API call result)
  const mockSessions = [
    {
      id: "VC-2023-0145",
      title: "Case Discussion: HST-2023-0139",
      participantName: user?.name || "Dr. Sarah Martinez",
      otherParticipants: [
        { id: "p1", name: "Dr. James Wilson", role: "Oncologist" },
        { id: "p2", name: "Dr. Lisa Chen", role: "Breast Surgery" }
      ],
      scheduledTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 mins from now
      status: "Scheduled",
    },
    {
      id: "VC-2023-0144",
      title: "Weekly Pathology Team Meeting",
      participantName: user?.name || "Dr. Sarah Martinez",
      otherParticipants: [
        { id: "p3", name: "Dr. Michael Smith", role: "Pathologist" },
        { id: "p4", name: "Dr. Emily Brown", role: "Pathologist" },
        { id: "p5", name: "Dr. Robert Johnson", role: "Pathologist" }
      ],
      scheduledTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
      status: "Scheduled",
    }
  ];

  const startCall = (sessionId: string) => {
    setSelectedSession(sessionId);
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setSelectedSession(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  // Format date for display
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const activeSession = mockSessions.find(session => session.id === selectedSession);

  return (
    <MainLayout>
      <Helmet>
        <title>Video Consultation - MicroVision</title>
        <meta name="description" content="Connect with pathologists through secure video consultations for collaborative analysis and expert opinions on your histopathology results." />
        <meta property="og:title" content="Video Consultation - MicroVision" />
        <meta property="og:description" content="Discuss your histopathology results with healthcare professionals through our secure video consultation platform." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="py-16 px-4 md:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          {!isCallActive ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-neutral-900 mb-4">Video Consultation</h1>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Discuss cases, review slides, and collaborate with colleagues through our HIPAA-compliant video platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Your scheduled video consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingSessions ? (
                      <div className="py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-neutral-500">Loading your sessions...</p>
                      </div>
                    ) : mockSessions.length === 0 ? (
                      <div className="py-8 text-center border border-dashed border-neutral-200 rounded-md">
                        <Info className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                        <p className="text-neutral-500 mb-2">No upcoming sessions scheduled</p>
                        <Button variant="outline" className="mt-2">Schedule Consultation</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mockSessions.map((session) => {
                          const { date, time } = formatDateTime(session.scheduledTime);
                          return (
                            <div key={session.id} className="border rounded-md p-4 hover:border-primary transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium">{session.title}</h3>
                                <div className="text-xs font-medium bg-blue-100 text-primary px-2 py-1 rounded">
                                  {session.status}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                <div className="flex items-center text-neutral-500">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {date}
                                </div>
                                <div className="flex items-center text-neutral-500">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {time}
                                </div>
                                <div className="flex items-center text-neutral-500 col-span-2">
                                  <User className="h-4 w-4 mr-2" />
                                  {session.otherParticipants.map(p => p.name).join(", ")}
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button onClick={() => startCall(session.id)}>
                                  <Video className="h-4 w-4 mr-2" />
                                  Join Meeting
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>Guide to video consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-medium mr-4">1</div>
                        <div>
                          <h3 className="font-medium text-neutral-900 mb-1">Schedule a Consultation</h3>
                          <p className="text-sm text-neutral-600">Book a time slot with a pathologist through our scheduling system.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-medium mr-4">2</div>
                        <div>
                          <h3 className="font-medium text-neutral-900 mb-1">Prepare for the Meeting</h3>
                          <p className="text-sm text-neutral-600">Make sure your camera and microphone are working properly. Have any relevant files ready.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-medium mr-4">3</div>
                        <div>
                          <h3 className="font-medium text-neutral-900 mb-1">Join the Consultation</h3>
                          <p className="text-sm text-neutral-600">Click the "Join Meeting" button when it's time for your consultation.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-medium mr-4">4</div>
                        <div>
                          <h3 className="font-medium text-neutral-900 mb-1">Discuss and Collaborate</h3>
                          <p className="text-sm text-neutral-600">Share screens, discuss results, and collaborate on diagnosis and treatment plans.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Schedule New Consultation</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-neutral-100">
                <h2 className="text-xl font-semibold mb-4">System Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Compatible Browsers</h3>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• Google Chrome (recommended)</li>
                      <li>• Mozilla Firefox</li>
                      <li>• Microsoft Edge</li>
                      <li>• Safari 14 or later</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Hardware Requirements</h3>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• Webcam (integrated or external)</li>
                      <li>• Microphone</li>
                      <li>• Speakers or headphones</li>
                      <li>• Stable internet connection</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Recommended Setup</h3>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• Internet speed: 5+ Mbps</li>
                      <li>• Well-lit, quiet environment</li>
                      <li>• Headset with microphone</li>
                      <li>• Second monitor (if available)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : activeSession ? (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-neutral-900">{activeSession.title}</h1>
                <p className="text-neutral-500">Session ID: {activeSession.id}</p>
              </div>
              
              <VideoConsultation 
                sessionId={activeSession.id}
                participantName={activeSession.participantName}
                otherParticipants={activeSession.otherParticipants}
                onEndCall={endCall}
              />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-500">
                  Having technical issues? <a href="#" className="text-primary hover:text-secondary">Get help</a>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-neutral-700">Loading session...</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
