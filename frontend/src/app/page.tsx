"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardView } from "@/components/DashboardView";
import { AIFixDetail } from "@/components/AIFixDetail";
import { IntegrationsView } from "@/components/IntegrationsView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("integrations");

  return (
    <div className="flex h-screen bg-[#0d0f11] text-zinc-100 overflow-hidden font-sans selection:bg-blue-500/30 selection:text-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 transition-all">
        <Header />
        
        {activeTab === "dashboard" ? (
          <DashboardView />
        ) : activeTab === "integrations" ? (
          <IntegrationsView />
        ) : activeTab === "ai-fixes" ? (
          <AIFixDetail />
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500 font-mono italic p-12">
            <div className="max-w-md text-center flex flex-col items-center gap-6">
               <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center text-zinc-600 animate-pulse">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-zinc-700" />
               </div>
               <p className="text-sm font-bold tracking-widest uppercase">The <span className="text-blue-500">{activeTab}</span> module is under development.</p>
               <p className="text-xs text-zinc-600 font-medium">Please select <span className="text-zinc-400">Dashboard</span> or <span className="text-zinc-400">Integrations</span> to view the primary system interfaces.</p>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1c1e;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2c2e;
        }
      `}</style>
    </div>
  );
}
