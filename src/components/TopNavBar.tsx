"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, Bell, HelpCircle, Menu, X, PlusCircle, Globe, ChevronDown, LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GreenAlgeriaLogo from "./GreenAlgeriaLogo";

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

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
          <div className="relative w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            <input
              className="w-full bg-slate-50 dark:bg-zinc-900 rounded-full py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400 font-medium shadow-2xs"
              placeholder={language === "AR" ? "ابحث عن ولاية..." : language === "FR" ? "Rechercher une Wilaya..." : "Search Wilaya (e.g. Batna)..."}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-emerald-700 cursor-pointer"
              >
                ✕
              </button>
            )}
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
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
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
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowHelp(false);
                setShowUserMenu(false);
              }}
              title="Notifications"
              className="p-2 rounded-full text-slate-700 dark:text-zinc-200 bg-white dark:bg-black border border-slate-300 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all cursor-pointer active:scale-95 flex items-center justify-center relative shadow-2xs"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white dark:ring-black"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 p-4 z-50 text-left animate-fadeIn">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800 mb-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Recent GIS Alerts</h4>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
                    3 New
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors">
                    <p className="font-bold text-emerald-800 dark:text-emerald-400">Aurès Cedar Pass (Batna)</p>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-0.5">50,000 Cedar trees added to satellite registry.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors">
                    <p className="font-bold text-emerald-800 dark:text-emerald-400">Barrage Vert Telemetry</p>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-0.5">High Plateaus re-afforestation dataset published.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <div className="relative">
            <button
              onClick={() => {
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

          {/* User Profile Avatar */}
          <div className="relative ml-1">
            <div
              onClick={() => {
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
    </>
  );
}
