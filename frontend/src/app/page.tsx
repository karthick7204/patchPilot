"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0d0f11] text-zinc-100 items-center justify-center font-sans">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          PatchPilot <span className="text-blue-500">Workspace</span>
        </h1>
        <p className="text-zinc-500 text-sm font-medium uppercase tracking-[0.2em]">
          Ready for New Feature Implementation
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/login" className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">Login</Link>
          <Link href="/signup" className="px-6 py-2 bg-blue-600 rounded-xl text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
