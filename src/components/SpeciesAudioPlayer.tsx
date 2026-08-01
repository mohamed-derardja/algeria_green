"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface Props {
  textAr: string;
  textFr: string;
  speciesName: string;
}

export default function SpeciesAudioPlayer({ textAr, textFr, speciesName }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (lang: "ar" | "fr") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = lang === "ar" ? textAr : textFr;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === "ar" ? "ar-DZ" : "fr-FR";
    utterance.rate = 0.9;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="inline-flex items-center gap-1 bg-surface-container-high p-1 rounded-full border border-outline-variant/30 text-xs">
      <button
        onClick={() => speak("ar")}
        title={`Listen to Arabic pronunciation: ${textAr}`}
        className="px-2.5 py-1 rounded-full bg-emerald-600/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white font-mono font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
      >
        <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? "animate-pulse" : ""}`} />
        <span>🇩🇿 AR</span>
      </button>

      <button
        onClick={() => speak("fr")}
        title={`Listen to French pronunciation: ${textFr}`}
        className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary text-on-surface hover:text-on-primary font-mono font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
      >
        <span>🇫🇷 FR</span>
      </button>
    </div>
  );
}
