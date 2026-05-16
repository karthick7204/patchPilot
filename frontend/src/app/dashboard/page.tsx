"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
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
  Clock
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { updateSettings } from "@/api/api";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [githubToken, setGithubToken] = useState("");
  const [linearSecret, setLinearSecret] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const WEBHOOK_URL = "https://patchpilot-backend.ngrok.app/linear";

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
    <div className="min-h-screen bg-[#0d0f11] text-zinc-100 p-12 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Dashboard</h1>
            <p className="text-zinc-500 font-medium">Welcome back, your autonomous agent is standing by.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3 group"
          >
            <Settings className="w-4 h-4 text-zinc-400 group-hover:rotate-90 transition-transform duration-500" />
            Configure Agent
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Rocket, label: "Success Rate", value: "94%", color: "text-blue-400" },
            { icon: Clock, label: "Avg. Fix Time", value: "8.2m", color: "text-indigo-400" },
            { icon: ShieldCheck, label: "Security", value: "Active", color: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#14171a] border border-white/5 rounded-3xl p-8 flex flex-col gap-4">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Empty State / Get Started */}
        <div className="bg-[#14171a] border border-white/5 rounded-[3rem] p-20 flex flex-col items-center text-center gap-8 shadow-2xl">
          <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-center justify-center animate-pulse">
            <Zap className="w-10 h-10 text-blue-500" />
          </div>
          <div className="space-y-4 max-w-lg">
            <h2 className="text-3xl font-bold text-white tracking-tight">Ready to start patching?</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Connect your GitHub repository and Linear workspace to allow PatchPilot to automatically identify and resolve bugs in your codebase.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm tracking-widest uppercase rounded-3xl transition-all shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Setup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#14171a] border border-white/10 w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-zinc-500 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className={`p-3 rounded-2xl ${step === 1 ? 'bg-blue-500/10 text-blue-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Agent Configuration</h3>
                    <p className="text-xs text-zinc-500 font-medium tracking-wide">STEP {step} OF 2</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success-state"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-10"
                    >
                      <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mb-8 relative">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                        >
                          <Check className="w-10 h-10 text-emerald-500" />
                        </motion.div>
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 border-2 border-emerald-500/30 rounded-[2.5rem]"
                        />
                      </div>
                      
                      <h3 className="text-3xl font-black text-white mb-4 tracking-tight">System Online</h3>
                      <p className="text-zinc-500 font-medium max-w-xs mb-10">
                        PatchPilot has been successfully configured and is now monitoring your workspace.
                      </p>
                      
                      <button 
                        onClick={() => {
                          setIsModalOpen(false);
                          setTimeout(() => {
                            setIsSuccess(false);
                            setStep(1);
                          }, 500);
                        }}
                        className="w-full py-5 bg-white text-black rounded-3xl font-black text-xs tracking-widest uppercase transition-all hover:bg-zinc-200 active:scale-95"
                      >
                        Enter Workspace
                      </button>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="modal-step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">GitHub Access Token</label>
                          <a href="https://github.com/settings/tokens" target="_blank" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 font-bold uppercase tracking-widest">
                            Get Token <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                          <input 
                            type="password"
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                            placeholder="github_pat_..."
                            className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 pl-14 pr-5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex gap-4">
                        <Shield className="w-6 h-6 text-emerald-500 shrink-0" />
                        <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                          We recommend a Personal Access Token with <span className="text-zinc-300 italic">repo</span> and <span className="text-zinc-300 italic">workflow</span> scopes.
                        </p>
                      </div>

                      <button 
                        onClick={() => setStep(2)}
                        disabled={!githubToken}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-3xl font-black text-xs tracking-widest uppercase transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                      >
                        Continue to Linear <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="modal-step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Webhook Target URL</label>
                          <div className="flex gap-3">
                            <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl py-4 px-5 text-xs text-zinc-400 font-mono truncate">
                              {WEBHOOK_URL}
                            </div>
                            <button 
                              onClick={handleCopy}
                              className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all text-blue-500"
                            >
                              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Linear Signing Secret</label>
                          <input 
                            type="password"
                            value={linearSecret}
                            onChange={(e) => setLinearSecret(e.target.value)}
                            placeholder="Paste secret from Linear"
                            className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 px-6 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => setStep(1)}
                          className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-zinc-400 rounded-3xl font-black text-xs tracking-widest uppercase transition-all"
                        >
                          Back
                        </button>
                        <button 
                          onClick={handleCompleteSetup}
                          disabled={!linearSecret || isSubmitting}
                          className="flex-[2] py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-3xl font-black text-xs tracking-widest uppercase transition-all shadow-xl shadow-indigo-500/20"
                        >
                          {isSubmitting ? "Saving..." : "Finish Configuration"}
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
    </div>
  );
}
