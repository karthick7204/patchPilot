"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Files, 
  Search, 
  GitBranch, 
  Play, 
  CheckCircle2, 
  ChevronRight,
  Terminal as TerminalIcon,
  Circle,
  Rocket
} from "lucide-react";

interface PatchEditorProps {
  isOpen: boolean;
  onClose: () => void;
  issue: any;
  isFullScreen?: boolean;
}

export default function PatchEditor({ isOpen, onClose, issue, isFullScreen }: PatchEditorProps) {
  const [activeTab, setActiveTab] = useState("fix.ts");

  // Mock code for demonstration
  const originalCode = `export function handleLogin(user) {
  // Bug: No validation for empty email
  const token = jwt.sign({ id: user._id }, SECRET);
  return token;
}`;

  const fixedCode = `export function handleLogin(user) {
  // AI Fix: Added email validation and error handling
  if (!user.email) {
    throw new Error("Email is required for authentication");
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '7d' });
  return token;
}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={`${isFullScreen ? 'relative w-full h-full bg-[#1e1e1e]' : 'fixed inset-0 z-[200] flex items-center justify-center p-12 bg-black/80 backdrop-blur-md'}`}>
        <motion.div 
          initial={isFullScreen ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`bg-[#1e1e1e] w-full h-full shadow-2xl border-white/10 overflow-hidden flex flex-col ${isFullScreen ? 'rounded-none border-0' : 'rounded-none border'}`}
        >
          {/* VS Code Header */}
          <div className="h-10 bg-[#323233] flex items-center justify-between px-4 border-b border-black/20">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                <Rocket className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-[11px] text-zinc-400 font-medium">PatchPilot IDE — {issue?.linearIssueId || "Patching"}</span>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* VS Code Activity Bar */}
            <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-2 border-r border-black/20">
              <div className="p-3 bg-[#2c2c2c] border-l-2 border-blue-500 text-white w-full flex justify-center">
                <Files className="w-5 h-5" />
              </div>
              <div className="p-3 text-zinc-500 hover:text-white transition-colors w-full flex justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div className="p-3 text-zinc-500 hover:text-white transition-colors w-full flex justify-center">
                <GitBranch className="w-5 h-5" />
              </div>
              <div className="p-3 text-zinc-500 hover:text-white transition-colors w-full flex justify-center">
                <Play className="w-5 h-5" />
              </div>
            </div>

            {/* VS Code Sidebar */}
            <div className="w-64 bg-[#252526] flex flex-col border-r border-black/20">
              <div className="p-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                Explorer
                <ChevronRight className="w-3 h-3 rotate-90" />
              </div>
              <div className="flex-1">
                <div className="px-4 py-1.5 bg-[#37373d] flex items-center gap-2 text-[13px] text-white">
                  <ChevronRight className="w-3 h-3 rotate-90 text-zinc-500" />
                  <span className="font-semibold italic text-blue-400">src</span>
                </div>
                <div className="px-8 py-1.5 flex items-center gap-2 text-[13px] text-white bg-[#2a2d2e]">
                  <span className="text-blue-400 font-bold">TS</span>
                  {activeTab}
                </div>
              </div>
            </div>

            {/* VS Code Main Editor Area */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
              {/* Tabs */}
              <div className="h-9 bg-[#252526] flex items-center">
                <div className="h-full px-4 bg-[#1e1e1e] border-t border-t-blue-500 flex items-center gap-2 text-[12px] text-white min-w-[120px]">
                  <span className="text-blue-400 font-bold text-[10px]">TS</span>
                  {activeTab}
                  <Circle className="w-2 h-2 fill-white ml-2 opacity-50" />
                </div>
              </div>

              {/* Breadcrumbs */}
              <div className="h-6 px-4 flex items-center gap-1 text-[11px] text-zinc-500">
                src <ChevronRight className="w-3 h-3" /> {activeTab} <ChevronRight className="w-3 h-3" /> <span className="text-zinc-300">AI Suggested Patch</span>
              </div>

              {/* Editor Viewport (Diff View) */}
              <div className="flex-1 flex overflow-hidden border-t border-white/5">
                {/* Left: Original */}
                <div className="flex-1 border-r border-white/5 flex flex-col">
                  <div className="bg-red-500/10 px-4 py-1 text-[10px] font-bold text-red-500 uppercase tracking-widest border-b border-red-500/20">
                    Current Version
                  </div>
                  <pre className="flex-1 p-6 font-mono text-[13px] leading-relaxed overflow-auto bg-red-950/10">
                    <code className="text-zinc-400">
                      {originalCode.split('\n').map((line, i) => (
                        <div key={i} className={`flex gap-4 ${line.includes('Bug:') ? 'bg-red-500/20 -mx-6 px-6' : ''}`}>
                          <span className="w-8 text-zinc-600 text-right select-none">{i + 1}</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>

                {/* Right: AI Fixed */}
                <div className="flex-1 flex flex-col">
                  <div className="bg-emerald-500/10 px-4 py-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest border-b border-emerald-500/20">
                    AI Proposed Fix
                  </div>
                  <pre className="flex-1 p-6 font-mono text-[13px] leading-relaxed overflow-auto bg-emerald-950/10">
                    <code className="text-zinc-300">
                      {fixedCode.split('\n').map((line, i) => (
                        <div key={i} className={`flex gap-4 ${line.includes('AI Fix:') || line.includes('throw') || line.includes('expiresIn') ? 'bg-emerald-500/20 -mx-6 px-6' : ''}`}>
                          <span className="w-8 text-zinc-600 text-right select-none">{i + 1}</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              {/* VS Code Bottom Bar (Terminal style) */}
              <div className="h-48 bg-[#1e1e1e] border-t border-white/10 flex flex-col">
                <div className="h-9 px-4 border-b border-white/5 flex items-center gap-6">
                  <div className="text-[11px] font-bold text-white border-b-2 border-white h-full flex items-center px-1 uppercase tracking-widest">Output</div>
                  <div className="text-[11px] font-bold text-zinc-500 h-full flex items-center px-1 uppercase tracking-widest">Terminal</div>
                  <div className="text-[11px] font-bold text-zinc-500 h-full flex items-center px-1 uppercase tracking-widest">Debug Console</div>
                </div>
                <div className="flex-1 p-4 font-mono text-xs text-zinc-500 overflow-auto">
                  <div className="flex gap-2">
                    <span className="text-blue-400">INFO:</span> Analyzing codebase for {issue?.name}...
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-400">INFO:</span> Context gathered from {issue?.githubLink}.
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-400">SUCCESS:</span> Fix generated based on Linear ticket {issue?.linearIssueId}.
                  </div>
                  <div className="flex gap-2 animate-pulse mt-2">
                    <span className="text-zinc-300">_</span> Ready for review.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="h-20 bg-[#252526] border-t border-black/40 px-10 flex items-center justify-between">
            <div className="flex items-center gap-3 text-zinc-400">
              <GitBranch className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">branch: patchpilot/{issue?.linearIssueId?.toLowerCase() || "fix"}</span>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] tracking-widest uppercase rounded-xl transition-all border border-white/5"
              >
                Discard
              </button>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] tracking-widest uppercase rounded-xl transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Approve & Push to GitHub
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
