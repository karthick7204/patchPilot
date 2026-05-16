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
      <div className="min-h-screen bg-[#0d0f11] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em]">Initializing Workspace...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] overflow-hidden pl-24 relative">
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
