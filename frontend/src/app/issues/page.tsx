"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ArrowRight, 
  Clock, 
  ExternalLink, 
  ChevronLeft, 
  Search, 
  Filter 
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { getIssues } from "@/api/api";
import Sidebar from "@/components/Sidebar";
import IssueDetailModal from "@/components/IssueDetailModal";

export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (err) {
      console.error("Failed to fetch issues", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredIssues = issues.filter(issue => 
    issue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.linearIssueId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-[#24292f] dark:text-[#c9d1d9] p-12 pl-32 font-sans relative overflow-hidden">
      <Sidebar />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-8 border-b border-[#d0d7de] dark:border-[#30363d] pb-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-semibold text-[#24292f] dark:text-[#c9d1d9] mb-2 tracking-tight">Issues</h1>
              <p className="text-[#57606a] dark:text-[#8b949e] text-sm">Manage and track your autonomous bug fixes.</p>
            </div>
            
            <div className="flex gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
                <input 
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md py-2 pl-9 pr-4 text-sm text-[#24292f] dark:text-[#c9d1d9] focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-all min-w-[260px]"
                />
              </div>
              <button className="px-3 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md text-[#24292f] dark:text-[#c9d1d9] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] transition-all shadow-sm flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-24 flex flex-col items-center justify-center gap-4">
              <div className="w-6 h-6 border-2 border-[#d0d7de] dark:border-[#30363d] border-t-[#0969da] dark:border-t-[#58a6ff] rounded-full animate-spin" />
              <p className="text-sm font-medium text-[#57606a] dark:text-[#8b949e]">Scanning workspace...</p>
            </div>
          ) : filteredIssues.length > 0 ? (
            <div className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md overflow-hidden">
              <div className="bg-[#f6f8fa] dark:bg-[#161b22] border-b border-[#d0d7de] dark:border-[#30363d] px-4 py-3 flex items-center text-sm font-semibold text-[#24292f] dark:text-[#c9d1d9]">
                <div className="flex-1">Issue Details</div>
                <div className="w-24 text-right hidden sm:block">Status</div>
                <div className="w-20 text-right hidden sm:block">Priority</div>
                <div className="w-24"></div>
              </div>
              <div className="divide-y divide-[#d0d7de]">
                {filteredIssues.map((issue) => (
                  <motion.div 
                    key={issue._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                      setSelectedIssue(issue);
                      setIsDetailOpen(true);
                    }}
                    className="p-4 hover:bg-[#f6f8fa] dark:bg-[#161b22] transition-colors cursor-pointer group flex items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        issue.status === 'done' ? 'bg-[#e6ffec] dark:bg-[#2ea04326] text-[#1a7f37] dark:text-[#3fb950]' : 'bg-[#ddf4ff] dark:bg-[#388bfd26] text-[#0969da] dark:text-[#58a6ff]'
                      }`}>
                        <FaGithub className="w-4 h-4" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <h3 className="text-[#0969da] dark:text-[#58a6ff] font-semibold truncate group-hover:underline text-[15px] leading-tight">
                            {issue.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#57606a] dark:text-[#8b949e]">
                          <span>#{issue.linearIssueId}</span>
                          <span>opened on {new Date(issue.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="truncate max-w-[200px]">{issue.githubLink}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 text-sm">
                      <div className="w-24 text-right hidden sm:block">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                          issue.status === 'done' ? 'bg-[#e6ffec] dark:bg-[#2ea04326] text-[#1a7f37] dark:text-[#3fb950] border-[#4ac26b]/40 dark:border-[#2ea043]' : 'bg-[#ddf4ff] dark:bg-[#388bfd26] text-[#0969da] dark:text-[#58a6ff] border-[#54aeff]/40 dark:border-[#388bfd]'
                        }`}>
                          {issue.status || 'Pending'}
                        </span>
                      </div>
                      
                      <div className="w-20 text-right hidden sm:block text-[#57606a] dark:text-[#8b949e] font-medium">
                        P{issue.priority || 0}
                      </div>

                      <div className="w-24 flex justify-end gap-2 text-[#57606a] dark:text-[#8b949e]">
                        {issue.linearUrl && (
                          <a 
                            href={issue.linearUrl} 
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] rounded-md transition-all text-[#57606a] dark:text-[#8b949e] hover:text-[#0969da] dark:text-[#58a6ff]"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button className="p-1.5 text-[#57606a] dark:text-[#8b949e] group-hover:text-[#0969da] dark:text-[#58a6ff]">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-20 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-[#57606a] dark:text-[#8b949e]" />
              </div>
              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-xl font-semibold text-[#24292f] dark:text-[#c9d1d9]">No issues found</h3>
                <p className="text-sm text-[#57606a] dark:text-[#8b949e] leading-relaxed">
                  We couldn't find any issues matching your search criteria or in your account history.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <IssueDetailModal 
        issue={selectedIssue}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
