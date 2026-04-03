"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Rocket, 
  Puzzle, 
  Sparkles, 
  Terminal, 
  Plus, 
  LogOut, 
  Activity,
  Zap 
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Sparkles, label: "AI Fixes", id: "ai-fixes" },
  { icon: Puzzle, label: "Integrations", id: "integrations" },
];

export function Sidebar({ activeTab = "dashboard", onTabChange }: { activeTab?: string, onTabChange?: (tab: string) => void }) {
  return (
    <div className="w-64 flex flex-col h-screen bg-[#0d0f12] border-r border-white/5 p-6 backdrop-blur-xl relative">
      <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => onTabChange?.("dashboard")}>
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
          <Zap className="w-6 h-6 text-white fill-current" />
        </div>
        <div>
          <h1 className="text-white font-bold tracking-tight text-lg leading-tight group-hover:text-blue-400 transition-colors">Patch Pilot</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">v2.4.0-stable</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group relative overflow-hidden",
              activeTab === item.id 
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5", 
              activeTab === item.id ? "text-blue-400" : "group-hover:scale-110 transition-transform"
            )} />
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded-l-full shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto px-1 space-y-8">
      
        <div className="space-y-4 pt-6 border-t border-white/5">
           <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
              <Activity className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
              <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-300 tracking-tight transition-colors">Status</span>
           </div>
           <div className="flex items-center gap-3 px-4 py-2 hover:bg-rose-500/10 rounded-xl cursor-pointer transition-colors group">
              <LogOut className="w-4 h-4 text-zinc-600 group-hover:text-rose-500 transition-colors" />
              <span className="text-xs font-bold text-zinc-500 group-hover:text-rose-500 tracking-tight transition-colors">Logout</span>
           </div>
        </div>
      </div>
    </div>
  );
}
