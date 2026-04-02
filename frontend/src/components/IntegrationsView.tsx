"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import {
  History,
  Database,
  ShieldCheck,
  Lock,
  Code2,
  Eye,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  LayoutDashboard,
  Zap,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const activityLogs = [
  { 
    title: "GitHub connected", 
    meta: "ORGANIZATION: PATCH-PILOT-DEV", 
    time: "2023-10-24 14:22:11", 
    status: "SUCCESS", 
    color: "text-emerald-400",
    icon: FaGithub
  },
  { 
    title: "Webhook received from Linear", 
    meta: "EVENT: ISSUE.LABELED (BUG-FIX)", 
    time: "2023-10-24 15:45:02", 
    status: "PROCESSING", 
    color: "text-indigo-400",
    icon: Zap
  },
  { 
    title: "Auth failed attempt", 
    meta: "IP: 192.168.1.1 (RATE LIMITED)", 
    time: "2023-10-24 16:10:55", 
    status: "BLOCKED", 
    color: "text-rose-400",
    icon: AlertCircle
  },
  { 
    title: "System Scan Completed", 
    meta: "FOUND 12 ACTIVE INTEGRATIONS", 
    time: "2023-10-24 17:00:00", 
    status: "INFO", 
    color: "text-blue-400",
    icon: Activity
  }
];

export function IntegrationsView() {
  return (
    <div className="flex-1 px-12 pt-10 pb-20 overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl font-black text-white tracking-tight">Integrations</h1>
          <p className="text-zinc-500 font-medium text-lg leading-relaxed">
            Connect your tools to automate bug fixing
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">2 Connected</span>
           </div>
           <div className="px-4 py-2 bg-zinc-800/40 border border-white/5 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">1 Not Connected</span>
           </div>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-12">
        {/* GitHub Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#14171a] rounded-[2.5rem] border border-white/5 p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
             <FaGithub className="w-32 h-32" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1a1c1e] border border-white/10 flex items-center justify-center text-white">
               <FaGithub className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-1">GitHub</h2>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                 <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Connected</span>
              </div>
            </div>
          </div>

          <p className="text-zinc-400 leading-relaxed font-medium">
            Connect your GitHub repository to allow Patch Pilot to clone, analyze, and fix code automatically through pull requests.
          </p>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] block">Personal Access Token</label>
            <div className="relative">
              <input 
                type="password" 
                value="........................" 
                readOnly
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-zinc-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors cursor-pointer p-2">
                 <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button className="flex-1 h-14 bg-blue-500 text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-3">
               <Activity className="w-4 h-4" />
               Test Connection
            </button>
            <button className="flex-1 h-14 bg-[#1a1c1e] border border-white/5 text-zinc-500 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-white/5 hover:text-white transition-all active:scale-95 cursor-pointer">
               Disconnect
            </button>
          </div>
        </motion.div>

        {/* Linear Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#14171a] rounded-[2.5rem] border border-white/5 p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Zap className="w-32 h-32" />
          </div>

          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white border border-white/10 flex items-center justify-center text-black">
               <Zap className="w-8 h-8 fill-current text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Linear</h2>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                 <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Listening</span>
              </div>
            </div>
          </div>

          <p className="text-zinc-400 leading-relaxed font-medium">
            Receive issue events from Linear to trigger automated fixes. Patch Pilot will monitor specific labels to start work.
          </p>

          <div className="space-y-4">
            <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                 <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Webhook URL</label>
                 <Copy className="w-4 h-4 text-zinc-600 cursor-pointer hover:text-white transition-colors" />
              </div>
              <div className="bg-[#0b0d0f] rounded-xl px-4 py-3 text-xs font-mono text-zinc-400 break-all select-all cursor-text">
                https://api.patchpilot.com/webhooks/v1/linear/6871-92ac-7123
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] block">API Key</label>
                <input 
                  type="password" 
                  value="lin_api_..." 
                  readOnly
                  className="w-full bg-[#0b0d0f] border border-white/5 rounded-2xl py-4 px-6 text-zinc-400 font-mono text-xs focus:outline-none"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] block">Team ID</label>
                <input 
                  type="text" 
                  value="ORG_123" 
                  readOnly
                  className="w-full bg-[#0b0d0f] border border-white/5 rounded-2xl py-4 px-6 text-zinc-400 font-mono text-xs focus:outline-none placeholder:text-zinc-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button className="flex-1 h-14 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 cursor-pointer">
               Validate Webhook
            </button>
            <button className="flex-1 h-14 bg-[#1a1c1e] border border-white/5 text-zinc-500 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-white/5 hover:text-white transition-all active:scale-95 cursor-pointer">
               Reconnect
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 italic text-center font-mono tracking-tight">Go to Linear → Settings → API → Webhooks and paste the URL above.</p>
        </motion.div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,2fr] gap-8">
        {/* Security Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#14171a]/40 rounded-[2.5rem] border border-white/5 p-10 flex flex-col gap-10"
        >
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-6 h-6 text-emerald-500" />
             <h3 className="text-xl font-bold text-white tracking-tight">Security</h3>
          </div>

          <div className="space-y-8">
             {[
               { icon: Lock, title: "Tokens are encrypted", desc: "AES-256 encryption at rest for all integration secrets." },
               { icon: Code2, title: "No code modified without approval", desc: "Patch Pilot only creates PRs. It never pushes to main." },
               { icon: Eye, title: "Read/write transparency", desc: "Full audit logs for every API call and repository action." },
             ].map((item) => (
                <div key={item.title} className="flex gap-5">
                   <div className="mt-1 p-2 bg-white/5 rounded-xl text-zinc-400">
                      <item.icon className="w-5 h-5" />
                   </div>
                   <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-zinc-200">{item.title}</h4>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
             ))}
          </div>
        </motion.div>

        {/* Activity Logs */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#14171a]/40 rounded-[2.5rem] border border-white/5 p-10 flex flex-col gap-10"
        >
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-zinc-500" />
                <h3 className="text-xl font-bold text-white tracking-tight">Activity Logs</h3>
             </div>
             <button className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                Export CSV
                <ExternalLink className="w-3 h-3" />
             </button>
          </div>

          <div className="space-y-4">
             {activityLogs.map((log, idx) => (
               <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/2 transition-colors cursor-default group">
                  <div className="p-3 bg-white/5 rounded-xl text-zinc-500 group-hover:scale-110 transition-transform">
                     <log.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                     <h4 className="text-sm font-bold text-zinc-200 tracking-tight">{log.title}</h4>
                     <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{log.meta}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[10px] font-mono text-zinc-500">{log.time}</span>
                     <span className={cn("text-[10px] font-black tracking-widest uppercase", log.color)}>{log.status}</span>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
