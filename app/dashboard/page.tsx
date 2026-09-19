"use client";

import React, { useState } from "react";
import { apiFetch } from "../lib/api";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      if (!file) return;

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      formData.append(
        "jobDescription",
        jobDescription
      );

      const response = await apiFetch(
        "/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const blob = await response.blob();

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      setPdfUrl(URL.createObjectURL(blob));

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-400">
            AI ATS Resume Optimizer
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Generate ATS Optimized Resume PDF
          </h1>

          <p className="max-w-2xl text-zinc-400">
            Upload your resume and paste the job description.
            AI will generate a professional ATS-friendly
            PDF resume.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">

          {/* Left Panel */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur">

            <div className="space-y-6">

              {/* Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">
                  Resume Upload
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 px-6 py-10 transition hover:border-zinc-500 hover:bg-zinc-900">
                  <div className="space-y-2 text-center">
                    <div className="text-4xl">📄</div>

                    <p className="text-sm text-zinc-300">
                      Click to upload your resume
                    </p>

                    <p className="text-xs text-zinc-500">
                      PDF, DOC, DOCX
                    </p>

                    {file && (
                      <div className="mt-4 rounded-lg bg-zinc-800 px-3 py-2 text-xs text-zinc-300">
                        {file.name}
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      setFile(
                        e.target.files?.[0] || null
                      );
                    }}
                  />
                </label>
              </div>

              {/* JD */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">
                  Job Description
                </label>

                <textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(
                      e.target.value
                    )
                  }
                  className="h-56 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleUpload}
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-white font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Generating Resume..."
                  : "Generate ATS Resume"}
              </button>

            </div>
          </div>

          {/* Right Panel */}
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Generated Resume
                </h2>

                <p className="text-sm text-zinc-500">
                  ATS optimized PDF resume output
                </p>
              </div>

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  download="optimized-resume.pdf"
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
                >
                  Download
                </a>
              )}
            </div>

            {/* PDF Viewer */}
            <div className="h-[750px] overflow-auto bg-black p-6">

              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  title="Optimized Resume"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-600">
                  Your generated PDF resume will appear here
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Page;