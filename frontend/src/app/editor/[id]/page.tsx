"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PatchEditor from "@/components/PatchEditor";
import { getIssues } from "@/api/api";
import Sidebar from "@/components/Sidebar";

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [issue, setIssue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const issues = await getIssues();
        const found = issues.find((i: any) => i._id === params.id);
        if (found) {
          setIssue(found);
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Failed to fetch issue for editor", err);
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchIssueDetails();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1117] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0969da]/20 dark:border-[#58a6ff]/20 border-t-[#0969da] dark:border-t-[#58a6ff] rounded-full animate-spin" />
        <p className="text-sm font-bold text-[#57606a] dark:text-[#8b949e] uppercase tracking-[0.2em]">Initializing Workspace...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white dark:bg-[#0d1117] overflow-hidden pl-24 relative">
      <Sidebar />
      <PatchEditor 
        isOpen={true} 
        onClose={() => router.back()} 
        issue={issue}
        isFullScreen={true}
      />
    </div>
  );
}
