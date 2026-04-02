"use client";

import React from "react";
import { 
  Rocket, 
  Terminal, 
  Clock, 
  ShieldCheck, 
  FolderIcon, 
  GitPullRequest, 
  History, 
  Plus, 
  CheckCircle2, 
  Clock3, 
  CircleDot, 
  Search,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tasks = [
  {
    id: "PP-104",
    title: "Memory Leak in API",
    repo: "MAIN REPO",
    origin: "linear.app/issue/12",
    branch: "fix/api-leak-01",
    status: "ANALYZING",
    progress: 3,
    steps: ["FETCHED", "CLONED", "ANALYZING", "GENERATED", "REVIEW"]
  },
  {
    id: "PP-105",
    title: "Fix CSS Overflow on Mobile",
    repo: "MOBILE UI",
    origin: "linear.app/issue/45",
    branch: "patch/ui-overflow-fix",
    status: "READY FOR REVIEW",
    progress: 5,
    steps: ["FETCHED", "CLONED", "ANALYZING", "GENERATED", "REVIEW"]
  }
];

const stats = [
  { icon: Rocket, label: "EFFICIENCY", value: "98.4%", desc: "Automated resolution rate across all connected repositories this month.", color: "text-indigo-400" },
  { icon: Clock, label: "FIX VELOCITY", value: "14.2m", desc: "Average time from Linear ticket ingestion to generated code patch.", color: "text-blue-400" },
  { icon: ShieldCheck, label: "RELIABILITY", value: "0 Regressions", desc: "Patch Pilot fixes have passed 100% of existing unit tests during validation.", color: "text-emerald-400" },
];

export function DashboardView() {
  return (
    <div className="flex-1 px-12 pt-10 pb-20 overflow-y-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-12">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
             <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">GitHub</span>
             </div>
             <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Linear</span>
             </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-4">Active Task Pipeline</h1>
          <p className="max-w-2xl text-lg text-zinc-500 font-medium leading-relaxed">
            Autonomous maintenance systems are currently analyzing 2 high-priority tickets from your Linear workspace.
          </p>
        </motion.div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-4 text-zinc-500">
              <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Terminal className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
           </div>
           <div className="w-px h-8 bg-white/5" />
           <div className="flex items-center gap-4 bg-[#14171a] border border-white/5 px-4 py-2 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-[2px] group-hover:scale-110 transition-transform">
                 <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center overflow-hidden">
                    <History className="w-4 h-4 text-white/40" />
                 </div>
              </div>
              <span className="text-sm font-bold text-zinc-200 tracking-tight">DevPilot_Alpha</span>
           </div>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#14171a] rounded-[2.5rem] border border-white/5 p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between relative z-10">
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-zinc-600 px-2 py-1 bg-white/5 rounded-md">{task.id}</span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{task.repo}</span>
               </div>
               <div className={cn(
                 "px-4 py-1.5 rounded-full flex items-center gap-2 border",
                 task.status === "ANALYZING" ? "bg-indigo-500/10 border-indigo-500/20" : "bg-emerald-500/10 border-emerald-500/20"
               )}>
                  <div className={cn("w-2 h-2 rounded-full", task.status === "ANALYZING" ? "bg-indigo-500 animate-pulse" : "bg-emerald-500")} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", task.status === "ANALYZING" ? "text-indigo-400" : "text-emerald-400")}>
                    {task.status}
                  </span>
               </div>
            </div>

            <h2 className="text-3xl font-bold text-white tracking-tight leading-none h-8 truncate">{task.title}</h2>

            <div className="bg-black/40 rounded-3xl p-6 border border-white/5 flex flex-col gap-4">
               <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-600">
                  <span>ORIGIN</span>
                  <span>BRANCH</span>
               </div>
               <div className="flex items-center justify-between font-mono text-sm">
                  <div className="flex items-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition-colors cursor-pointer underline decoration-emerald-500/20 underline-offset-4">
                     <Zap className="w-3.5 h-3.5 fill-current" />
                     {task.origin}
                  </div>
                  <span className="text-zinc-200">{task.branch}</span>
               </div>
            </div>

            {/* Stepper */}
            <div className="relative pt-10 pb-4">
               <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
               <div className="relative z-10 flex justify-between items-center px-4">
                  {task.steps.map((step, i) => {
                    const stepIdx = i + 1;
                    const isActive = stepIdx === task.progress;
                    const isCompleted = stepIdx < task.progress;
                    return (
                      <div key={step} className="flex flex-col items-center gap-3">
                         <div className={cn(
                           "w-10 h-10 rounded-full flex items-center justify-center transition-all border-2",
                           isCompleted ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" :
                           isActive ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse" :
                           "bg-[#0d0f11] border-white/10 text-zinc-700"
                         )}>
                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : 
                             isActive ? <CircleDot className="w-6 h-6" /> : 
                             <span className="font-bold text-sm">{stepIdx}</span>}
                         </div>
                         <span className={cn(
                           "text-[8px] font-bold uppercase tracking-widest transition-colors",
                           isActive ? "text-blue-500" : isCompleted ? "text-emerald-500" : "text-zinc-700"
                         )}>{step}</span>
                      </div>
                    );
                  })}
               </div>
            </div>

            <button className={cn(
              "w-full py-5 rounded-2xl font-black rounded-3xl text-sm tracking-widest uppercase transition-all shadow-xl",
              task.status === "ANALYZING" 
                ? "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5" 
                : "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.01]"
            )}>
              {task.status === "ANALYZING" ? "View Log Stream" : "Open Pull Request"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 + 0.3 }}
            className="bg-[#14171a] rounded-[2rem] border border-white/5 p-8 flex flex-col gap-6 group hover:border-white/10 transition-all cursor-default"
          >
            <div className="flex items-center gap-4">
               <div className={cn("p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform", stat.color)}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</span>
            </div>
            <div>
               <div className="text-4xl font-black text-white tracking-tight mb-2">{stat.value}</div>
               <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                 {stat.desc}
               </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Repository Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-8"
      >
        <div className="flex items-center justify-between px-2">
           <h2 className="text-2xl font-bold text-white tracking-tight">Recent Repository Activity</h2>
           <button className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Manage All Repos</button>
        </div>

        <div className="space-y-4">
           {[
             { name: "pilot-dashboard-v3", update: "UPDATED 2M AGO BY AI AGENT", badges: ["3 Pull Requests", "Active Fix"] },
             { name: "core-api-service", update: "UPDATED 1H AGO", badges: ["12 Closed"] }
           ].map((repo) => (
             <div key={repo.name} className="bg-[#14171a] rounded-3xl p-6 border border-white/5 flex items-center gap-8 hover:bg-white/2 transition-all cursor-pointer group">
                <div className="p-4 bg-white/5 rounded-2xl text-zinc-500 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                   <FolderIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                   <h3 className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors">{repo.name}</h3>
                   <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{repo.update}</span>
                </div>
                <div className="flex items-center gap-3">
                   {repo.badges.map((badge) => (
                     <span key={badge} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                       {badge}
                     </span>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <button className="fixed bottom-12 right-12 w-16 h-16 bg-blue-500 text-white rounded-[1.5rem] shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-50 hover:bg-blue-400 active:shadow-none group">
         <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
}
