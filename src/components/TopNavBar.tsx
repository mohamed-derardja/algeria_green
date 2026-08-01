"use client";

import { useState, useEffect } from "react";
import { Search, Moon, Sun, Bell, HelpCircle, User, Menu, X, PlusCircle, Compass } from "lucide-react";

export default function TopNavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Platform");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "GIS Console", href: "/gis-console" },
    { label: "Citizen Portal", href: "/citizen-portal" },
    { label: "Roadmap", href: "/#timeline-section" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/85 dark:bg-surface-container-low/85 backdrop-blur-md border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-container-padding h-16 w-full">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
              <span className="text-[10px] bg-primary/10 text-primary dark:text-primary-fixed font-mono px-1.5 py-0.2 rounded font-normal hidden sm:inline-block">
                GIS v2.4
              </span>
            </span>
          </div>
        </div>

        {/* Center Search Bar & Nav Items */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="relative w-64 mr-8">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            <input
              className="w-full bg-surface-container dark:bg-surface-container-high rounded-full py-2 pl-9 pr-4 font-body-md text-xs text-on-surface border border-outline-variant/30 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/70"
              placeholder="Search Wilaya (e.g. Batna, 05)..."
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

          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setActiveTab(item.label)}
                  className={`font-title-md text-xs transition-all cursor-pointer hover:text-primary ${
                    activeTab === item.label
                      ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Actions: Dark Mode, Notifications, Help, Avatar, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Quick CTA Button: Log Tree */}
          <a
            href="#citizen-portal"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-title-md text-xs hover:bg-primary-container transition-all shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Log Tree
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title="Toggle Light/Dark Theme"
            className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95 flex items-center justify-center"
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
              className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95 flex items-center justify-center relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest dark:bg-surface-container-high rounded-xl shadow-xl border border-outline-variant p-4 z-50 text-left animate-fadeIn">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/40 mb-3">
                  <h4 className="font-title-md text-sm text-on-surface font-bold">Recent GIS Alerts</h4>
                  <span className="text-[11px] bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-mono">
                    3 New
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-surface-container dark:bg-surface-container-highest hover:bg-primary-container/10 transition-colors">
                    <p className="font-semibold text-primary">Aurès Cedar Pass (Batna)</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">50,000 Cedar trees added to satellite registry.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container dark:bg-surface-container-highest hover:bg-primary-container/10 transition-colors">
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
              className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95 flex items-center justify-center"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Help Popover */}
            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest dark:bg-surface-container-high rounded-xl shadow-xl border border-outline-variant p-4 z-50 text-left animate-fadeIn">
                <h4 className="font-title-md text-sm text-on-surface font-bold mb-1">GIS Platform Help</h4>
                <p className="text-xs text-on-surface-variant mb-3">
                  Learn how to use satellite analytics and community tree logging tools.
                </p>
                <a
                  href="#research"
                  onClick={() => setShowHelp(false)}
                  className="block text-center w-full py-2 bg-primary text-on-primary rounded-lg font-title-md text-xs hover:bg-primary-container transition-colors cursor-pointer"
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
              className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border-2 border-primary/40 cursor-pointer hover:ring-2 hover:ring-primary transition-all flex items-center justify-center text-primary"
            >
              <img
                className="w-full h-full object-cover"
                alt="Environmental Researcher Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Fyl6v9emt8o2TkHeHS-uclt00taZXiZsCywoIWUpQxCPa8vxntweTgJlTAOpTtLSJ4YnHvVD63V2SOWQhVJekof92ZHmxCLwwPzA4zc7EbgVCegHiNbYte9HsyrjJ060L_JMot0g3y9IdeSmpVRMKKhfpID_xHNyisrXXErpmR6y19VVuUGXrrDTtn7riTqH2nYNCJGjuzFJNioBrPcCnZr7LSwpFFYZuLHNOhCU0lI0kmHEUD3_"
              />
            </div>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest dark:bg-surface-container-high rounded-xl shadow-xl border border-outline-variant p-3 z-50 text-left animate-fadeIn">
                <div className="pb-2 border-b border-outline-variant/40 mb-2">
                  <p className="font-semibold text-xs text-on-surface">Dr. Yassine Benali</p>
                  <p className="text-[11px] text-on-surface-variant">Senior GIS Researcher</p>
                </div>
                <div className="space-y-1 text-xs text-on-surface">
                  <a href="#profile" className="block p-2 rounded hover:bg-surface-container dark:hover:bg-surface-container-highest cursor-pointer">
                    My Submissions & Badges
                  </a>
                  <a href="#settings" className="block p-2 rounded hover:bg-surface-container dark:hover:bg-surface-container-highest cursor-pointer">
                    GIS Spatial Preferences
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg lg:hidden text-on-surface hover:bg-surface-container-high cursor-pointer ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-surface/95 dark:bg-surface-container-lowest/95 backdrop-blur-xl lg:hidden p-6 flex flex-col justify-between border-b border-outline-variant/30 animate-fadeIn">
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

            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => {
                      setActiveTab(item.label);
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2.5 px-4 rounded-xl font-title-md text-sm text-on-surface hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-outline-variant/30 space-y-3">
            <a
              href="#citizen-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-on-primary font-title-md text-xs hover:bg-primary-container transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Log Tree Specimen
            </a>
          </div>
        </div>
      )}
    </>
  );
}

