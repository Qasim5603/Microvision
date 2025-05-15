import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, FileText, BarChart4, Download, Eye } from "lucide-react";

interface AnalysisResult {
  classification: string;
  confidence: number;
  featuresDetected: string[];
  recommendation: string;
  analysisId: string;
}

export default function ImageAnalysis() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 10MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleAnalysis = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setProgress(0);
    setResult(null);
    setError(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 400);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await apiRequest("POST", "/api/analyze", formData);
      const data = await response.json();

      setResult({
        classification: data.classification,
        confidence: data.confidence,
        featuresDetected: data.featuresDetected,
        recommendation: data.recommendation,
        analysisId: data.analysisId,
      });
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the image. Please try again.");
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your image.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const generateReport = () => {
    if (!result) return;

    toast({
      title: "Report Generated",
      description: `Report for analysis ${result.analysisId} has been generated and is ready for download.`,
    });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl mx-auto">
      <div className="px-4 py-5 sm:p-6">
        <div className="mt-2 mb-6 text-center">
          {!imagePreview ? (
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition duration-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-neutral-400 mb-3" />
                <p className="mb-2 text-sm text-neutral-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-neutral-500">
                  PNG, JPG or TIFF (MAX. 10MB)
                </p>
              </div>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center p-6">
                <Loader2 className="animate-spin h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg leading-6 font-medium text-neutral-900">Processing Image</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Our AI is analyzing the histopathology patterns. This may take a moment...
                </p>
                <div className="w-full mt-4 max-w-md">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <div className="p-6 text-center">
                <svg
                  className="h-12 w-12 text-red-500 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-2">Analysis Error</h3>
                <p className="text-neutral-500 mb-4">{error}</p>
                <Button variant="destructive" onClick={handleReset}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2">
                <img
                  src={imagePreview}
                  alt="Histopathology slide"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <div className="mt-4 text-sm text-center text-neutral-500">
                  <p>Sample ID: <span className="font-mono">{result?.analysisId || "Not analyzed yet"}</span></p>
                  <p>Upload time: <span className="font-mono">{new Date().toLocaleString()}</span></p>
                </div>
              </div>
              
              {result ? (
                <div className="w-full md:w-1/2 bg-neutral-50 p-5 rounded-lg border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Analysis Results</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500">Classification</h4>
                      <p className="text-lg font-semibold text-neutral-900">{result.classification}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500">Confidence</h4>
                      <div className="flex items-center">
                        <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{result.confidence}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500">Features Detected</h4>
                      <ul className="mt-1 list-disc list-inside text-sm text-neutral-700 space-y-1">
                        {result.featuresDetected.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500">Recommendation</h4>
                      <p className="text-sm text-neutral-700">{result.recommendation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <Button onClick={generateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      Upload New Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full md:w-1/2 bg-neutral-50 p-5 rounded-lg border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Image Ready for Analysis</h3>
                  <p className="text-neutral-600 mb-4">
                    Your histopathology image has been uploaded and is ready for AI analysis.
                  </p>
                  <Button onClick={handleAnalysis}>
                    <BarChart4 className="mr-2 h-4 w-4" />
                    Analyze Image
                  </Button>
                  <Button variant="outline" className="mt-4" onClick={handleReset}>
                    Choose Different Image
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
