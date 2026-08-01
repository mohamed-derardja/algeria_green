"use client";

import { useState } from "react";
import { ArrowUp, Trees, Mail, Check, ShieldCheck, ExternalLink } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-surface-container-highest dark:bg-surface-container-lowest border-t border-outline-variant/40 pt-16 pb-12 px-container-padding text-on-surface">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-outline-variant/30">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Green Algeria Logo"
                className="h-8 w-8 object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Pk7z6E3m4R7npNw3nsE7ucnDi9c2hihjE7HVz6wmiQYfjJAw2ncxKQqqkyr9WFDzET46uvoVUOLckTl2nxNbQLUyvKF3R6b72RZ7pPAFRq7J0I1Con0J45c1dQYbOoJI1NbUc4_oAcvbAq7GaqJzjMFVI49P7MKCGbv7mKPmQmIV13Bqoc0E90hxazFeYlXwNEHkYfGX7PULK12BleaUj3SDWFiYDpq7tcH0uvIfH5ku5TFrI_4h"
              />
              <span className="font-title-md text-xl font-black text-primary dark:text-primary-fixed-dim tracking-tight">
                Green Algeria
              </span>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
              National Geospatial Vegetation &amp; Environmental Monitoring Platform. Combining multispectral Sentinel-2 satellite telemetry with community citizen science across all 58 Wilayas.
            </p>

            <div className="flex items-center gap-2 text-xs text-primary dark:text-primary-fixed font-mono font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified National Environmental GIS Dataset v4.2</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-title-md text-sm font-bold text-on-surface uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-on-surface-variant font-medium">
              <li>
                <a href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  Home Portal
                </a>
              </li>
              <li>
                <a href="/gis-console" className="hover:text-primary transition-colors flex items-center gap-1">
                  GIS Console & Data
                </a>
              </li>
              <li>
                <a href="/citizen-portal" className="hover:text-primary transition-colors flex items-center gap-1">
                  Volunteer & Citizen Hub
                </a>
              </li>
              <li>
                <a href="/#timeline-section" className="hover:text-primary transition-colors flex items-center gap-1">
                  Barrage Vert 2.0 Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Telemetry Digest Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-title-md text-sm font-bold text-on-surface uppercase tracking-wider">
              Satellite Telemetry Updates
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Subscribe to receive bi-weekly orbit telemetry reports and national reforestation progress updates.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                Subscribed to Algeria Green Digest!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="email"
                    required
                    placeholder="Enter researcher email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface dark:bg-surface-container rounded-xl py-2 pl-9 pr-3 text-xs text-on-surface border border-outline-variant/40 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} National Environmental GIS Authority — Green Algeria Initiative. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-container-high text-on-surface border border-outline-variant/40 transition-all shadow-sm cursor-pointer active:scale-95 font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
}
