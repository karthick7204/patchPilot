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
    <div className="min-h-screen bg-[#0d0f11] text-zinc-100 p-12 pl-32 font-sans relative overflow-hidden">
      <Sidebar />
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Issues</h1>
              <p className="text-zinc-500 font-medium">Manage and track your autonomous bug fixes.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#14171a] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all min-w-[300px]"
                />
              </div>
              <button className="p-4 bg-[#14171a] border border-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-[#14171a] border border-white/5 rounded-[2.5rem] p-40 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Scanning Workspace...</p>
            </div>
          ) : filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <motion.div 
                key={issue._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSelectedIssue(issue);
                  setIsDetailOpen(true);
                }}
                className="bg-[#14171a] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-8 flex-1 min-w-0">
                    <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center shrink-0 ${
                      issue.status === 'done' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      <FaGithub className="w-7 h-7" />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {issue.linearIssueId}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                        <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate max-w-[200px]">
                          {issue.githubLink}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {issue.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Priority</div>
                      <div className="text-sm font-black text-white">P{issue.priority || 0}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Fix Status</div>
                      <div className={`text-sm font-black uppercase tracking-tighter ${
                        issue.status === 'done' ? 'text-emerald-500' : 'text-blue-400'
                      }`}>
                        {issue.status || 'Pending'}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {issue.linearUrl && (
                        <a 
                          href={issue.linearUrl} 
                          target="_blank"
                          className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all text-zinc-400 hover:text-white"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      <button className="p-4 bg-white text-black hover:bg-zinc-200 rounded-2xl transition-all shadow-xl shadow-white/5">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-[#14171a] border border-white/5 rounded-[3rem] p-32 flex flex-col items-center text-center gap-8">
              <div className="w-24 h-24 bg-zinc-500/5 border border-white/5 rounded-[2.5rem] flex items-center justify-center">
                <Search className="w-10 h-10 text-zinc-700" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">No issues found</h3>
                <p className="text-zinc-500 font-medium max-w-sm mx-auto">
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
