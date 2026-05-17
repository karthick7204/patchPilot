"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Rocket,
  Edit2,
  Eye
} from "lucide-react";
import Editor from '@monaco-editor/react';

interface PatchEditorProps {
  isOpen: boolean;
  onClose: () => void;
  issue: any;
  isFullScreen?: boolean;
}

export default function PatchEditor({ isOpen, onClose, issue, isFullScreen }: PatchEditorProps) {
  const [activeTab, setActiveTab] = useState("fix.ts");
  const [isEditing, setIsEditing] = useState(false);

  const originalCode: string = issue?.extractedCode || `export function handleLogin(user) {
  // Bug: No validation for empty email
  const token = jwt.sign({ id: user._id }, SECRET);
  return token;
}`;

  const defaultFixed: string = issue?.fixedCode || `export function handleLogin(user) {
  // AI Fix: Added email validation and error handling
  if (!user.email) {
    throw new Error("Email is required for authentication");
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '7d' });
  return token;
}`;

  const [fixedCode, setFixedCode] = useState(defaultFixed);
  const [editorTheme, setEditorTheme] = useState("light");

  // Resizable split pane logic
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setEditorTheme(document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    setEditorTheme(document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light');
    
    return () => observer.disconnect();
  }, []);

  if (!isOpen) return null;

  // Simple diff heuristics
  const originalLines = originalCode.split('\n').map(l => l.trim());
  const fixedLines = fixedCode.split('\n').map(l => l.trim());

  return (
    <AnimatePresence>
      <div className={`${isFullScreen ? 'relative w-full h-full bg-white dark:bg-[#0d1117]' : 'fixed inset-0 z-[200] flex items-center justify-center p-12 bg-black/50 backdrop-blur-sm'}`}>
        <motion.div 
          initial={isFullScreen ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`bg-white dark:bg-[#0d1117] w-full h-full shadow-xl overflow-hidden flex flex-col font-sans ${isFullScreen ? 'rounded-none border-0' : 'rounded-lg border border-[#d0d7de] dark:border-[#30363d]'}`}
        >
          {/* GitHub Header */}
          <div className="h-14 bg-[#f6f8fa] dark:bg-[#161b22] flex items-center justify-between px-4 border-b border-[#d0d7de] dark:border-[#30363d]">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
              <span className="text-[14px] text-[#24292f] dark:text-[#c9d1d9] font-semibold">{issue?.name || "AI Generated Patch"}</span>
              <span className="text-[14px] text-[#57606a] dark:text-[#8b949e]">#{issue?.linearIssueId || "123"}</span>
            </div>
            <button onClick={onClose} className="text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:text-[#c9d1d9] transition-colors p-1 rounded-md hover:bg-[#ebecf0] dark:hover:bg-[#21262d]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* GitHub PR Meta Bar */}
          <div className="px-4 py-3 border-b border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#0d1117] flex items-center justify-between text-[13px] text-[#57606a] dark:text-[#8b949e]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md text-[#24292f] dark:text-[#c9d1d9] font-medium">
                <GitBranch className="w-3.5 h-3.5 text-[#57606a] dark:text-[#8b949e]" />
                patchpilot/fix
              </div>
              <span>into</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md text-[#24292f] dark:text-[#c9d1d9] font-medium">
                <GitBranch className="w-3.5 h-3.5 text-[#57606a] dark:text-[#8b949e]" />
                main
              </div>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col bg-white dark:bg-[#0d1117] overflow-hidden p-6">
            
            {/* Diff Container */}
            <div className="border border-[#d0d7de] dark:border-[#30363d] rounded-md overflow-hidden flex flex-col flex-1">
              {/* File Header */}
              <div className="bg-[#f6f8fa] dark:bg-[#161b22] border-b border-[#d0d7de] dark:border-[#30363d] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
                  <span className="text-[#24292f] dark:text-[#c9d1d9] text-[13px] font-mono font-semibold">src/{activeTab}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-[#24292f] dark:text-[#c9d1d9] bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] shadow-sm transition-colors"
                  >
                    {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                    {isEditing ? "Preview Diff" : "Edit Patch"}
                  </button>
                </div>
              </div>

              {/* Diff Viewport */}
              <div 
                ref={containerRef}
                className="flex-1 flex overflow-hidden bg-white dark:bg-[#0d1117]"
              >
                
                {/* Left: Original (Always Visible) */}
                <div 
                  className="flex flex-col"
                  style={{ width: `${leftWidth}%`, flex: "none" }}
                >
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse text-[12px] font-mono leading-tight">
                      <tbody>
                        {originalCode.split('\n').map((line, i) => {
                          const isRemoved = line.trim() !== '' && !fixedLines.includes(line.trim());
                          return (
                            <tr key={i} className={isRemoved ? 'bg-[#ffebe9] dark:bg-[#ff7b7226]' : ''}>
                              <td className={`w-12 text-right select-none px-2 py-1 text-[#57606a] dark:text-[#8b949e] ${isRemoved ? 'bg-[#ffdce0] dark:bg-[#ff7b724d]' : ''}`}>
                                {i + 1}
                              </td>
                              <td className={`w-12 text-right select-none px-2 py-1 text-[#57606a] dark:text-[#8b949e] ${isRemoved ? 'bg-[#ffdce0] dark:bg-[#ff7b724d]' : ''}`}>
                                
                              </td>
                              <td className="px-4 py-1 whitespace-pre">
                                <span className="text-[#24292f] dark:text-[#c9d1d9]">
                                  {isRemoved ? '-' : ' '} {line}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Draggable Divider */}
                <div 
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  className={`w-1 cursor-col-resize transition-colors hover:bg-[#0969da] dark:hover:bg-[#58a6ff] ${isDragging ? 'bg-[#0969da] dark:bg-[#58a6ff]' : 'bg-[#d0d7de] dark:bg-[#30363d]'}`}
                />

                {/* Right: AI Fixed / Editor */}
                <div className="flex-1 flex flex-col min-w-0">
                  {isEditing ? (
                    <div className="flex-1 flex flex-col bg-white dark:bg-[#0d1117] relative">
                      <Editor
                        height="100%"
                        defaultLanguage="typescript"
                        theme={editorTheme}
                        value={fixedCode}
                        onChange={(value) => setFixedCode(value || '')}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 13,
                          lineHeight: 1.5,
                          padding: { top: 16 },
                          scrollBeyondLastLine: false,
                          renderLineHighlight: "all",
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                          smoothScrolling: true,
                          cursorBlinking: "smooth"
                        }}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 overflow-auto">
                      <table className="w-full text-left border-collapse text-[12px] font-mono leading-tight">
                        <tbody>
                          {fixedCode.split('\n').map((line, i) => {
                            const isAdded = line.trim() !== '' && !originalLines.includes(line.trim());
                            return (
                              <tr key={i} className={isAdded ? 'bg-[#e6ffec] dark:bg-[#2ea04326]' : ''}>
                                <td className={`w-12 text-right select-none px-2 py-1 text-[#57606a] dark:text-[#8b949e] ${isAdded ? 'bg-[#ccffd8] dark:bg-[#2ea0434d]' : ''}`}>
                                  
                                </td>
                                <td className={`w-12 text-right select-none px-2 py-1 text-[#57606a] dark:text-[#8b949e] ${isAdded ? 'bg-[#ccffd8] dark:bg-[#2ea0434d]' : ''}`}>
                                  {i + 1}
                                </td>
                                <td className="px-4 py-1 whitespace-pre">
                                  <span className="text-[#24292f] dark:text-[#c9d1d9]">
                                    {isAdded ? '+' : ' '} {line}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* GitHub Footer Actions */}
          <div className="h-16 bg-[#f6f8fa] dark:bg-[#161b22] border-t border-[#d0d7de] dark:border-[#30363d] px-6 flex items-center justify-between">
            <div className="text-[13px] text-[#57606a] dark:text-[#8b949e] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2da44e] dark:text-[#238636]" />
              <strong>All checks have passed</strong>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={onClose}
                className="px-4 py-1.5 bg-[#f6f8fa] dark:bg-[#161b22] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] text-[#24292f] dark:text-[#c9d1d9] font-medium text-[13px] rounded-md transition-all border border-[#d0d7de] dark:border-[#30363d] shadow-sm"
              >
                Close
              </button>
              <button className="px-4 py-1.5 bg-[#2da44e] dark:bg-[#238636] hover:bg-[#2c974b] dark:hover:bg-[#2ea043] text-white font-medium text-[13px] rounded-md transition-all shadow-sm flex items-center gap-2 border border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a]">
                Create Pull Request
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
