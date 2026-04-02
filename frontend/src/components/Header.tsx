"use client";

import React from "react";
import { 
  Search, 
  Bell, 
  User, 
  GitBranch, 
  FolderIcon, 
  Activity 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-10 bg-[#0d0f12] border-b border-white/5 backdrop-blur-3xl sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 text-zinc-500 font-mono text-xs tracking-wider">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/40 rounded-lg border border-white/5 group cursor-pointer hover:bg-zinc-800/60 transition-colors">
            <FolderIcon className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300">backend-svc</span>
          </div>
          <span className="opacity-40">/</span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/40 rounded-lg border border-white/5 group cursor-pointer hover:bg-zinc-800/60 transition-colors">
            <GitBranch className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300">main</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-xl px-12">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search fixes or logs..." 
            className="w-full bg-[#1a1c1e] border border-white/5 rounded-2xl py-2.5 pl-12 pr-12 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all placeholder:text-zinc-600 shadow-inner"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-[9px] font-mono text-zinc-600 tracking-tighter">
            ⌘K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="p-2.5 rounded-xl border border-white/5 bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-all cursor-pointer">
          <Activity className="w-5 h-5" />
        </button>
        <button className="p-2.5 rounded-xl border border-white/5 bg-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-all cursor-pointer relative">
          <Bell className="w-5 h-5" />
          <div className="absolute right-2.5 top-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0d0f12]" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 border-2 border-[#0d0f12] flex items-center justify-center p-[1px] cursor-pointer hover:scale-105 transition-transform overflow-hidden">
          <div className="w-full h-full rounded-full bg-[#1a1c1e] flex items-center justify-center">
             <User className="w-5 h-5 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
