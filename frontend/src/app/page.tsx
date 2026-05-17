"use client";

import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#f6f8fa] dark:bg-[#161b22] text-[#24292f] dark:text-[#c9d1d9] items-center justify-center font-sans">
      <div className="text-center space-y-6 max-w-lg p-10 bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-xl shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#24292f] rounded-full flex items-center justify-center shadow-sm">
            <FaGithub className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#24292f] dark:text-[#c9d1d9]">
          PatchPilot Workspace
        </h1>
        <p className="text-[#57606a] dark:text-[#8b949e] text-sm">
          Ready for New Feature Implementation
        </p>
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-[#d0d7de] dark:border-[#30363d]">
          <Link 
            href="/login" 
            className="px-6 py-2 bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md text-sm font-medium text-[#24292f] dark:text-[#c9d1d9] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] transition-all shadow-sm"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-6 py-2 bg-[#2da44e] dark:bg-[#238636] border border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a] rounded-md text-sm font-medium text-white hover:bg-[#2c974b] dark:hover:bg-[#2ea043] transition-all shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
