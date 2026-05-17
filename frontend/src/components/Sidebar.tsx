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
  Rocket,
  Sun,
  Moon
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Zap, label: "Issues", href: "/issues" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-24 bg-[#f6f8fa] dark:bg-[#161b22] border-r border-[#d0d7de] dark:border-[#30363d] flex flex-col items-center py-10 z-50">
      {/* Logo */}
      <div className="w-12 h-12 bg-[#24292f] rounded-xl flex items-center justify-center mb-16 shadow-sm">
        <Rocket className="w-6 h-6 text-white" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="relative group">
              <div className={`p-4 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-white dark:bg-[#0d1117] text-[#24292f] dark:text-[#c9d1d9] border border-[#d0d7de] dark:border-[#30363d] shadow-sm" 
                  : "text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:text-[#c9d1d9] hover:bg-[#ebecf0] dark:hover:bg-[#21262d]"
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute left-20 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#24292f] text-white text-[11px] font-semibold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 shadow-md whitespace-nowrap">
                {item.label}
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-[#fd8c73] rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-4 text-[#57606a] dark:text-[#8b949e] hover:text-[#24292f] dark:hover:text-[#c9d1d9] hover:bg-[#ebecf0] dark:hover:bg-[#21262d] rounded-xl transition-all group relative"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <div className="absolute left-20 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#24292f] text-white text-[11px] font-semibold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 shadow-md whitespace-nowrap">
            Toggle Theme
          </div>
        </button>

        {/* Logout */}
      <button 
        onClick={handleLogout}
        className="p-4 text-[#57606a] dark:text-[#8b949e] hover:text-[#cf222e] hover:bg-[#ffebe9] dark:bg-[#ff7b7226] rounded-xl transition-all group relative"
      >
        <LogOut className="w-5 h-5" />
        <div className="absolute left-20 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#cf222e] text-white text-[11px] font-semibold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-md">
          Logout
        </div>
      </button>
      </div>
    </div>
  );
}
