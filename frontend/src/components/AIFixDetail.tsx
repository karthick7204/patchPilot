"use client";

import React from "react";
import { DiffViewer } from "@/components/DiffViewer";
import { ActionBar } from "@/components/ActionBar";
import { motion } from "framer-motion";

export function AIFixDetail() {
  return (
    <div className="flex-1 overflow-y-auto px-12 pt-10 pb-20 custom-scrollbar scroll-smooth">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest leading-none">AI Generated Patch</span>
          </div>
          <span className="text-zinc-600 font-mono text-xs tracking-tighter">ID: PP-8829-01</span>
        </div>
        
        <h1 className="text-5xl font-black text-white tracking-tight mb-4 flex items-center gap-4">
          Fix: Memory Leak in API
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed font-medium">
          Critical resource leak identified in <span className="text-blue-400 font-mono text-sm underline decoration-blue-500/30 underline-offset-4">internal/api/handler.go</span> within the middleware stream process.
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="flex flex-col xl:flex-row gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          <DiffViewer />
        </motion.div>
        

      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <ActionBar />
      </motion.div>
    </div>
  );
}
