import { useState } from "react";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Download, FileText, MessageSquare } from "lucide-react";

interface Case {
  id: string;
  patientName: string;
  patientId: string;
  type: string;
  status: "Awaiting Review" | "Urgent Review" | "In Progress" | "Completed";
  aiPrediction: string;
  confidence: number;
  received: string;
}

interface CasesListProps {
  title?: string;
  cases: Case[];
  isLoading?: boolean;
  error?: string;
}

export default function CasesList({
  title = "Cases",
  cases,
  isLoading = false,
  error = "",
}: CasesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.aiPrediction.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter ? caseItem.status === statusFilter : true;
    const matchesType = typeFilter ? caseItem.type === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Awaiting Review":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Awaiting Review</Badge>;
      case "Urgent Review":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Urgent Review</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getActionButton = (caseItem: Case) => {
    switch (caseItem.status) {
      case "Awaiting Review":
      case "Urgent Review":
        return (
          <Link href={`/dashboard/cases/${caseItem.id}`}>
            <a className="text-primary hover:text-secondary">
              Review
            </a>
          </Link>
        );
      case "In Progress":
        return (
          <Link href={`/dashboard/cases/${caseItem.id}`}>
            <a className="text-primary hover:text-secondary">
              Continue
            </a>
          </Link>
        );
      case "Completed":
        return (
          <Link href={`/dashboard/cases/${caseItem.id}`}>
            <a className="text-primary hover:text-secondary">
              View
            </a>
          </Link>
        );
    }
  };

  // Get all unique types for filter
  const types = [...new Set(cases.map(c => c.type))];

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="Awaiting Review">Awaiting Review</SelectItem>
                <SelectItem value="Urgent Review">Urgent Review</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-neutral-500">
                    Loading cases...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-neutral-500">
                    No cases found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{caseItem.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{caseItem.patientName}</div>
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
                      {getActionButton(caseItem)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
