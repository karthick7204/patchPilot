"use client";

import React from "react";
import { 
  ChevronDown, 
  Copy, 
  FileCode, 
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const originalLines = [
  { num: 42, content: "func streamHandler(w http.ResponseWriter," },
  { num: "", content: "r *http.Request) {" },
  { num: 43, content: "    ctx := r.Context()" },
  { num: 44, content: "    ticker := time.NewTicker(1 *", type: "removed" },
  { num: "", content: "    time.Second)", type: "removed" },
  { num: 45, content: "    for {", type: "removed" },
  { num: 46, content: "        select {" },
  { num: 47, content: "        case <-ctx.Done():" },
  { num: 48, content: "            return", type: "removed" },
  { num: 49, content: "        case t := <-ticker.C:" },
  { num: 50, content: '            fmt.Fprintf(w, "Tick: %v\\n", t)' },
  { num: 51, content: "        }" },
  { num: 52, content: "    }" },
  { num: 53, content: "}" },
];

const fixedLines = [
  { num: 42, content: "func streamHandler(w http.ResponseWriter," },
  { num: "", content: "r *http.Request) {" },
  { num: 43, content: "    ctx := r.Context()" },
  { num: 44, content: "    ticker := time.NewTicker(1 *", type: "added" },
  { num: "", content: "    time.Second)", type: "added" },
  { num: 45, content: "    defer ticker.Stop()", type: "added" },
  { num: 46, content: "    for {" },
  { num: 47, content: "        select {" },
  { num: 48, content: "        case <-ctx.Done():" },
  { num: 49, content: "            return", type: "added" },
  { num: 50, content: "        case t := <-ticker.C:" },
  { num: 51, content: '            fmt.Fprintf(w, "Tick: %v\\n", t)' },
  { num: 52, content: "        }" },
  { num: 53, content: "    }" },
  { num: 54, content: "}" },
];

export function DiffViewer() {
  return (
    <div className="flex-1 min-h-[500px] flex flex-col bg-[#14171a] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
             <FileCode className="w-4 h-4" />
          </div>
          <span className="text-sm font-mono text-zinc-300">handler.go</span>
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 px-3 text-zinc-500 hover:text-zinc-300 transition-colors text-xs flex items-center gap-1.5 cursor-pointer">
             <Copy className="w-3.5 h-3.5" />
             Copy code
           </button>
           <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
             <MoreHorizontal className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="flex flex-1 text-[13px] font-mono leading-relaxed group">
        {/* Original Code */}
        <div className="flex-1 flex flex-col border-r border-white/5 bg-[#0f1113]">
          <div className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-zinc-600 bg-black/10">Original Code</div>
          <div className="flex-1 py-4 overflow-y-auto">
            {originalLines.map((line, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex group transition-colors",
                  line.type === "removed" ? "bg-rose-500/10 border-l-2 border-rose-500/50" : "hover:bg-white/2"
                )}
              >
                <div className="w-12 shrink-0 py-1 text-center text-zinc-700 select-none border-r border-white/2">
                   {line.num}
                </div>
                <pre className="px-4 py-1 text-zinc-400 whitespace-pre overflow-x-hidden">
                  <span className={cn(line.type === "removed" && "text-rose-400 group-hover:text-rose-300")}>
                    {line.type === "removed" && "- "}
                    {line.content}
                  </span>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Fixed Code */}
        <div className="flex-1 flex flex-col bg-[#111316]">
          <div className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-zinc-600 bg-black/10">AI-Fixed Code</div>
          <div className="flex-1 py-4 overflow-y-auto">
            {fixedLines.map((line, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex group transition-colors",
                  line.type === "added" ? "bg-emerald-500/10 border-l-2 border-emerald-500/50" : "hover:bg-white/2"
                )}
              >
                <div className="w-12 shrink-0 py-1 text-center text-zinc-700 select-none border-r border-white/2">
                   {line.num}
                </div>
                <pre className="px-4 py-1 text-zinc-400 whitespace-pre overflow-x-hidden">
                  <span className={cn(line.type === "added" && "text-emerald-400 group-hover:text-emerald-300")}>
                    {line.type === "added" && "+ "}
                    {line.content}
                  </span>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
