import { 
  users, type User, type InsertUser,
  analyses, type Analysis, type InsertAnalysis,
  appointments, type Appointment, type InsertAppointment,
  videoSessions, type VideoSession, type InsertVideoSession,
  resources, type Resource, type InsertResource,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Analysis operations
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysisById(id: number): Promise<Analysis | undefined>;
  getAnalysesByPatientId(patientId: number): Promise<Analysis[]>;
  getAnalysesByPathologistId(pathologistId: number): Promise<Analysis[]>;
  getPendingAnalyses(): Promise<Analysis[]>;
  getAllAnalyses(): Promise<Analysis[]>;
  updateAnalysisStatus(id: number, status: string): Promise<Analysis>;
  
  // Appointment operations
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentById(id: number): Promise<Appointment | undefined>;
  getAppointmentsByPatientId(patientId: number): Promise<Appointment[]>;
  getAppointmentsByDoctorId(doctorId: number): Promise<Appointment[]>;
  getAllAppointments(): Promise<Appointment[]>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment>;
  
  // Video session operations
  createVideoSession(session: InsertVideoSession): Promise<VideoSession>;
  getVideoSessionById(id: number): Promise<VideoSession | undefined>;
  getVideoSessionsByParticipantId(participantId: number): Promise<VideoSession[]>;
  getAllVideoSessions(): Promise<VideoSession[]>;
  updateVideoSessionStatus(id: number, status: string): Promise<VideoSession>;
  
  // Resource operations
  createResource(resource: InsertResource): Promise<Resource>;
  getResourceById(id: number): Promise<Resource | undefined>;
  getAllResources(): Promise<Resource[]>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  updateContactMessageStatus(id: number, status: string): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private analysesData: Map<number, Analysis>;
  private appointmentsData: Map<number, Appointment>;
  private videoSessionsData: Map<number, VideoSession>;
  private resourcesData: Map<number, Resource>;
  private contactMessagesData: Map<number, ContactMessage>;
  
  private userId: number;
  private analysisId: number;
  private appointmentId: number;
  private videoSessionId: number;
  private resourceId: number;
  private contactMessageId: number;

  constructor() {
    this.usersData = new Map();
    this.analysesData = new Map();
    this.appointmentsData = new Map();
    this.videoSessionsData = new Map();
    this.resourcesData = new Map();
    this.contactMessagesData = new Map();
    
    this.userId = 1;
    this.analysisId = 1;
    this.appointmentId = 1;
    this.videoSessionId = 1;
    this.resourceId = 1;
    this.contactMessageId = 1;
    
    // Initialize with sample users
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample users
    const sampleUsers = [
      {
        id: this.userId++,
        name: "John Doe",
        email: "patient@example.com",
        password: "password123",
        role: "patient",
        createdAt: new Date()
      },
      {
        id: this.userId++,
        name: "Dr. Sarah Martinez",
        email: "pathologist@example.com",
        password: "password123",
        role: "pathologist",
        createdAt: new Date()
      },
      {
        id: this.userId++,
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
        createdAt: new Date()
      }
    ];
    
    sampleUsers.forEach(user => {
      this.usersData.set(user.id, user as User);
    });
    
    // Create sample analyses
    const sampleAnalyses = [
      {
        id: this.analysisId++,
        patientId: 1,
        pathologistId: 2,
        sampleId: "HST-2023-1092",
        type: "Skin Biopsy",
        status: "Completed",
        imageUrl: "https://example.com/image1.jpg",
        aiPrediction: "Adenocarcinoma",
        confidence: 92,
        features: ["Abnormal cell proliferation", "Cellular dysplasia"],
        recommendation: "Further review recommended",
        createdAt: new Date("2023-05-10"),
        updatedAt: new Date("2023-05-12")
      },
      {
        id: this.analysisId++,
        patientId: 1,
        pathologistId: null,
        sampleId: "HST-2023-1087",
        type: "Liver Biopsy",
        status: "Awaiting Review",
        imageUrl: "https://example.com/image2.jpg",
        aiPrediction: "Hepatocellular Carcinoma",
        confidence: 85,
        features: ["Abnormal cell growth", "Irregular pattern"],
        recommendation: "Pathologist review required",
        createdAt: new Date("2023-05-05"),
        updatedAt: new Date("2023-05-05")
      }
    ];
    
    sampleAnalyses.forEach(analysis => {
      this.analysesData.set(analysis.id, analysis as unknown as Analysis);
    });
    
    // Create sample appointments
    const sampleAppointments = [
      {
        id: this.appointmentId++,
        patientId: 1,
        doctorId: 2,
        date: "2023-05-15",
        time: "10:30 AM",
        type: "Consultation",
        status: "Scheduled",
        notes: "Initial consultation about histopathology results",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.appointmentId++,
        patientId: 1,
        doctorId: 2,
        date: "2023-05-22",
        time: "2:00 PM",
        type: "Follow-up",
        status: "Scheduled",
        notes: "Review treatment options",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    sampleAppointments.forEach(appointment => {
      this.appointmentsData.set(appointment.id, appointment as Appointment);
    });
    
    // Create sample video sessions
    const sampleVideoSessions = [
      {
        id: this.videoSessionId++,
        title: "Case Discussion: HST-2023-0139",
        scheduledTime: new Date(Date.now() + 10 * 60 * 1000),
        participantIds: [1, 2],
        status: "Scheduled",
        caseId: "HST-2023-0139",
        notes: "Discuss abnormal findings in recent biopsy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.videoSessionId++,
        title: "Weekly Pathology Team Meeting",
        scheduledTime: new Date(Date.now() + 60 * 60 * 1000),
        participantIds: [2, 3],
        status: "Scheduled",
        notes: "Weekly team meeting to discuss cases",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    sampleVideoSessions.forEach(session => {
      this.videoSessionsData.set(session.id, session as VideoSession);
    });
    
    // Create sample resources
    const sampleResources = [
      {
        id: this.resourceId++,
        title: "Understanding Histopathology Reports",
        description: "A comprehensive guide to interpreting your histopathology report and understanding the medical terminology.",
        category: "guides" as const,
        image: "https://pixabay.com/get/g54dc0b5815d0a3debf88d216dd645d516ceb7dab8322201c7b7ca734a4750d21fb6e59a9b926bf6a5d82461ab7af3980118a7a5d8fc79de4e469991ba6c3a4f8_1280.jpg",
        content: "Content of the guide...",
        tags: ["report", "interpretation", "terminology"],
        date: new Date("2023-04-15"),
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.resourceId++,
        title: "The Role of AI in Histopathology",
        description: "Learn how artificial intelligence is transforming histopathology diagnostics and improving patient outcomes.",
        category: "articles" as const,
        image: "https://pixabay.com/get/gc503a0b6641259b0937bdfa2a3e70dfc4f2a1ff0bc4a95f16e03ec02263b2d70816fc44979983e13a39abaeba89e934594bb7e1bc2a29309cacb18f053e6c6e5_1280.jpg",
        content: "Content of the article...",
        tags: ["ai", "technology", "diagnostics"],
        date: new Date("2023-03-22"),
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    sampleResources.forEach(resource => {
      this.resourcesData.set(resource.id, resource as Resource);
    });
  }

  // ==================== USER OPERATIONS ====================
  
  async getUser(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.usersData.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userId++;
    const newUser: User = {
      id,
      ...user,
      createdAt: new Date()
    };
    this.usersData.set(id, newUser);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.usersData.values());
  }

  // ==================== ANALYSIS OPERATIONS ====================
  
  async createAnalysis(analysis: InsertAnalysis): Promise<Analysis> {
    const id = this.analysisId++;
    const now = new Date();
    const newAnalysis: Analysis = {
      id,
      ...analysis,
      createdAt: now,
      updatedAt: now
    };
    this.analysesData.set(id, newAnalysis);
    return newAnalysis;
  }

  async getAnalysisById(id: number): Promise<Analysis | undefined> {
    return this.analysesData.get(id);
  }

  async getAnalysesByPatientId(patientId: number): Promise<Analysis[]> {
    return Array.from(this.analysesData.values()).filter(
      analysis => analysis.patientId === patientId
    );
  }

  async getAnalysesByPathologistId(pathologistId: number): Promise<Analysis[]> {
    return Array.from(this.analysesData.values()).filter(
      analysis => analysis.pathologistId === pathologistId
    );
  }

  async getPendingAnalyses(): Promise<Analysis[]> {
    return Array.from(this.analysesData.values()).filter(
      analysis => analysis.status !== "Completed"
    );
  }

  async getAllAnalyses(): Promise<Analysis[]> {
    return Array.from(this.analysesData.values());
  }

  async updateAnalysisStatus(id: number, status: string): Promise<Analysis> {
    const analysis = this.analysesData.get(id);
    if (!analysis) {
      throw new Error("Analysis not found");
    }
    
    const updatedAnalysis: Analysis = {
      ...analysis,
      status: status as "Awaiting Review" | "Under Review" | "Completed",
      updatedAt: new Date()
    };
    
    this.analysesData.set(id, updatedAnalysis);
    return updatedAnalysis;
  }

  // ==================== APPOINTMENT OPERATIONS ====================
  
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentId++;
    const now = new Date();
    const newAppointment: Appointment = {
      id,
      ...appointment,
      createdAt: now,
      updatedAt: now
    };
    this.appointmentsData.set(id, newAppointment);
    return newAppointment;
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    return this.appointmentsData.get(id);
  }

  async getAppointmentsByPatientId(patientId: number): Promise<Appointment[]> {
    return Array.from(this.appointmentsData.values()).filter(
      appointment => appointment.patientId === patientId
    );
  }

  async getAppointmentsByDoctorId(doctorId: number): Promise<Appointment[]> {
    return Array.from(this.appointmentsData.values()).filter(
      appointment => appointment.doctorId === doctorId
    );
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointmentsData.values());
  }

  async updateAppointmentStatus(id: number, status: string): Promise<Appointment> {
    const appointment = this.appointmentsData.get(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    
    const updatedAppointment: Appointment = {
      ...appointment,
      status: status as "Scheduled" | "Completed" | "Cancelled" | "In Progress",
      updatedAt: new Date()
    };
    
    this.appointmentsData.set(id, updatedAppointment);
    return updatedAppointment;
  }

  // ==================== VIDEO SESSION OPERATIONS ====================
  
  async createVideoSession(session: InsertVideoSession): Promise<VideoSession> {
    const id = this.videoSessionId++;
    const now = new Date();
    const newSession: VideoSession = {
      id,
      ...session,
      createdAt: now,
      updatedAt: now
    };
    this.videoSessionsData.set(id, newSession);
    return newSession;
  }

  async getVideoSessionById(id: number): Promise<VideoSession | undefined> {
    return this.videoSessionsData.get(id);
  }

  async getVideoSessionsByParticipantId(participantId: number): Promise<VideoSession[]> {
    return Array.from(this.videoSessionsData.values()).filter(
      session => (session.participantIds as number[]).includes(participantId)
    );
  }

  async getAllVideoSessions(): Promise<VideoSession[]> {
    return Array.from(this.videoSessionsData.values());
  }

  async updateVideoSessionStatus(id: number, status: string): Promise<VideoSession> {
    const session = this.videoSessionsData.get(id);
    if (!session) {
      throw new Error("Video session not found");
    }
    
    const updatedSession: VideoSession = {
      ...session,
      status: status as "Scheduled" | "In Progress" | "Completed" | "Cancelled",
      updatedAt: new Date()
    };
    
    this.videoSessionsData.set(id, updatedSession);
    return updatedSession;
  }

  // ==================== RESOURCE OPERATIONS ====================
  
  async createResource(resource: InsertResource): Promise<Resource> {
    const id = this.resourceId++;
    const now = new Date();
    const newResource: Resource = {
      id,
      ...resource,
      createdAt: now,
      updatedAt: now
    };
    this.resourcesData.set(id, newResource);
    return newResource;
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    return this.resourcesData.get(id);
  }

  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resourcesData.values());
  }

  // ==================== CONTACT MESSAGE OPERATIONS ====================
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const now = new Date();
    const newMessage: ContactMessage = {
      id,
      ...message,
      status: "New",
      createdAt: now
    };
    this.contactMessagesData.set(id, newMessage);
    return newMessage;
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessagesData.get(id);
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesData.values());
  }

  async updateContactMessageStatus(id: number, status: string): Promise<ContactMessage> {
    const message = this.contactMessagesData.get(id);
    if (!message) {
      throw new Error("Contact message not found");
    }
    
    const updatedMessage: ContactMessage = {
      ...message,
      status: status as "New" | "Read" | "Replied"
    };
    
    this.contactMessagesData.set(id, updatedMessage);
    return updatedMessage;
  }
}

export const storage = new MemStorage();
