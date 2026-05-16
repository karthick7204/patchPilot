"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ExternalLink, 
  Clock, 
  Shield, 
  Tag,
  Calendar,
  User as UserIcon,
  Info
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import PatchEditor from "./PatchEditor";
import { useRouter } from "next/navigation";

interface IssueDetailModalProps {
  issue: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function IssueDetailModal({ issue, isOpen, onClose }: IssueDetailModalProps) {
  const router = useRouter();

  if (!issue) return null;

  const detailItems = [
    { icon: Tag, label: "Linear ID", value: issue.linearIssueId, color: "text-blue-500" },
    { icon: Shield, label: "Priority", value: `P${issue.priority || 0}`, color: "text-amber-500" },
    { icon: Info, label: "Status", value: issue.status || "Processing", color: "text-indigo-500" },
    { icon: UserIcon, label: "Owner ID", value: issue.userId, color: "text-zinc-500" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-[#0d0f11] border-l border-white/10 h-full w-full max-w-2xl shadow-2xl relative z-10 flex flex-col"
          >
            {/* Header */}
            <div className="p-10 border-b border-white/5 flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <FaGithub className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Issue Details</span>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight leading-tight">{issue.name}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-zinc-500 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-10 space-y-12">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {detailItems.map((item, i) => (
                  <div key={i} className="bg-[#14171a] border border-white/5 rounded-3xl p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-3 h-3 ${item.color}`} />
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{item.label}</span>
                    </div>
                    <div className="text-sm font-black text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4" /> Description
                </h3>
                <div className="bg-[#14171a] border border-white/5 rounded-3xl p-8 text-zinc-400 text-sm leading-relaxed font-medium">
                  {issue.description || "No description provided."}
                </div>
              </div>

              {/* GitHub Link */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Source Repository</h3>
                <a 
                  href={issue.githubLink}
                  target="_blank"
                  className="flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-3xl group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <FaGithub className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors truncate max-w-xs">{issue.githubLink}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-all" />
                </a>
              </div>

              {/* Timestamps */}
              <div className="flex items-center gap-8 py-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-zinc-600" />
                  <div>
                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Created</div>
                    <div className="text-xs font-bold text-zinc-400">{new Date(issue.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-600" />
                  <div>
                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Updated</div>
                    <div className="text-xs font-bold text-zinc-400">{new Date(issue.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-10 border-t border-white/5 bg-black/20 flex gap-4">
              <button 
                onClick={() => router.push(`/editor/${issue._id}`)}
                className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs tracking-widest uppercase rounded-3xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                Trigger AI Patch
              </button>
              {issue.linearUrl && (
                <a 
                  href={issue.linearUrl}
                  target="_blank"
                  className="px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs tracking-widest uppercase rounded-3xl transition-all flex items-center justify-center gap-2"
                >
                  View on Linear <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
