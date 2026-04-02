"use client";

import React from "react";
import { 
  Bot, 
  CheckCircle2, 
  Zap, 
  ChevronRight, 
  ArrowUpRight 
} from "lucide-react";

export function AIExplanation() {
  return (
    <div className="w-[420px] flex flex-col gap-6 py-4">
      {/* Risk Level Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Risk Level: Low</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono italic tracking-tight">Generated 2 minutes ago</span>
        </div>
      </div>

      <div className="bg-[#14171a]/60 backdrop-blur-3xl rounded-[2rem] border border-white/5 p-8 flex flex-col gap-10 shadow-2xl">
        {/* Section Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center border border-white/10 shadow-lg shadow-indigo-500/20 group cursor-help transition-all hover:scale-110">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">AI Explanation</h2>
        </div>

        {/* Key Improvements */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Key Improvements</h3>
          
          {[
            { 
              title: "Optimized loop", 
              desc: "Prevents unnecessary cycles when context is invalidated." 
            },
            { 
              title: "Reduced allocations", 
              desc: "Stopped the ticker properly to release resources." 
            },
            { 
              title: "Added Defer Stop", 
              desc: "Ensures cleanup even on panic or early return." 
            }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 group transition-transform hover:translate-x-1">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{item.title}</span>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-[240px]">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-700 ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Impact Analysis */}
        <div className="space-y-6">
           <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Impact Analysis</h3>
           <div className="flex gap-4">
             <div className="flex-1 bg-black/30 rounded-2xl p-5 border border-white/5 hover:border-emerald-500/20 transition-colors group cursor-default">
               <span className="text-[10px] font-bold text-zinc-600 uppercase block mb-1">Perf Inc.</span>
               <div className="flex items-end gap-1">
                 <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">+12%</span>
                 <ArrowUpRight className="w-4 h-4 text-emerald-500 mb-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </div>
             </div>
             <div className="flex-1 bg-black/30 rounded-2xl p-5 border border-white/5 hover:border-blue-500/20 transition-colors group cursor-default">
               <span className="text-[10px] font-bold text-zinc-600 uppercase block mb-1">Complexity</span>
               <div className="flex items-end gap-1 font-mono">
                 <span className="text-2xl font-bold text-zinc-200">-5%</span>
                 <div className="w-4 h-4 bg-blue-500/10 rounded-md mb-1 hidden group-hover:block transition-all" />
               </div>
             </div>
           </div>
        </div>

        {/* Quote Section */}
        <div className="bg-indigo-500/5 rounded-2xl p-6 border-l-2 border-indigo-500/30 relative mt-4">
           <Zap className="absolute -top-3 -right-3 w-8 h-8 text-indigo-500/10" />
           <p className="text-xs font-mono italic text-indigo-300 leading-relaxed text-center py-2 px-4 opacity-70">
           "The original ticker was never stopped, causing a slow build-up of goroutines. By adding 'defer ticker.Stop()', we ensure GC can reclaim the memory."
           </p>
        </div>
      </div>
    </div>
  );
}
