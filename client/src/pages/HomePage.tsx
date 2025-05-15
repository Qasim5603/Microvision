import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import DashboardPreview from "@/components/home/DashboardPreview";
import EducationalResources from "@/components/home/EducationalResources";
import ContactSection from "@/components/home/ContactSection";
import { Helmet } from 'react-helmet';

export default function HomePage() {
  return (
    <MainLayout>
      <Helmet>
        <title>MicroVision - AI-Powered Histopathology Analysis Platform</title>
        <meta name="description" content="MicroVision delivers cutting-edge artificial intelligence for fast, accurate analysis of histopathology slides, helping pathologists and clinicians make better diagnostic decisions." />
        <meta property="og:title" content="MicroVision - AI-Powered Histopathology Analysis" />
        <meta property="og:description" content="Advanced AI solutions for histopathology analysis, empowering healthcare professionals with accurate diagnostic tools." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Hero />
      <Services />
      <HowItWorks />
      <DashboardPreview />
      <EducationalResources />
      <ContactSection />
    </MainLayout>
  );
}
