"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TopNavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Platform");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  const navItems = ["Platform", "Citizen Portal", "Research", "Reports"];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-container-low/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-container-padding h-16 w-full">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
        >
          <img
            alt="Green Algeria Logo"
            className="h-8 w-8 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Pk7z6E3m4R7npNw3nsE7ucnDi9c2hihjE7HVz6wmiQYfjJAw2ncxKQqqkyr9WFDzET46uvoVUOLckTl2nxNbQLUyvKF3R6b72RZ7pPAFRq7J0I1Con0J45c1dQYbOoJI1NbUc4_oAcvbAq7GaqJzjMFVI49P7MKCGbv7mKPmQmIV13Bqoc0E90hxazFeYlXwNEHkYfGX7PULK12BleaUj3SDWFiYDpq7tcH0uvIfH5ku5TFrI_4h"
          />
          <span className="font-title-md text-title-md font-black text-primary dark:text-primary-fixed-dim tracking-tight">
            Green Algeria
          </span>
        </div>

        {/* Center Search Bar & Nav Items */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="relative w-64 mr-8">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-on-surface-variant pointer-events-none select-none"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              search
            </span>
            <input
              className="w-full bg-surface-container dark:bg-surface-container-high rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/70"
              placeholder="Search by location (e.g. Batna)..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-primary"
              >
                ✕
              </button>
            )}
          </div>

          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setActiveTab(item)}
                  className={`font-title-md text-title-md transition-colors cursor-pointer active:scale-95 transition-transform ${
                    activeTab === item
                      ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Actions: Dark Mode, Notifications, Help, Avatar */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title="Toggle Light/Dark Theme"
            className="p-2 rounded-full text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-all cursor-pointer active:scale-95 flex items-center justify-center"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              {isDarkMode ? "dark_mode" : "wb_sunny"}
            </span>
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
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                notifications
              </span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest dark:bg-surface-container-high rounded-xl shadow-xl border border-outline-variant p-4 z-50 text-left">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/40 mb-3">
                  <h4 className="font-title-md text-title-md text-on-surface">Recent Alerts</h4>
                  <span className="text-xs bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-label-sm">
                    3 New
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-surface-container dark:bg-surface-container-highest hover:bg-primary-container/10 transition-colors">
                    <p className="font-semibold text-primary">Batna Province Update</p>
                    <p className="text-xs text-on-surface-variant">50,000 Cedar trees added to satellite registry in Aurès region.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container dark:bg-surface-container-highest hover:bg-primary-container/10 transition-colors">
                    <p className="font-semibold text-secondary">Green Barrier Project</p>
                    <p className="text-xs text-on-surface-variant">High Plateaus re-afforestation dataset published.</p>
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
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                help
              </span>
            </button>

            {/* Help Popover */}
            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest dark:bg-surface-container-high rounded-xl shadow-xl border border-outline-variant p-4 z-50 text-left">
                <h4 className="font-title-md text-title-md text-on-surface mb-2">GIS Platform Help</h4>
                <p className="text-xs text-on-surface-variant mb-3">
                  Learn how to use satellite analytics and community tree logging tools.
                </p>
                <a
                  href="#research"
                  onClick={() => setShowHelp(false)}
                  className="block text-center w-full py-2 bg-primary text-on-primary rounded-lg font-title-md text-xs hover:bg-primary-container transition-colors"
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
              className="w-9 h-9 rounded-full bg-primary-container overflow-hidden border-2 border-primary/40 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            >
              <img
                className="w-full h-full object-cover"
                alt="Environmental Researcher Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Fyl6v9emt8o2TkHeHS-uclt00taZXiZsCywoIWUpQxCPa8vxntweTgJlTAOpTtLSJ4YnHvVD63V2SOWQhVJekof92ZHmxCLwwPzA4zc7EbgVCegHiNbYte9HsyrjJ060L_JMot0g3y9IdeSmpVRMKKhfpID_xHNyisrXXErpmR6y19VVuUGXrrDTtn7riTqH2nYNCJGjuzFJNioBrPcCnZr7LSwpFFYZuLHNOhCU0lI0kmHEUD3_"
              />
            </div>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest dark:bg-surface-container-high rounded-xl shadow-xl border border-outline-variant p-3 z-50">
                <div className="pb-2 border-b border-outline-variant/40 mb-2">
                  <p className="font-semibold text-sm text-on-surface">Dr. Yassine Benali</p>
                  <p className="text-xs text-on-surface-variant">Senior GIS Researcher</p>
                </div>
                <div className="space-y-1 text-xs text-on-surface">
                  <a href="#profile" className="block p-2 rounded hover:bg-surface-container dark:hover:bg-surface-container-highest">
                    My Profile & Submissions
                  </a>
                  <a href="#settings" className="block p-2 rounded hover:bg-surface-container dark:hover:bg-surface-container-highest">
                    GIS Settings & Spatial Preferences
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
