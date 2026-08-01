"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, Bell, HelpCircle, Menu, X, PlusCircle, Globe, ChevronDown, Compass, ShieldCheck } from "lucide-react";

export default function TopNavBar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Multilingual State
  const [language, setLanguage] = useState<"EN" | "AR" | "FR">("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    // Sync dark mode class on <html>
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
    // Sync RTL attribute on <html> for Arabic
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
      <nav className="fixed top-0 w-full z-50 bg-surface/90 dark:bg-surface-container-low/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-md flex justify-between items-center px-container-padding h-16 w-full transition-colors">
        {/* Brand Logo & Name */}
        <a
          href="/"
          className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform"
        >
          <img
            alt="Green Algeria Logo"
            className="h-8 w-8 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Pk7z6E3m4R7npNw3nsE7ucnDi9c2hihjE7HVz6wmiQYfjJAw2ncxKQqqkyr9WFDzET46uvoVUOLckTl2nxNbQLUyvKF3R6b72RZ7pPAFRq7J0I1Con0J45c1dQYbOoJI1NbUc4_oAcvbAq7GaqJzjMFVI49P7MKCGbv7mKPmQmIV13Bqoc0E90hxazFeYlXwNEHkYfGX7PULK12BleaUj3SDWFiYDpq7tcH0uvIfH5ku5TFrI_4h"
          />
          <div className="flex flex-col">
            <span className="font-title-md text-title-md font-black text-primary dark:text-primary-fixed-dim tracking-tight flex items-center gap-1.5">
              Green Algeria
              <span className="text-[10px] bg-primary/10 text-primary dark:text-primary-fixed font-mono px-1.5 py-0.5 rounded font-normal hidden sm:inline-flex items-center gap-1 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                v2.4 GIS
              </span>
            </span>
          </div>
        </a>

        {/* Center Search Bar & Nav Items */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="relative w-64 mr-6">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            <input
              className="w-full bg-surface-container dark:bg-surface-container-high rounded-full py-2 pl-9 pr-4 font-body-md text-xs text-on-surface border border-outline-variant/30 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/70 shadow-inner"
              placeholder={language === "AR" ? "ابحث عن ولاية..." : language === "FR" ? "Rechercher une Wilaya..." : "Search Wilaya (e.g. Batna)..."}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-primary cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <ul className="flex items-center space-x-2 bg-surface-container/60 dark:bg-surface-container-high/60 p-1 rounded-full border border-outline-variant/30">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`font-title-md text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer inline-block ${
                      isActive
                        ? "bg-primary text-on-primary font-bold shadow-sm"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-container-highest"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Actions: Language Switcher, Dark Mode, Notifications, Help, Avatar, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowNotifications(false);
                setShowHelp(false);
                setShowUserMenu(false);
              }}
              title="Change Language"
              className="px-2.5 py-1.5 rounded-full text-xs font-mono font-bold text-on-surface bg-surface-container dark:bg-surface-container-high border border-outline-variant/40 hover:border-primary transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{language === "AR" ? "🇩🇿 AR" : language === "FR" ? "🇫🇷 FR" : "🇬🇧 EN"}</span>
              <ChevronDown className="w-3 h-3 text-on-surface-variant" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-surface-container-lowest dark:bg-surface-container-high rounded-2xl shadow-xl border border-outline-variant p-1.5 z-50 text-left animate-fadeIn">
                <button
                  onClick={() => { setLanguage("EN"); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    language === "EN" ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-surface-container-highest"
                  }`}
                >
                  <span>🇬🇧 English</span>
                  {language === "EN" && <span className="text-[10px] font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage("AR"); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    language === "AR" ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-surface-container-highest"
                  }`}
                >
                  <span>🇩🇿 العربية</span>
                  {language === "AR" && <span className="text-[10px] font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage("FR"); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    language === "FR" ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-surface-container-highest"
                  }`}
                >
                  <span>🇫🇷 Français</span>
                  {language === "FR" && <span className="text-[10px] font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Quick CTA Button: Log Tree */}
          <a
            href="/citizen-portal"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-on-primary font-title-md text-xs hover:bg-primary-container transition-all shadow-md active:scale-95 cursor-pointer font-bold"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            {language === "AR" ? "غرس شجرة" : language === "FR" ? "Planter Arbre" : "Log Tree"}
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title="Toggle Light/Dark Theme"
            className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95 flex items-center justify-center border border-outline-variant/30"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
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
              className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95 flex items-center justify-center relative border border-outline-variant/30"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest dark:bg-surface-container-high rounded-2xl shadow-2xl border border-outline-variant p-4 z-50 text-left animate-fadeIn">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/40 mb-3">
                  <h4 className="font-title-md text-sm text-on-surface font-bold">Recent GIS Alerts</h4>
                  <span className="text-[11px] bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-mono">
                    3 New
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-surface-container dark:bg-surface-container-highest hover:bg-primary-container/10 transition-colors">
                    <p className="font-semibold text-primary">Aurès Cedar Pass (Batna)</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">50,000 Cedar trees added to satellite registry.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container dark:bg-surface-container-highest hover:bg-primary-container/10 transition-colors">
                    <p className="font-semibold text-secondary">Barrage Vert Telemetry</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">High Plateaus re-afforestation dataset published.</p>
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
              className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95 flex items-center justify-center border border-outline-variant/30"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Help Popover */}
            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest dark:bg-surface-container-high rounded-2xl shadow-2xl border border-outline-variant p-4 z-50 text-left animate-fadeIn">
                <h4 className="font-title-md text-sm text-on-surface font-bold mb-1">GIS Platform Help</h4>
                <p className="text-xs text-on-surface-variant mb-3">
                  Learn how to use satellite analytics and community tree logging tools.
                </p>
                <a
                  href="#research"
                  onClick={() => setShowHelp(false)}
                  className="block text-center w-full py-2 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-colors cursor-pointer"
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
              className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border-2 border-primary/40 cursor-pointer hover:ring-2 hover:ring-primary transition-all flex items-center justify-center text-primary shadow-sm"
            >
              <img
                className="w-full h-full object-cover"
                alt="Environmental Researcher Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Fyl6v9emt8o2TkHeHS-uclt00taZXiZsCywoIWUpQxCPa8vxntweTgJlTAOpTtLSJ4YnHvVD63V2SOWQhVJekof92ZHmxCLwwPzA4zc7EbgVCegHiNbYte9HsyrjJ060L_JMot0g3y9IdeSmpVRMKKhfpID_xHNyisrXXErpmR6y19VVuUGXrrDTtn7riTqH2nYNCJGjuzFJNioBrPcCnZr7LSwpFFYZuLHNOhCU0lI0kmHEUD3_"
              />
            </div>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest dark:bg-surface-container-high rounded-2xl shadow-2xl border border-outline-variant p-3 z-50 text-left animate-fadeIn">
                <div className="pb-2 border-b border-outline-variant/40 mb-2">
                  <p className="font-semibold text-xs text-on-surface">Dr. Yassine Benali</p>
                  <p className="text-[11px] text-on-surface-variant">Senior GIS Researcher</p>
                </div>
                <div className="space-y-1 text-xs text-on-surface">
                  <a href="/citizen-portal" className="block p-2 rounded-lg hover:bg-surface-container dark:hover:bg-surface-container-highest cursor-pointer font-medium">
                    My Submissions & Badges
                  </a>
                  <a href="/gis-console" className="block p-2 rounded-lg hover:bg-surface-container dark:hover:bg-surface-container-highest cursor-pointer font-medium">
                    GIS Console & Analytics
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl lg:hidden text-on-surface hover:bg-surface-container-high cursor-pointer ml-1 border border-outline-variant/30"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-surface/95 dark:bg-surface-container-lowest/95 backdrop-blur-2xl lg:hidden p-6 flex flex-col justify-between border-b border-outline-variant/30 animate-fadeIn">
          <div className="space-y-4">
            <div className="relative w-full mb-6">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="w-full bg-surface-container dark:bg-surface-container-high rounded-xl py-2.5 pl-9 pr-4 text-xs text-on-surface border border-outline-variant/30 outline-none"
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
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2.5 px-4 rounded-xl font-title-md text-sm text-on-surface hover:bg-primary/10 hover:text-primary transition-colors font-semibold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-outline-variant/30 space-y-3">
            <div className="flex justify-between items-center bg-surface-container dark:bg-surface-container-high p-2 rounded-xl">
              <span className="text-xs font-semibold text-on-surface">Language</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${language === "EN" ? "bg-primary text-on-primary" : "text-on-surface"}`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => setLanguage("AR")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${language === "AR" ? "bg-primary text-on-primary" : "text-on-surface"}`}
                >
                  🇩🇿 AR
                </button>
                <button
                  onClick={() => setLanguage("FR")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${language === "FR" ? "bg-primary text-on-primary" : "text-on-surface"}`}
                >
                  🇫🇷 FR
                </button>
              </div>
            </div>

            <a
              href="/citizen-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-on-primary font-title-md text-xs hover:bg-primary-container transition-colors shadow-md font-bold"
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
