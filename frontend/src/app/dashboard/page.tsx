"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Copy, 
  Check, 
  Shield, 
  ExternalLink, 
  ArrowRight,
  Settings,
  Lock,
  X,
  Rocket,
  ShieldCheck,
  Clock,
  Plus
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { updateSettings, getIssues, createIssue } from "@/api/api";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import IssueDetailModal from "@/components/IssueDetailModal";

export default function DashboardPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [githubToken, setGithubToken] = useState("");
  const [linearSecret, setLinearSecret] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingIssues, setIsLoadingIssues] = useState(true);

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Extract user ID from token for the unique webhook URL
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.id);
      } catch (e) {
        console.error("Failed to parse token", e);
      }
    }
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setIsLoadingIssues(true);
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (err) {
      console.error("Failed to fetch issues", err);
    } finally {
      setIsLoadingIssues(false);
    }
  };

  const handleQuickAdd = async () => {
    try {
      await createIssue({
        name: "Test Bug: Sidebar navigation overlap",
        description: "The sidebar overlaps with the main content on iPad Pro resolution.",
        githubLink: "https://github.com/patchpilot/core",
        priority: 2,
        status: "processing"
      });
      fetchIssues();
    } catch (err) {
      console.error("Failed to create issue", err);
    }
  };

  const WEBHOOK_URL = `https://patchpilot-backend.ngrok.app/linear/${userId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(WEBHOOK_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompleteSetup = async () => {
    setIsSubmitting(true);
    try {
      await updateSettings({ githubToken, linearSecret });
      setIsSuccess(true);
    } catch (err: any) {
      alert(err.message || "Failed to save configuration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-[#24292f] dark:text-[#c9d1d9] p-12 pl-32 font-sans relative overflow-hidden">
      <Sidebar />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-end mb-12 border-b border-[#d0d7de] dark:border-[#30363d] pb-6">
          <div>
            <h1 className="text-3xl font-normal text-[#24292f] dark:text-[#c9d1d9] mb-2 tracking-tight">Dashboard</h1>
            <p className="text-[#57606a] dark:text-[#8b949e] text-sm">Welcome back, your autonomous agent is standing by.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#f6f8fa] dark:bg-[#161b22] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] border border-[#d0d7de] dark:border-[#30363d] rounded-md text-sm font-medium text-[#24292f] dark:text-[#c9d1d9] transition-all flex items-center gap-2 shadow-sm"
          >
            <Settings className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
            Configure Agent
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Rocket, label: "Success Rate", value: "94%", color: "text-[#0969da] dark:text-[#58a6ff]" },
            { icon: Clock, label: "Avg. Fix Time", value: "8.2m", color: "text-[#8250df]" },
            { icon: ShieldCheck, label: "Security", value: "Active", color: "text-[#2da44e]" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-6 flex flex-col gap-3 shadow-sm">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div className="text-2xl font-semibold text-[#24292f] dark:text-[#c9d1d9]">{stat.value}</div>
              <div className="text-xs font-medium text-[#57606a] dark:text-[#8b949e]">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-[#24292f] dark:text-[#c9d1d9] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
                Recent Activity
              </h2>
              <Link 
                href="/issues" 
                className="text-xs font-medium text-[#0969da] dark:text-[#58a6ff] hover:underline transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={fetchIssues} className="text-xs font-medium text-[#57606a] dark:text-[#8b949e] hover:text-[#0969da] dark:text-[#58a6ff] transition-colors flex items-center gap-1.5">
                  Refresh <Clock className="w-3 h-3" />
                </button>
                <button 
                  onClick={handleQuickAdd}
                  className="px-3 py-1.5 bg-[#2da44e] dark:bg-[#238636] hover:bg-[#2c974b] dark:hover:bg-[#2ea043] border border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a] rounded-md text-xs font-semibold text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3 h-3" /> Quick Add
                </button>
            </div>
          </div>

          {isLoadingIssues ? (
            <div className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-16 flex flex-col items-center justify-center gap-4">
              <div className="w-6 h-6 border-2 border-[#d0d7de] dark:border-[#30363d] border-t-[#0969da] dark:border-t-[#58a6ff] rounded-full animate-spin" />
              <p className="text-sm font-medium text-[#57606a] dark:text-[#8b949e]">Loading issues...</p>
            </div>
          ) : issues.length > 0 ? (
            <div className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md overflow-hidden">
              <div className="bg-[#f6f8fa] dark:bg-[#161b22] border-b border-[#d0d7de] dark:border-[#30363d] px-4 py-3 flex items-center text-sm font-semibold text-[#24292f] dark:text-[#c9d1d9]">
                <div className="flex-1">Issue Overview</div>
                <div className="w-24 text-right hidden sm:block">Status</div>
                <div className="w-20 text-right hidden sm:block">Priority</div>
                <div className="w-10"></div>
              </div>
              <div className="divide-y divide-[#d0d7de]">
                {issues.map((issue) => (
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
                          <h3 className="text-[#0969da] dark:text-[#58a6ff] font-semibold truncate group-hover:underline text-[15px] leading-tight">{issue.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#57606a] dark:text-[#8b949e]">
                          <span>#{issue.linearIssueId}</span>
                          <span>opened on {new Date(issue.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 text-sm">
                      <div className="w-24 text-right hidden sm:block">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                          issue.status === 'done' ? 'bg-[#e6ffec] dark:bg-[#2ea04326] text-[#1a7f37] dark:text-[#3fb950] border-[#4ac26b]/40 dark:border-[#2ea043]' : 'bg-[#ddf4ff] dark:bg-[#388bfd26] text-[#0969da] dark:text-[#58a6ff] border-[#54aeff]/40 dark:border-[#388bfd]'
                        }`}>
                          {issue.status || 'Processing'}
                        </span>
                      </div>
                      <div className="w-20 text-right hidden sm:block text-[#57606a] dark:text-[#8b949e] font-medium">
                        P{issue.priority || 0}
                      </div>
                      <div className="w-6 text-[#57606a] dark:text-[#8b949e] group-hover:text-[#0969da] dark:text-[#58a6ff]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-20 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#57606a] dark:text-[#8b949e]" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h2 className="text-xl font-semibold text-[#24292f] dark:text-[#c9d1d9]">Ready to start patching?</h2>
                <p className="text-sm text-[#57606a] dark:text-[#8b949e] leading-relaxed">
                  No issues detected yet. Connect your GitHub repository and Linear workspace to see them here.
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-[#2da44e] dark:bg-[#238636] hover:bg-[#2c974b] dark:hover:bg-[#2ea043] text-white font-medium text-sm rounded-md transition-all border border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a] shadow-sm"
                >
                  Get Started
                </button>
                <button 
                  onClick={handleQuickAdd}
                  className="px-4 py-2 bg-[#f6f8fa] dark:bg-[#161b22] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] text-[#24292f] dark:text-[#c9d1d9] font-medium text-sm rounded-md transition-all border border-[#d0d7de] dark:border-[#30363d] shadow-sm"
                >
                  Test Quick Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] w-full max-w-xl rounded-xl shadow-xl relative z-10 overflow-hidden"
            >
              <div className="bg-[#f6f8fa] dark:bg-[#161b22] border-b border-[#d0d7de] dark:border-[#30363d] px-4 py-3 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-[#24292f] dark:text-[#c9d1d9]">Agent Configuration (Step {step}/2)</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-md text-[#57606a] dark:text-[#8b949e] hover:bg-[#ebecf0] dark:hover:bg-[#21262d] hover:text-[#24292f] dark:text-[#c9d1d9] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center text-center py-6"
                    >
                      <div className="w-16 h-16 bg-[#e6ffec] dark:bg-[#2ea04326] border border-[#4ac26b]/40 dark:border-[#2ea043] rounded-full flex items-center justify-center mb-6">
                        <Check className="w-8 h-8 text-[#1a7f37] dark:text-[#3fb950]" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-[#24292f] dark:text-[#c9d1d9] mb-2">Configuration Saved</h3>
                      <p className="text-sm text-[#57606a] dark:text-[#8b949e] max-w-sm mb-6">
                        PatchPilot is securely linked and actively monitoring your workspace.
                      </p>
                      
                      <button 
                        onClick={() => {
                          setIsModalOpen(false);
                          setTimeout(() => {
                            setIsSuccess(false);
                            setStep(1);
                          }, 500);
                        }}
                        className="w-full py-2 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] text-[#24292f] dark:text-[#c9d1d9] rounded-md font-medium text-sm transition-all"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="modal-step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <label className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9]">GitHub Access Token</label>
                          <a href="https://github.com/settings/tokens" target="_blank" className="text-xs text-[#0969da] dark:text-[#58a6ff] hover:underline flex items-center gap-1">
                            Get Token <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
                          <input 
                            type="password"
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                            placeholder="github_pat_..."
                            className="w-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md py-2 pl-9 pr-3 text-sm text-[#24292f] dark:text-[#c9d1d9] focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-all"
                          />
                        </div>
                      </div>

                      <div className="bg-[#ddf4ff] dark:bg-[#388bfd26] border border-[#54aeff]/40 dark:border-[#388bfd] rounded-md p-4 flex gap-3">
                        <Shield className="w-5 h-5 text-[#0969da] dark:text-[#58a6ff] shrink-0" />
                        <p className="text-xs text-[#24292f] dark:text-[#c9d1d9] font-medium leading-relaxed">
                          Please provide a Personal Access Token with <span className="font-semibold">repo</span> and <span className="font-semibold">workflow</span> scopes.
                        </p>
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => setStep(2)}
                          disabled={!githubToken}
                          className="w-full py-2 bg-[#2da44e] dark:bg-[#238636] hover:bg-[#2c974b] dark:hover:bg-[#2ea043] disabled:opacity-50 disabled:bg-[#94d3a2] border border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                          Next Step
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="modal-step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9]">Webhook Target URL</label>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md py-2 px-3 text-xs text-[#57606a] dark:text-[#8b949e] font-mono truncate">
                              {WEBHOOK_URL}
                            </div>
                            <button 
                              onClick={handleCopy}
                              className="px-3 bg-[#f6f8fa] dark:bg-[#161b22] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] rounded-md border border-[#d0d7de] dark:border-[#30363d] transition-all text-[#57606a] dark:text-[#8b949e]"
                            >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#24292f] dark:text-[#c9d1d9]">Linear Signing Secret</label>
                          <input 
                            type="password"
                            value={linearSecret}
                            onChange={(e) => setLinearSecret(e.target.value)}
                            placeholder="Paste secret from Linear"
                            className="w-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md py-2 px-3 text-sm text-[#24292f] dark:text-[#c9d1d9] focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button 
                          onClick={() => setStep(1)}
                          className="px-4 py-2 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] text-[#24292f] dark:text-[#c9d1d9] rounded-md font-medium text-sm transition-all"
                        >
                          Back
                        </button>
                        <button 
                          onClick={handleCompleteSetup}
                          disabled={!linearSecret || isSubmitting}
                          className="flex-1 py-2 bg-[#2da44e] dark:bg-[#238636] hover:bg-[#2c974b] dark:hover:bg-[#2ea043] disabled:opacity-50 disabled:bg-[#94d3a2] border border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a] text-white rounded-md font-medium text-sm transition-all shadow-sm"
                        >
                          {isSubmitting ? "Saving..." : "Save Configuration"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <IssueDetailModal 
        issue={selectedIssue}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
