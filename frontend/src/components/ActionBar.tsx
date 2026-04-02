"use client";

import React from "react";
import { 
  Zap, 
  Settings2, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionBar() {
  return (
    <div className="h-24 px-10 flex items-center justify-between bg-[#14171a]/40 backdrop-blur-3xl border-t border-white/5 rounded-t-[2rem] shadow-2xl mt-10">
      <div className="flex items-center gap-10">
        <div className="flex -space-x-3 group cursor-pointer hover:scale-110 transition-transform">
          {[1,2,3].map((idx) => (
            <div key={idx} className="w-9 h-9 rounded-full border-2 border-[#0d0f12] bg-[#1a1c1e] flex items-center justify-center overflow-hidden transition-all group-hover:-space-x-1">
               <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
            </div>
          ))}
          <div className="w-9 h-9 rounded-full border-2 border-[#0d0f12] bg-[#1a1c1e] flex items-center justify-center text-[10px] font-bold text-zinc-500">
             +3
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-zinc-600" />
          <span className="text-xs font-medium text-zinc-500 tracking-tight"><span className="text-zinc-200">5 Developers</span> watched this patch today.</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="h-14 px-8 rounded-2xl border border-white/5 bg-[#1a1c1e] text-zinc-400 font-bold text-sm tracking-wide hover:bg-white/5 hover:text-white transition-all cursor-pointer group shadow-lg flex items-center gap-3">
           <Settings2 className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
           Request Changes
        </button>
        <button className="h-14 px-10 rounded-2xl bg-emerald-500 text-black font-bold text-sm tracking-widest uppercase hover:bg-emerald-400 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-3 active:shadow-none">
           <Zap className="w-5 h-5 fill-current" />
           Approve & Push
        </button>
      </div>
    </div>
  );
}
