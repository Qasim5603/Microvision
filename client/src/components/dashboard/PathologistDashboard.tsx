import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./components/StatsCard";
import { Eye, Edit, ArrowUp, BarChart } from "lucide-react";

export default function PathologistDashboard() {
  const { toast } = useToast();
  
  // Fetch pathologist dashboard data
  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
    queryKey: ['/api/pathologist/dashboard'],
  });

  // Sample data structure for stats cards (replace with actual API data)
  const statsData = [
    {
      title: "New Cases",
      value: "8",
      change: {
        value: "12%",
        type: "increase"
      },
      comparison: "from yesterday",
      badge: {
        text: "Today",
        variant: "primary"
      }
    },
    {
      title: "Pending Reviews",
      value: "14",
      change: {
        value: "5%",
        type: "decrease"
      },
      comparison: "from yesterday",
      badge: {
        text: "Urgent: 2",
        variant: "warning"
      }
    },
    {
      title: "Completed Today",
      value: "12",
      change: {
        value: "18%",
        type: "increase"
      },
      comparison: "from yesterday",
      badge: {
        text: "On Track",
        variant: "success"
      }
    }
  ];

  // Sample data structure for cases (replace with actual API data)
  const recentCases = [
    {
      id: "HST-2023-0145",
      patient: "Robert Johnson",
      patientId: "P-58742",
      type: "Colon Biopsy",
      status: "Awaiting Review",
      aiPrediction: "Adenocarcinoma",
      confidence: 92,
      received: "Today, 9:42 AM"
    },
    {
      id: "HST-2023-0144",
      patient: "Emily Chen",
      patientId: "P-45219",
      type: "Breast Biopsy",
      status: "Urgent Review",
      aiPrediction: "Invasive Ductal Carcinoma",
      confidence: 89,
      received: "Today, 8:15 AM"
    },
    {
      id: "HST-2023-0143",
      patient: "Michael Smith",
      patientId: "P-36921",
      type: "Skin Biopsy",
      status: "In Progress",
      aiPrediction: "Melanoma",
      confidence: 76,
      received: "Yesterday, 4:30 PM"
    },
    {
      id: "HST-2023-0142",
      patient: "Sarah Wilson",
      patientId: "P-47832",
      type: "Thyroid Biopsy",
      status: "Completed",
      aiPrediction: "Papillary Carcinoma",
      confidence: 95,
      received: "Yesterday, 2:10 PM"
    }
  ];

  // Sample data structure for appointments (replace with actual API data)
  const upcomingAppointments = [
    {
      id: "1",
      title: "Case Discussion: HST-2023-0139",
      participant: "Dr. James Wilson, Oncology",
      time: "Today, 2:00 PM"
    },
    {
      id: "2",
      title: "Multidisciplinary Team Meeting",
      participant: "Head and Neck Cancer Team",
      time: "Tomorrow, 9:00 AM"
    },
    {
      id: "3",
      title: "Case Discussion: HST-2023-0144",
      participant: "Dr. Lisa Chen, Breast Surgery",
      time: "Tomorrow, 3:30 PM"
    }
  ];

  // Sample data structure for AI metrics (replace with actual API data)
  const aiMetrics = {
    averageAccuracy: "91.4%",
    totalCasesAnalyzed: "328",
    falseNegatives: "2.3%",
    tissueAccuracy: [
      { name: "Liver", value: 94 },
      { name: "Skin", value: 92 },
      { name: "Breast", value: 90 }
    ],
    diagnosticConcordance: [
      { name: "Carcinoma", value: 91 },
      { name: "Adenoma", value: 89 },
      { name: "Inflammation", value: 95 }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Awaiting Review":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Awaiting Review</Badge>
      case "Urgent Review":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Urgent Review</Badge>
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "Completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Stats cards */}
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-500 mb-1">{stat.title}</h3>
                <Badge variant="outline" className={`
                  ${stat.badge.variant === "primary" ? "bg-blue-100 text-primary" : ""}
                  ${stat.badge.variant === "warning" ? "bg-orange-100 text-orange-600" : ""}
                  ${stat.badge.variant === "success" ? "bg-green-100 text-green-600" : ""}
                `}>
                  {stat.badge.text}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-neutral-900 mt-2">{stat.value}</p>
              <div className="flex items-center mt-2 text-xs">
                <span className={`flex items-center ${
                  stat.change.type === "increase" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change.type === "increase" ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  {stat.change.value}
                </span>
                <span className="text-neutral-500 ml-2">{stat.comparison}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Cases */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Case ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Sample Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">AI Prediction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Received</th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{caseItem.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{caseItem.patient}</div>
                      <div className="text-sm text-neutral-500">ID: {caseItem.patientId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{caseItem.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(caseItem.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      <div className="flex items-center">
                        <span>{caseItem.aiPrediction}</span>
                        <span className="ml-2 text-xs text-neutral-500">({caseItem.confidence}%)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {caseItem.received}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/cases/${caseItem.id}`}>
                        <a className="text-primary hover:text-secondary mr-2">
                          {caseItem.status === "Completed" ? "View" : 
                           caseItem.status === "In Progress" ? "Continue" : "Review"}
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle>Upcoming Appointments</CardTitle>
            <Link href="/dashboard/appointments">
              <a className="text-sm text-primary hover:text-secondary">View All</a>
            </Link>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-neutral-200">
              {upcomingAppointments.map((appointment) => (
                <li key={appointment.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{appointment.title}</p>
                      <p className="text-sm text-neutral-500">{appointment.participant}</p>
                    </div>
                    <div className="text-sm text-neutral-500">
                      {appointment.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* AI Performance Metrics */}
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle>AI Performance Metrics</CardTitle>
            <div className="flex space-x-2">
              <button className="text-xs text-neutral-500 bg-neutral-100 hover:bg-neutral-200 rounded px-2 py-1">Week</button>
              <button className="text-xs text-white bg-primary rounded px-2 py-1">Month</button>
              <button className="text-xs text-neutral-500 bg-neutral-100 hover:bg-neutral-200 rounded px-2 py-1">Year</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">Average Accuracy</p>
                <p className="text-2xl font-bold text-neutral-900">{aiMetrics.averageAccuracy}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Total Cases Analyzed</p>
                <p className="text-2xl font-bold text-neutral-900">{aiMetrics.totalCasesAnalyzed}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">False Negatives</p>
                <p className="text-2xl font-bold text-neutral-900">{aiMetrics.falseNegatives}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-neutral-900 mb-2">Accuracy by Tissue Type</h4>
                <div className="space-y-2">
                  {aiMetrics.tissueAccuracy.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-neutral-500">{item.name}</span>
                        <span className="text-xs font-medium">{item.value}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-900 mb-2">Diagnostic Concordance</h4>
                <div className="space-y-2">
                  {aiMetrics.diagnosticConcordance.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-neutral-500">{item.name}</span>
                        <span className="text-xs font-medium">{item.value}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5">
                        <div
                          className="bg-accent h-1.5 rounded-full"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Link href="/dashboard/analytics">
                <a className="text-sm text-primary hover:text-secondary">
                  View detailed analytics →
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
