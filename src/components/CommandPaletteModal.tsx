"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Trees, Command, Moon, Sun, ArrowRight, X, Bot, PlusCircle, Globe } from "lucide-react";
import { Modal } from "antd";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPaletteModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");

  const searchItems = [
    { title: "Batna - Aurès Cedar Forests", type: "Wilaya", code: "05", href: "/gis-console?wilaya=05", icon: MapPin },
    { title: "Tizi Ouzou - Djurdjura Massif", type: "Wilaya", code: "15", href: "/gis-console?wilaya=15", icon: MapPin },
    { title: "Djelfa - Green Dam Belt", type: "Wilaya", code: "17", href: "/gis-console?wilaya=17", icon: MapPin },
    { title: "Algiers - Urban Canopy", type: "Wilaya", code: "16", href: "/gis-console?wilaya=16", icon: MapPin },
    { title: "Oran - Coastal Forest Reserve", type: "Wilaya", code: "31", href: "/gis-console?wilaya=31", icon: MapPin },
    { title: "Biskra - Ziban Oasis Greening", type: "Wilaya", code: "07", href: "/gis-console?wilaya=07", icon: MapPin },
    { title: "GIS Interactive Satellite Console", type: "Page", href: "/gis-console", icon: Trees },
    { title: "Citizen Volunteer Hub & Badges", type: "Page", href: "/citizen-portal", icon: PlusCircle },
    { title: "AI Species Computer Vision Scanner", type: "Feature", href: "/#ai-scanner", icon: Bot },
  ];

  const filteredItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      (item.code && item.code.includes(query))
  );

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={600}
      className="command-palette-modal"
    >
      <div className="p-2">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-outline-variant/30 pb-3 mb-3">
          <Search className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search Wilaya (e.g. Batna, 05, GIS)..."
            className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/60 font-medium"
          />
          <button
            onClick={onClose}
            className="text-xs bg-surface-container-high hover:bg-outline-variant text-on-surface px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors group cursor-pointer text-xs font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary flex items-center justify-center transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-on-surface group-hover:text-primary font-bold">{item.title}</div>
                      <span className="text-[10px] text-on-surface-variant font-mono">{item.type}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-on-surface-variant">
              No matching Wilaya or command found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="pt-3 border-t border-outline-variant/30 mt-3 flex justify-between items-center text-[11px] text-on-surface-variant font-mono">
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3 text-emerald-500" /> Quick Search Palette
          </span>
          <span>Use ↑ ↓ to navigate</span>
        </div>
      </div>
    </Modal>
  );
}
