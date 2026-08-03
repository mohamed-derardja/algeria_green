"use client";

import { useState } from "react";
import { FileText, Download, Printer, X, ShieldCheck, Check, Trees, Globe } from "lucide-react";
import { Modal, Tag } from "antd";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExecutiveReportModal({ isOpen, onClose }: Props) {
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={720}
      className="executive-report-modal"
    >
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500">
              <ShieldCheck className="w-4 h-4" /> OFFICIAL EXECUTIVE BRIEFING
            </div>
            <h3 className="font-title-md text-xl font-bold text-on-surface">
              Algeria Green National Reforestation Briefing (2026 Q3)
            </h3>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary p-1.5 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Document Paper Container */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-surface-container-high border-2 border-emerald-600/40 shadow-xl space-y-5 text-xs font-mono text-on-surface">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
            <div>
              <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400">PEOPLE&apos;S DEMOCRATIC REPUBLIC OF ALGERIA</div>
              <div className="text-[10px] text-on-surface-variant">Ministry of Agriculture &amp; Rural Development - General Directorate of Forests</div>
            </div>
            <Tag color="green" className="font-mono font-bold border-none m-0">DOC-REF: DZ-MDR-2026-88</Tag>
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-surface-container text-center">
            <div>
              <span className="text-[10px] text-on-surface-variant block uppercase font-label-sm">Total Logged Trees</span>
              <span className="font-bold text-base text-emerald-500">12,450,000</span>
            </div>
            <div>
              <span className="text-[10px] text-on-surface-variant block uppercase font-label-sm">Canopy Coverage</span>
              <span className="font-bold text-base text-primary">14.2%</span>
            </div>
            <div>
              <span className="text-[10px] text-on-surface-variant block uppercase font-label-sm">2030 Green Dam Target</span>
              <span className="font-bold text-base text-secondary">20.0%</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-on-surface block text-sm">Key Executive Findings:</span>
            <ul className="list-disc pl-5 space-y-1 leading-relaxed text-on-surface-variant">
              <li>High Plateaus Barrage Vert 2.0 re-afforestation expanded by 1,450 hectares across Djelfa and M&apos;Sila.</li>
              <li>Sentinel-2 satellite multispectral telemetry confirms 94.2% sapling survival rate in Batna Aurès Cedar massifs.</li>
              <li>Over 5,240 citizen science volunteers actively submitting ground field observation logs across 58 Wilayas.</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-center text-[10px] text-on-surface-variant">
            <span>Verified via Sentinel-2A &amp; Landsat-9 Satellite Orbit</span>
            <span>Generated: August 2026</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-title-md text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {downloaded ? "Report Briefing Exported! ✓" : "Export Official Executive PDF"}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-xl font-title-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-outline-variant/30"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>
    </Modal>
  );
}
