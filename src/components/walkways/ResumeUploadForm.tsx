"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import type { GeneratedRoadmap } from "@/types/roadmap";

interface ResumeUploadFormProps {
  onRoadmapGenerated: (roadmap: GeneratedRoadmap) => void;
}

export function ResumeUploadForm({ onRoadmapGenerated }: ResumeUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [userGaps, setUserGaps] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<"parsing" | "generating" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload your resume PDF first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Parse PDF
      setLoadingStep("parsing");
      const formData = new FormData();
      formData.append("resume", file);

      const parseRes = await fetch("/api/parsePdf", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) {
        const errorData = await parseRes.json();
        throw new Error(errorData.error || "Failed to read text from your PDF. Please ensure it's a text-based PDF.");
      }

      const { text: resumeText } = await parseRes.json();

      // Step 2: Generate Roadmap
      setLoadingStep("generating");
      const generateRes = await fetch("/api/generateRoadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, userGaps }),
      });

      if (!generateRes.ok) {
        throw new Error("Failed to generate roadmap. Please try again in a moment.");
      }

      const roadmapData: GeneratedRoadmap = await generateRes.json();
      
      // Lift state up
      onRoadmapGenerated(roadmapData);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      setLoadingStep(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: "var(--color-bg)", paddingTop: 68 }}>
      <div className="w-full max-w-2xl text-center mb-10 animate-fadeUp">
        <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--color-navy)", lineHeight: 1.2 }}>
          Build Your Skill Roadmap
        </h1>
        <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, color: "var(--color-gray-text)", lineHeight: 1.6 }}>
          Upload your resume. Tell us what you lack. We'll map out exactly how to get you from here to professional-grade skills.
        </p>
      </div>

      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-sm border animate-fadeUp" style={{ borderColor: "var(--color-border)", animationDelay: "100ms" }}>
        
        {/* Upload Zone */}
        <div className="mb-8">
          <label 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
            style={{ borderColor: file ? "var(--color-accent)" : "var(--color-border)" }}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <span className="text-3xl mb-2">📄</span>
              {file ? (
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 500, color: "var(--color-accent)" }}>
                  {file.name}
                </p>
              ) : (
                <>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 500, color: "var(--color-navy-mid)" }}>
                    Drop your resume PDF here or click to browse
                  </p>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--color-gray-light)", marginTop: 4 }}>
                    Max 5MB. Must be a text-selectable PDF.
                  </p>
                </>
              )}
            </div>
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} disabled={loading} />
          </label>
        </div>

        {/* Gaps Textarea */}
        <div className="mb-8">
          <label className="block mb-2" style={{ fontFamily: "Sora, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--color-navy)" }}>
            What skills or tech do you feel you lack?
          </label>
          <Textarea 
            placeholder="e.g. 'I'm weak in TypeScript, Docker, and system design. I've never done testing.'"
            className="resize-none h-24"
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14 }}
            value={userGaps}
            onChange={(e) => setUserGaps(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 border border-red-200" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, color: "var(--color-navy)" }}>
                {loadingStep === "parsing" ? "⟳ Step 1/2: Reading your resume..." : "⟳ Step 2/2: Building your personalized roadmap (this may take 15-30s)..."}
              </span>
            </div>
            <Progress value={loadingStep === "parsing" ? 30 : 80} className="h-2 transition-all duration-500" />
          </div>
        )}

        {/* Submit Button */}
        <Button 
          className="w-full h-12 text-lg"
          style={{ fontFamily: "Sora, sans-serif", backgroundColor: "var(--color-accent)", color: "#fff" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate My Roadmap →"}
        </Button>

      </div>

      <p className="mt-8 text-center animate-fadeUp" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--color-gray-light)", animationDelay: "200ms" }}>
        No account needed. Your resume stays in your browser.
      </p>
    </div>
  );
}
