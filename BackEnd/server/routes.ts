import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertAnalysisSchema, 
  insertAppointmentSchema, 
  insertVideoSessionSchema, 
  insertResourceSchema, 
  insertContactMessageSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // ==================== AUTH ROUTES ====================
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, you'd use bcrypt to compare passwords
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set user in session (without password)
      const { password: _, ...userWithoutPassword } = user;
      req.session.user = userWithoutPassword;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists with this email" });
      }
      
      // Create new user
      const newUser = await storage.createUser(validatedData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;
      
      // Set user in session
      req.session.user = userWithoutPassword;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
  // Get current user
  app.get("/api/auth/me", (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    return res.status(200).json(req.session.user);
  });
  
  // ==================== ANALYSIS ROUTES ====================
  
  // Upload and analyze image
  app.post("/api/analyze", async (req, res) => {
    try {
      // In a real app, you'd handle file upload here
      // For our demo, we'll simulate the analysis
      
      const sampleId = `HST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Mock analysis result
      const analysisResult = {
        classification: "Adenocarcinoma",
        confidence: 92.7,
        featuresDetected: [
          "Abnormal cell proliferation",
          "Cellular dysplasia",
          "Irregular nuclear morphology",
          "Altered tissue architecture"
        ],
        recommendation: "The image shows features consistent with moderately differentiated adenocarcinoma. Recommend pathologist review for confirmation.",
        analysisId: sampleId
      };
      
      return res.status(200).json(analysisResult);
    } catch (error) {
      console.error("Analysis error:", error);
      return res.status(500).json({ message: "Error processing image" });
    }
  });
  
  // Get analysis history for a patient
  app.get("/api/patient/analysis-history", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { id, role } = req.session.user;
      
      if (role !== "patient" && role !== "pathologist" && role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      // For patients, get only their own analyses
      if (role === "patient") {
        const analyses = await storage.getAnalysesByPatientId(id);
        return res.status(200).json(analyses);
      }
      
      // For pathologists and admins, they might see all analyses or a filtered subset
      const analyses = await storage.getAllAnalyses();
      return res.status(200).json(analyses);
    } catch (error) {
      console.error("Error fetching analysis history:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ==================== APPOINTMENTS ROUTES ====================
  
  // Create appointment
  app.post("/api/appointments", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const validatedData = insertAppointmentSchema.parse(req.body);
      
      // Add validation to ensure patients can only create appointments for themselves
      if (req.session.user.role === "patient" && validatedData.patientId !== req.session.user.id) {
        return res.status(403).json({ message: "You can only create appointments for yourself" });
      }
      
      const appointment = await storage.createAppointment(validatedData);
      return res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      
      console.error("Appointment creation error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get appointments for user
  app.get("/api/appointments", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { id, role } = req.session.user;
      
      // For patients, get only their appointments
      if (role === "patient") {
        const appointments = await storage.getAppointmentsByPatientId(id);
        return res.status(200).json(appointments);
      }
      
      // For pathologists, get appointments where they are the doctor
      if (role === "pathologist") {
        const appointments = await storage.getAppointmentsByDoctorId(id);
        return res.status(200).json(appointments);
      }
      
      // For admins, get all appointments
      if (role === "admin") {
        const appointments = await storage.getAllAppointments();
        return res.status(200).json(appointments);
      }
      
      return res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update appointment status
  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const appointmentId = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      // Only allow valid status values
      if (!["Scheduled", "Completed", "Cancelled", "In Progress"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const appointment = await storage.getAppointmentById(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      // Validate permissions (patients can only cancel their own appointments, etc.)
      const { id, role } = req.session.user;
      
      if (role === "patient" && appointment.patientId !== id) {
        return res.status(403).json({ message: "You can only modify your own appointments" });
      }
      
      if (role === "pathologist" && appointment.doctorId !== id) {
        return res.status(403).json({ message: "You can only modify appointments where you are the doctor" });
      }
      
      const updatedAppointment = await storage.updateAppointmentStatus(appointmentId, status);
      return res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error("Error updating appointment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ==================== VIDEO CONSULTATION ROUTES ====================
  
  // Get video sessions
  app.get("/api/video-consultation/sessions", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { id, role } = req.session.user;
      
      // Get sessions filtered based on user role and ID
      const sessions = await storage.getVideoSessionsByParticipantId(id);
      
      // Enhance sessions with participant information
      const enhancedSessions = await Promise.all(sessions.map(async (session) => {
        const participantIds = session.participantIds as number[];
        
        // Skip the current user
        const otherParticipantIds = participantIds.filter(pid => pid !== id);
        
        const otherParticipants = await Promise.all(
          otherParticipantIds.map(async (pid) => {
            const user = await storage.getUser(pid);
            return {
              id: pid.toString(),
              name: user?.name || "Unknown User",
              role: user?.role || "unknown"
            };
          })
        );
        
        return {
          ...session,
          participantName: req.session.user.name,
          otherParticipants
        };
      }));
      
      return res.status(200).json(enhancedSessions);
    } catch (error) {
      console.error("Error fetching video sessions:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create video session
  app.post("/api/video-consultation/sessions", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const validatedData = insertVideoSessionSchema.parse(req.body);
      
      // Ensure current user is included in participants
      const participantIds = validatedData.participantIds as number[];
      if (!participantIds.includes(req.session.user.id)) {
        return res.status(400).json({ message: "You must be included as a participant" });
      }
      
      const session = await storage.createVideoSession(validatedData);
      return res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      
      console.error("Video session creation error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ==================== RESOURCES ROUTES ====================
  
  // Get educational resources
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getAllResources();
      return res.status(200).json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get resource by ID
  app.get("/api/resources/:id", async (req, res) => {
    try {
      const resourceId = parseInt(req.params.id);
      const resource = await storage.getResourceById(resourceId);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      return res.status(200).json(resource);
    } catch (error) {
      console.error("Error fetching resource:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ==================== CONTACT ROUTES ====================
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      return res.status(201).json({ message: "Contact message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      
      console.error("Contact form submission error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ==================== DASHBOARD ROUTES ====================
  
  // Get patient dashboard data
  app.get("/api/patient/dashboard", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (req.session.user.role !== "patient") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const patientId = req.session.user.id;
      
      // Get relevant data for patient dashboard
      const appointments = await storage.getAppointmentsByPatientId(patientId);
      const analyses = await storage.getAnalysesByPatientId(patientId);
      const videoSessions = await storage.getVideoSessionsByParticipantId(patientId);
      
      // Format and return dashboard data
      return res.status(200).json({
        upcomingAppointments: appointments.filter(a => a.status === "Scheduled").slice(0, 3),
        recentAnalyses: analyses.slice(0, 5),
        upcomingVideoSessions: videoSessions.filter(vs => vs.status === "Scheduled").slice(0, 3),
      });
    } catch (error) {
      console.error("Error fetching patient dashboard:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get pathologist dashboard data
  app.get("/api/pathologist/dashboard", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (req.session.user.role !== "pathologist") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const pathologistId = req.session.user.id;
      
      // Get relevant data for pathologist dashboard
      const appointments = await storage.getAppointmentsByDoctorId(pathologistId);
      const analyses = await storage.getAnalysesByPathologistId(pathologistId);
      const pendingAnalyses = await storage.getPendingAnalyses();
      const videoSessions = await storage.getVideoSessionsByParticipantId(pathologistId);
      
      // Format and return dashboard data
      return res.status(200).json({
        upcomingAppointments: appointments.filter(a => a.status === "Scheduled").slice(0, 3),
        pendingReviews: pendingAnalyses.slice(0, 10),
        completedToday: analyses.filter(a => {
          const today = new Date();
          const analysisDate = new Date(a.updatedAt);
          return (
            a.status === "Completed" && 
            analysisDate.getDate() === today.getDate() &&
            analysisDate.getMonth() === today.getMonth() &&
            analysisDate.getFullYear() === today.getFullYear()
          );
        }).length,
        upcomingVideoSessions: videoSessions.filter(vs => vs.status === "Scheduled").slice(0, 3),
        aiPerformance: {
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
        }
      });
    } catch (error) {
      console.error("Error fetching pathologist dashboard:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get admin dashboard data
  app.get("/api/admin/dashboard", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      // Get relevant data for admin dashboard
      const allUsers = await storage.getAllUsers();
      const allAnalyses = await storage.getAllAnalyses();
      const allAppointments = await storage.getAllAppointments();
      
      // Get counts by role
      const patientCount = allUsers.filter(u => u.role === "patient").length;
      const pathologistCount = allUsers.filter(u => u.role === "pathologist").length;
      const adminCount = allUsers.filter(u => u.role === "admin").length;
      
      // Format and return dashboard data
      return res.status(200).json({
        userStats: {
          total: allUsers.length,
          patients: patientCount,
          pathologists: pathologistCount,
          admins: adminCount
        },
        analysisStats: {
          total: allAnalyses.length,
          pending: allAnalyses.filter(a => a.status !== "Completed").length,
          completed: allAnalyses.filter(a => a.status === "Completed").length,
          aiAccuracy: "92.3%"
        },
        appointmentStats: {
          total: allAppointments.length,
          scheduled: allAppointments.filter(a => a.status === "Scheduled").length,
          completed: allAppointments.filter(a => a.status === "Completed").length,
          cancelled: allAppointments.filter(a => a.status === "Cancelled").length
        },
        systemHealth: {
          serverStatus: "Operational",
          apiHealth: "All endpoints online",
          resources: [
            { name: "CPU", usage: 42 },
            { name: "Memory", usage: 64 },
            { name: "Storage", usage: 38 }
          ]
        }
      });
    } catch (error) {
      console.error("Error fetching admin dashboard:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get system activity for admin dashboard
  app.get("/api/admin/system-activity", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      // In a real app, you would log and retrieve actual system activity
      // For this prototype, we'll return mock data
      const systemActivity = [
        {
          id: "1",
          user: "Dr. Emily Chen",
          role: "Pathologist",
          activity: "Case review completed",
          status: "Success",
          time: "10:25 AM"
        },
        {
          id: "2",
          user: "James Wilson",
          role: "Patient",
          activity: "New case uploaded",
          status: "Success",
          time: "10:12 AM"
        },
        {
          id: "3",
          user: "System",
          role: "AI",
          activity: "Model retraining",
          status: "In Progress",
          time: "09:30 AM"
        }
      ];
      
      return res.status(200).json(systemActivity);
    } catch (error) {
      console.error("Error fetching system activity:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
