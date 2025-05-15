// User related types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "patient" | "pathologist" | "admin";
  profileImage?: string;
}

// Analysis related types
export interface AnalysisResult {
  id: string;
  classification: string;
  confidence: number;
  featuresDetected: string[];
  recommendation: string;
}

export interface AnalysisHistory {
  id: string;
  patientId: number;
  date: string;
  sampleId: string;
  type: string;
  status: "Awaiting Review" | "Under Review" | "Completed";
  aiPrediction?: string;
  confidence?: number;
  pathologistId?: number;
  reportId?: string;
}

// Appointment related types
export interface Appointment {
  id: string;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  date: string;
  time: string;
  type: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "In Progress";
  notes?: string;
}

// Case related types
export interface Case {
  id: string;
  patientId: number;
  patientName: string;
  pathologistId?: number;
  type: string;
  status: "Awaiting Review" | "Urgent Review" | "In Progress" | "Completed";
  aiPrediction: string;
  confidence: number;
  receivedAt: string;
  completedAt?: string;
  notes?: string;
}

// Video consultation related types
export interface VideoSession {
  id: string;
  title: string;
  scheduledTime: string;
  participantIds: number[];
  participantName?: string;
  otherParticipants?: {
    id: string;
    name: string;
    role: string;
  }[];
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  caseId?: string;
  notes?: string;
}

// Educational resources related types
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "guides" | "articles" | "webinars" | "videos";
  image?: string;
  content?: string;
  tags: string[];
  date: string;
  authorId?: number;
  authorName?: string;
}

// Contact message type
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "New" | "Read" | "Replied";
}

// Dashboard stats types
export interface StatsData {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  comparison?: string;
  badge?: {
    text: string;
    variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  };
}

export interface SystemHealth {
  serverStatus: "Operational" | "Degraded" | "Down";
  apiHealth: string;
  resources: {
    name: string;
    usage: number;
  }[];
}

export interface AiMetrics {
  averageAccuracy: string;
  totalCasesAnalyzed: string;
  falseNegatives: string;
  tissueAccuracy: {
    name: string;
    value: number;
  }[];
  diagnosticConcordance: {
    name: string;
    value: number;
  }[];
}
