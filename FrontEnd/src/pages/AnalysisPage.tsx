import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ImageAnalysis from "@/components/analysis/ImageAnalysis";
import { Helmet } from 'react-helmet';

export default function AnalysisPage() {
  return (
    <MainLayout>
      <Helmet>
        <title>Histopathology Analysis - MicroVision</title>
        <meta name="description" content="Upload histopathology slide images for instant AI-powered analysis with MicroVision's advanced machine learning algorithms." />
        <meta property="og:title" content="Histopathology Analysis - MicroVision" />
        <meta property="og:description" content="Get instant AI-powered analysis of histopathology slides with our cutting-edge technology." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="py-16 px-4 md:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">AI Histopathology Analysis</h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Upload a histopathology slide image for instant AI-powered analysis and detection.
            </p>
          </div>
          
          <ImageAnalysis />
          
          <div className="mt-12 text-center">
            <p className="text-sm text-neutral-500 max-w-2xl mx-auto">
              Note: This demonstration uses our AI for preliminary analysis only. Final diagnostic decisions should always be made by qualified pathologists. For clinical use, please register for a full account.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
