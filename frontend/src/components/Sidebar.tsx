"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Zap, 
  Settings, 
  LogOut, 
  Shield,
  Rocket
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Zap, label: "Issues", href: "/issues" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-24 bg-[#0d0f11] border-r border-white/5 flex flex-col items-center py-10 z-50">
      {/* Logo */}
      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-16 shadow-lg shadow-blue-600/20">
        <Rocket className="w-6 h-6 text-white" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="relative group">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? "bg-blue-500/10 text-blue-500 shadow-inner" 
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              }`}>
                <item.icon className="w-6 h-6" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 shadow-2xl">
                {item.label}
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="p-4 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group relative"
      >
        <LogOut className="w-6 h-6" />
        <div className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0">
          Logout
        </div>
      </button>
    </div>
  );
}
