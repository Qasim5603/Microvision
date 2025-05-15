import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["patient", "pathologist", "admin"] }).notNull().default("patient"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  password: true,
  role: true,
  profileImage: true,
});

// Analyses table - for storing histopathology analysis results
export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => users.id),
  pathologistId: integer("pathologist_id").references(() => users.id),
  sampleId: text("sample_id").notNull().unique(),
  type: text("type").notNull(), // e.g., "Skin Biopsy", "Liver Biopsy"
  status: text("status", { enum: ["Awaiting Review", "Under Review", "Completed"] }).notNull().default("Awaiting Review"),
  imageUrl: text("image_url").notNull(),
  aiPrediction: text("ai_prediction"),
  confidence: integer("confidence"),
  features: jsonb("features"),
  recommendation: text("recommendation"),
  reportUrl: text("report_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).pick({
  patientId: true,
  pathologistId: true,
  sampleId: true,
  type: true,
  status: true,
  imageUrl: true,
  aiPrediction: true,
  confidence: true,
  features: true,
  recommendation: true,
  reportUrl: true,
  notes: true,
});

// Appointments table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => users.id),
  doctorId: integer("doctor_id").notNull().references(() => users.id),
  date: text("date").notNull(),
  time: text("time").notNull(),
  type: text("type").notNull(), // e.g., "Consultation", "Follow-up"
  status: text("status", { enum: ["Scheduled", "Completed", "Cancelled", "In Progress"] }).notNull().default("Scheduled"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  patientId: true,
  doctorId: true,
  date: true,
  time: true,
  type: true,
  status: true,
  notes: true,
});

// Video sessions table
export const videoSessions = pgTable("video_sessions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  scheduledTime: timestamp("scheduled_time").notNull(),
  participantIds: jsonb("participant_ids").notNull(),
  status: text("status", { enum: ["Scheduled", "In Progress", "Completed", "Cancelled"] }).notNull().default("Scheduled"),
  caseId: text("case_id"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertVideoSessionSchema = createInsertSchema(videoSessions).pick({
  title: true,
  scheduledTime: true,
  participantIds: true,
  status: true,
  caseId: true,
  notes: true,
});

// Educational resources
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category", { enum: ["guides", "articles", "webinars", "videos"] }).notNull(),
  image: text("image"),
  content: text("content"),
  tags: jsonb("tags").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  category: true,
  image: true,
  content: true,
  tags: true,
  date: true,
  authorId: true,
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status", { enum: ["New", "Read", "Replied"] }).notNull().default("New"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Define types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

export type VideoSession = typeof videoSessions.$inferSelect;
export type InsertVideoSession = z.infer<typeof insertVideoSessionSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
