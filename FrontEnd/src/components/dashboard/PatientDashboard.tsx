import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./components/StatsCard";
import AppointmentsList from "./components/AppointmentsList";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, FileText, Activity } from "lucide-react";

export default function PatientDashboard() {
  const { toast } = useToast();
  
  // Fetch patient data
  const { data: patientData, isLoading: isLoadingPatient } = useQuery({
    queryKey: ['/api/patient/dashboard'],
  });

  // Fetch analysis history
  const { data: analysisHistory, isLoading: isLoadingAnalysis } = useQuery({
    queryKey: ['/api/patient/analysis-history'],
  });

  // Sample data structure for appointments (replace with actual API data)
  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      role: "Pathologist",
      date: "May 15, 2023",
      time: "10:30 AM",
    },
    {
      id: "2",
      doctor: "Dr. Michael Chen",
      role: "Oncologist",
      date: "May 22, 2023",
      time: "2:00 PM",
    },
  ];

  // Sample data structure for recent reports (replace with actual API data)
  const recentReports = [
    {
      id: "HST-1092",
      title: "Biopsy Analysis",
      status: "Completed",
      date: "May 10, 2023",
    },
    {
      id: "HST-1087",
      title: "Follow-up Examination",
      status: "In Progress",
      date: "May 5, 2023",
    },
  ];

  // Sample data structure for recent activity (replace with actual API data)
  const recentActivity = [
    {
      id: "1",
      type: "report_viewed",
      text: "Report #HST-1092 viewed",
      timestamp: "Today, 9:45 AM",
      icon: <FileText className="text-primary mt-1 mr-2 h-4 w-4" />,
    },
    {
      id: "2",
      type: "appointment_scheduled",
      text: "Appointment scheduled",
      timestamp: "Yesterday, 2:30 PM",
      icon: <Calendar className="text-primary mt-1 mr-2 h-4 w-4" />,
    },
  ];
  
  // Sample data structure for analysis history (replace with actual API data)
  const sampleAnalysisHistory = [
    {
      id: "HST-1092",
      date: "May 12, 2023",
      type: "Skin Biopsy",
      status: "Completed",
      actions: ["view", "download"],
    },
    {
      id: "HST-1087",
      date: "May 5, 2023",
      type: "Liver Biopsy",
      status: "Under Review",
      actions: ["view", "comment"],
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Appointment Card */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Upcoming Appointments</h3>
            <div className="space-y-2">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white p-3 rounded border border-neutral-100 mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{appointment.doctor}</span>
                    <span className="text-xs text-neutral-500">{appointment.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-neutral-500">{appointment.date}</span>
                    <span className="text-xs text-neutral-500">{appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/appointments">
              <a className="text-sm text-primary hover:text-secondary inline-block mt-2">
                View all appointments →
              </a>
            </Link>
          </CardContent>
        </Card>

        {/* Reports Card */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Recent Reports</h3>
            <div className="space-y-2">
              {recentReports.map((report) => (
                <div key={report.id} className="bg-white p-3 rounded border border-neutral-100 mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{report.title}</span>
                    <span className={`text-xs ${
                      report.status === "Completed" 
                        ? "text-green-600" 
                        : "text-amber-600"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">Received: {report.date}</div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/reports">
              <a className="text-sm text-primary hover:text-secondary inline-block mt-2">
                View all reports →
              </a>
            </Link>
          </CardContent>
        </Card>

        {/* Activity Card */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  {activity.icon}
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-neutral-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis History */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analysis History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-neutral-50 text-left">
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Date</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Sample ID</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Analysis Type</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Status</th>
                  <th className="py-3 px-4 font-medium text-sm text-neutral-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {isLoadingAnalysis ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-neutral-500">
                      Loading analysis history...
                    </td>
                  </tr>
                ) : sampleAnalysisHistory.map((analysis) => (
                  <tr key={analysis.id}>
                    <td className="py-3 px-4 text-sm">{analysis.date}</td>
                    <td className="py-3 px-4 text-sm">{analysis.id}</td>
                    <td className="py-3 px-4 text-sm">{analysis.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        analysis.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {analysis.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {analysis.actions.includes("view") && (
                          <button className="text-primary hover:text-secondary">
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {analysis.actions.includes("download") && (
                          <button className="text-primary hover:text-secondary">
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/analysis">
              <a className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
                <div className="flex items-center">
                  <div className="mr-3 bg-primary bg-opacity-10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">New Analysis</h4>
                    <p className="text-sm text-neutral-500">Upload a new slide for analysis</p>
                  </div>
                </div>
              </a>
            </Link>
            
            <Link href="/dashboard/appointments/schedule">
              <a className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
                <div className="flex items-center">
                  <div className="mr-3 bg-primary bg-opacity-10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Schedule Appointment</h4>
                    <p className="text-sm text-neutral-500">Book a consultation with a pathologist</p>
                  </div>
                </div>
              </a>
            </Link>
            
            <Link href="/video-consultation">
              <a className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
                <div className="flex items-center">
                  <div className="mr-3 bg-primary bg-opacity-10 p-2 rounded-full">
                    <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Video Consultation</h4>
                    <p className="text-sm text-neutral-500">Connect with your pathologist</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
