"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, Bell, HelpCircle, Menu, X, PlusCircle, Globe, ChevronDown, LogOut, Command, FileText, LogIn, Satellite, TreePine, AlertTriangle, PartyPopper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GreenAlgeriaLogo from "./GreenAlgeriaLogo";
import CommandPaletteModal from "./CommandPaletteModal";
import ExecutiveReportModal from "./ExecutiveReportModal";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "satellite" | "milestone" | "alert" | "achievement";
  time: string;
  read: boolean;
}

export default function TopNavBar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "Sentinel-2A Overpass Complete", message: "Multispectral capture of Batna Aurès massif completed. 10m GSD imagery now available.", type: "satellite", time: "2 min ago", read: false },
    { id: 2, title: "Reforestation Milestone 🎉", message: "12.5 million trees logged nationally — 100k added this week across 8 Wilayas.", type: "milestone", time: "1 hour ago", read: false },
    { id: 3, title: "Thermal Anomaly Detected", message: "Elevated surface temperature in Jijel coastal forest zone. Fire risk assessment triggered.", type: "alert", time: "3 hours ago", read: false },
    { id: 4, title: "Badge Unlocked: Forest Pioneer", message: "Your community rank advanced to Level 5 — you've logged 150+ verified specimens.", type: "achievement", time: "Yesterday", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const notificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "satellite": return <Satellite className="w-4 h-4 text-blue-500" />;
      case "milestone": return <TreePine className="w-4 h-4 text-emerald-500" />;
      case "alert": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "achievement": return <PartyPopper className="w-4 h-4 text-purple-500" />;
    }
  };

  // Dark mode: read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("algeria-green-theme");
    if (stored === "light") {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, []);

  // Dark mode: apply class and persist
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
      localStorage.setItem("algeria-green-theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
      localStorage.setItem("algeria-green-theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (language === "AR") {
      htmlElement.setAttribute("dir", "rtl");
      htmlElement.setAttribute("lang", "ar");
    } else {
      htmlElement.setAttribute("dir", "ltr");
      htmlElement.setAttribute("lang", language.toLowerCase());
    }
  }, [language]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowHelp(false);
      setShowUserMenu(false);
      setShowLangMenu(false);
    };
    // Small delay to let button click register first
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        handleClickOutside();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navItems = [
    { label: language === "AR" ? "الرئيسية" : language === "FR" ? "Accueil" : "Home", href: "/" },
    { label: language === "AR" ? "منصة GIS" : language === "FR" ? "Console SIG" : "GIS Console", href: "/gis-console" },
    { label: language === "AR" ? "بوابة المتطوعين" : language === "FR" ? "Portail Citoyen" : "Citizen Portal", href: "/citizen-portal" },
    { label: language === "AR" ? "خارطة الطريق" : language === "FR" ? "Feuille de Route" : "Roadmap", href: "/#timeline-section" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-zinc-800 shadow-sm flex justify-between items-center px-4 md:px-8 h-16 w-full transition-colors duration-200"
        style={{ backgroundColor: isDarkMode ? "#000000" : "#ffffff" }}
      >
        {/* Brand Logo & Title */}
        <a
          href="/"
          className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform shrink-0"
        >
          <GreenAlgeriaLogo className="w-8 h-8 shrink-0" />
          <span className="font-extrabold text-base md:text-lg text-emerald-700 dark:text-emerald-400 tracking-tight">
            Green Algeria
          </span>
        </a>

        {/* Center Search Input & Navigation Links */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-6 px-4">
          {/* Search Input */}
          <div className="relative w-64 cursor-pointer" onClick={() => setShowCommandPalette(true)}>
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            <input
              readOnly
              className="w-full bg-slate-50 dark:bg-zinc-900 rounded-full py-1.5 pl-9 pr-12 text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 outline-none transition-all placeholder:text-slate-400 font-medium cursor-pointer shadow-2xs"
              placeholder={language === "AR" ? "ابحث عن ولاية..." : language === "FR" ? "Rechercher une Wilaya..." : "Search Wilaya (Ctrl+K)..."}
              type="text"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-slate-300 dark:border-zinc-700 flex items-center gap-0.5 pointer-events-none">
              <Command className="w-2.5 h-2.5" /> K
            </span>
          </div>

          {/* Navigation Tabs */}
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`font-semibold text-xs px-4 py-1.5 rounded-full transition-all cursor-pointer inline-block ${
                      isActive
                        ? "bg-emerald-700 text-white shadow-xs font-bold"
                        : "text-slate-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Executive Report PDF Trigger */}
          <button
            onClick={() => setShowReportModal(true)}
            title="Generate Official Executive Briefing Report"
            className="px-3 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all cursor-pointer hidden sm:flex items-center gap-1.5 shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Briefing</span>
          </button>
          {/* Language Switcher */}
          <div className="relative" data-dropdown>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowLangMenu(!showLangMenu);
                setShowNotifications(false);
                setShowHelp(false);
                setShowUserMenu(false);
              }}
              title="Change Language"
              className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-black border border-slate-300 dark:border-zinc-800 hover:border-emerald-600 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === "AR" ? "🇩🇿 AR" : language === "FR" ? "🇫🇷 FR" : "🇬🇧 EN"}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-200 dark:border-zinc-800 p-1.5 z-50 text-left animate-fadeIn">
                <button
                  onClick={() => { setLanguage("EN"); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    language === "EN" ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold" : "text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>🇬🇧 English</span>
                  {language === "EN" && <span className="text-[10px] font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage("AR"); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    language === "AR" ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold" : "text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>🇩🇿 العربية</span>
                  {language === "AR" && <span className="text-[10px] font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage("FR"); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    language === "FR" ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold" : "text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>🇫🇷 Français</span>
                  {language === "FR" && <span className="text-[10px] font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Emerald Log Tree CTA */}
          <a
            href="/citizen-portal"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            {language === "AR" ? "غرس شجرة" : language === "FR" ? "Planter Arbre" : "Log Tree"}
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title="Toggle Light/Dark Theme"
            className="p-2 rounded-full text-slate-700 dark:text-zinc-200 bg-white dark:bg-black border border-slate-300 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all cursor-pointer active:scale-95 flex items-center justify-center shadow-2xs"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notifications Button */}
          <div className="relative" data-dropdown>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowHelp(false);
                setShowUserMenu(false);
              }}
              title="Notifications"
              className="p-2 rounded-full text-slate-700 dark:text-zinc-200 bg-white dark:bg-black border border-slate-300 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all cursor-pointer active:scale-95 flex items-center justify-center relative shadow-2xs"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-600 rounded-full ring-2 ring-white dark:ring-black flex items-center justify-center text-[9px] font-mono font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Enhanced Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 z-50 text-left animate-fadeIn overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-zinc-800">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    Notifications
                  </h4>
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`flex gap-3 p-3.5 hover:bg-slate-50 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors ${
                        !n.read ? "bg-emerald-50/50 dark:bg-emerald-950/20" : ""
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {notificationIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {n.title}
                          </p>
                          {!n.read && (
                            <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-relaxed line-clamp-2">
                          {n.message}
                        </p>
                        <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono mt-1 block">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-slate-200 dark:border-zinc-800">
                  <button className="w-full py-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-colors cursor-pointer">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <div className="relative" data-dropdown>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHelp(!showHelp);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              title="Help & FAQ"
              className="p-2 rounded-full text-slate-700 dark:text-zinc-200 bg-white dark:bg-black border border-slate-300 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all cursor-pointer active:scale-95 flex items-center justify-center shadow-2xs"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Help Popover */}
            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 p-4 z-50 text-left animate-fadeIn">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">GIS Platform Help</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 mb-3">
                  Learn how to use satellite analytics and community tree logging tools.
                </p>
                <a
                  href="#research"
                  onClick={() => setShowHelp(false)}
                  className="block text-center w-full py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer shadow-xs"
                >
                  View Documentation & API
                </a>
              </div>
            )}
          </div>

          {/* Sign In Button (visible when not on /login) */}
          {pathname !== "/login" && (
            <a
              href="/login"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-zinc-200 bg-white dark:bg-black border border-slate-300 dark:border-zinc-800 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all cursor-pointer shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{language === "AR" ? "تسجيل الدخول" : language === "FR" ? "Connexion" : "Sign In"}</span>
            </a>
          )}

          {/* User Profile Avatar */}
          <div className="relative ml-1" data-dropdown>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setShowHelp(false);
              }}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-600 cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all flex items-center justify-center shadow-xs"
            >
              <img
                className="w-full h-full object-cover"
                alt="Environmental Researcher Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Fyl6v9emt8o2TkHeHS-uclt00taZXiZsCywoIWUpQxCPa8vxntweTgJlTAOpTtLSJ4YnHvVD63V2SOWQhVJekof92ZHmxCLwwPzA4zc7EbgVCegHiNbYte9HsyrjJ060L_JMot0g3y9IdeSmpVRMKKhfpID_xHNyisrXXErpmR6y19VVuUGXrrDTtn7riTqH2nYNCJGjuzFJNioBrPcCnZr7LSwpFFYZuLHNOhCU0lI0kmHEUD3_"
              />
            </div>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 p-3 z-50 text-left animate-fadeIn">
                <div className="pb-2 border-b border-slate-200 dark:border-zinc-800 mb-2">
                  <p className="font-bold text-xs text-slate-900 dark:text-white">Dr. Yassine Benali</p>
                  <p className="text-[11px] text-slate-500 font-mono">Senior GIS Researcher</p>
                </div>
                <div className="space-y-1 text-xs text-slate-800 dark:text-zinc-200">
                  <a href="/citizen-portal" className="block p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer font-semibold">
                    My Submissions & Badges
                  </a>
                  <a href="/gis-console" className="block p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer font-semibold">
                    GIS Console & Analytics
                  </a>
                  <a href="/login" className="block p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-400 cursor-pointer font-bold border-t border-slate-200 dark:border-zinc-800 mt-1 pt-2">
                    Sign In / Register Account →
                  </a>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      window.location.href = "/login";
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-400 cursor-pointer font-bold flex items-center justify-between mt-1 border-t border-slate-200 dark:border-zinc-800 pt-2"
                  >
                    <span>{language === "AR" ? "تسجيل الخروج" : language === "FR" ? "Déconnexion" : "Sign Out / Logout"}</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl lg:hidden text-slate-800 dark:text-zinc-200 bg-white dark:bg-black border border-slate-300 dark:border-zinc-800 hover:bg-slate-100 cursor-pointer ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 lg:hidden p-6 flex flex-col justify-between border-b border-slate-200 dark:border-zinc-800 animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto"
          style={{ backgroundColor: isDarkMode ? "#000000" : "#ffffff" }}
        >
          <div className="space-y-4">
            <div className="relative w-full mb-6">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full bg-slate-50 dark:bg-zinc-900 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 outline-none"
                placeholder="Search Wilaya (e.g. Batna)..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 px-4 rounded-xl font-bold text-sm text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-emerald-700 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-zinc-800 space-y-3">
            {/* Mobile Sign In Button */}
            <a
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors border border-slate-300 dark:border-zinc-700"
            >
              <LogIn className="w-4 h-4" />
              {language === "AR" ? "تسجيل الدخول" : language === "FR" ? "Se Connecter" : "Sign In / Register"}
            </a>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-900 p-2 rounded-xl border border-slate-300 dark:border-zinc-800">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Language</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${language === "EN" ? "bg-emerald-700 text-white" : "text-slate-700 dark:text-zinc-300"}`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => setLanguage("AR")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${language === "AR" ? "bg-emerald-700 text-white" : "text-slate-700 dark:text-zinc-300"}`}
                >
                  🇩🇿 AR
                </button>
                <button
                  onClick={() => setLanguage("FR")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${language === "FR" ? "bg-emerald-700 text-white" : "text-slate-700 dark:text-zinc-300"}`}
                >
                  🇫🇷 FR
                </button>
              </div>
            </div>

            <a
              href="/citizen-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              {language === "AR" ? "غرس شجرة" : language === "FR" ? "Planter Arbre" : "Log Tree Specimen"}
            </a>
          </div>
        </div>
      )}

      {/* Global Command Palette Modal (Ctrl + K) */}
      <CommandPaletteModal
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />

      {/* Official Executive Briefing Report Modal */}
      <ExecutiveReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </>
  );
}
