import { useState } from "react";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, Filter, Video, Calendar as CalendarIcon } from "lucide-react";

interface Appointment {
  id: string;
  patientName?: string;
  doctorName?: string;
  date: string;
  time: string;
  type: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "In Progress";
  notes?: string;
}

interface AppointmentsListProps {
  title?: string;
  appointments: Appointment[];
  isLoading?: boolean;
  error?: string;
  userRole?: "patient" | "pathologist" | "admin";
  onJoin?: (appointmentId: string) => void;
  onCancel?: (appointmentId: string) => void;
  onReschedule?: (appointmentId: string) => void;
}

export default function AppointmentsList({
  title = "Appointments",
  appointments,
  isLoading = false,
  error = "",
  userRole = "pathologist",
  onJoin,
  onCancel,
  onReschedule,
}: AppointmentsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      (appointment.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) || !appointment.patientName) &&
      (appointment.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) || !appointment.doctorName) &&
      (appointment.type.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter ? appointment.status === statusFilter : true;
    const matchesType = typeFilter ? appointment.type === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "Completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get all unique types for filter
  const types = [...new Set(appointments.map(a => a.type))];

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search appointments..."
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
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date & Time</th>
                {userRole === "patient" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Doctor</th>
                )}
                {userRole === "pathologist" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Patient</th>
                )}
                {userRole === "admin" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Doctor</th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Notes</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-neutral-500">
                    Loading appointments...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-neutral-500">
                    No appointments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-neutral-900">{appointment.date}</span>
                        <span className="text-sm text-neutral-500">{appointment.time}</span>
                      </div>
                    </td>
                    {userRole === "patient" && appointment.doctorName && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{appointment.doctorName}</div>
                      </td>
                    )}
                    {userRole === "pathologist" && appointment.patientName && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{appointment.patientName}</div>
                      </td>
                    )}
                    {userRole === "admin" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-900">{appointment.patientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-900">{appointment.doctorName}</div>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{appointment.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">
                        {appointment.notes || "No notes"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        {appointment.status === "Scheduled" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onJoin && onJoin(appointment.id)}
                            >
                              <Video className="h-4 w-4 mr-1" />
                              Join
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onReschedule && onReschedule(appointment.id)}
                            >
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Reschedule
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                              onClick={() => onCancel && onCancel(appointment.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === "In Progress" && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => onJoin && onJoin(appointment.id)}
                          >
                            <Video className="h-4 w-4 mr-1" />
                            Join Now
                          </Button>
                        )}
                        {appointment.status === "Completed" && (
                          <Link href={`/dashboard/appointments/${appointment.id}`}>
                            <a className="text-primary hover:text-secondary">
                              View Details
                            </a>
                          </Link>
                        )}
                      </div>
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
