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
    { icon: Tag, label: "Linear ID", value: issue.linearIssueId, color: "text-[#0969da] dark:text-[#58a6ff]" },
    { icon: Shield, label: "Priority", value: `P${issue.priority || 0}`, color: "text-[#bf8700]" },
    { icon: Info, label: "Status", value: issue.status || "Processing", color: "text-[#8250df]" },
    { icon: UserIcon, label: "Owner ID", value: issue.userId || "Unassigned", color: "text-[#57606a] dark:text-[#8b949e]" },
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white dark:bg-[#0d1117] border-l border-[#d0d7de] dark:border-[#30363d] h-full w-full max-w-2xl shadow-xl relative z-10 flex flex-col rounded-l-xl"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] flex justify-between items-start rounded-tl-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md flex items-center justify-center">
                    <FaGithub className="w-4 h-4 text-[#24292f] dark:text-[#c9d1d9]" />
                  </div>
                  <span className="text-xs font-semibold text-[#57606a] dark:text-[#8b949e] uppercase tracking-wide">Issue Details</span>
                </div>
                <h2 className="text-2xl font-semibold text-[#24292f] dark:text-[#c9d1d9] tracking-tight">{issue.name}</h2>
                <div className="text-sm text-[#57606a] dark:text-[#8b949e] flex gap-2 items-center">
                  <span>#{issue.linearIssueId}</span>
                  <span>•</span>
                  <span>{issue.status || "Processing"}</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-[#ebecf0] dark:hover:bg-[#21262d] rounded-md text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:text-[#c9d1d9] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-[#0d1117]">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {detailItems.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-4 space-y-1 shadow-sm">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs font-semibold text-[#57606a] dark:text-[#8b949e]">{item.label}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#24292f] dark:text-[#c9d1d9]">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[#24292f] dark:text-[#c9d1d9] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" /> Description
                </h3>
                <div className="bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-4 text-[#24292f] dark:text-[#c9d1d9] text-sm leading-relaxed font-sans whitespace-pre-wrap">
                  {issue.description || "No description provided."}
                </div>
              </div>

              {/* GitHub Link */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[#24292f] dark:text-[#c9d1d9]">Source Repository</h3>
                <a 
                  href={issue.githubLink}
                  target="_blank"
                  className="flex items-center justify-between p-4 bg-white dark:bg-[#0d1117] hover:bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md group transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <FaGithub className="w-5 h-5 text-[#24292f] dark:text-[#c9d1d9]" />
                    <span className="text-sm font-medium text-[#0969da] dark:text-[#58a6ff] group-hover:underline truncate max-w-xs">{issue.githubLink}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#57606a] dark:text-[#8b949e] group-hover:text-[#0969da] dark:text-[#58a6ff] transition-all" />
                </a>
              </div>

              {/* Timestamps */}
              <div className="flex items-center gap-8 py-4 border-t border-[#d0d7de] dark:border-[#30363d]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
                  <div>
                    <div className="text-xs font-semibold text-[#57606a] dark:text-[#8b949e]">Created</div>
                    <div className="text-xs text-[#24292f] dark:text-[#c9d1d9]">{new Date(issue.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#57606a] dark:text-[#8b949e]" />
                  <div>
                    <div className="text-xs font-semibold text-[#57606a] dark:text-[#8b949e]">Updated</div>
                    <div className="text-xs text-[#24292f] dark:text-[#c9d1d9]">{new Date(issue.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] flex gap-3 rounded-bl-xl">
              <button 
                onClick={() => router.push(`/editor/${issue._id}`)}
                className="flex-1 py-2 bg-[#2da44e] dark:bg-[#238636] hover:bg-[#2c974b] dark:hover:bg-[#2ea043] border border-[rgba(27,31,36,0.15)] dark:border-[#f0f6fc1a] text-white font-medium text-sm rounded-md transition-all shadow-sm"
              >
                Trigger AI Patch
              </button>
              {issue.linearUrl && (
                <a 
                  href={issue.linearUrl}
                  target="_blank"
                  className="px-4 py-2 bg-[#f6f8fa] dark:bg-[#161b22] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] border border-[#d0d7de] dark:border-[#30363d] text-[#24292f] dark:text-[#c9d1d9] font-medium text-sm rounded-md transition-all flex items-center justify-center gap-2 shadow-sm"
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
