"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Music, Play, Pause, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import { Tag } from "antd";

interface SoundscapeTrack {
  id: string;
  name: string;
  location: string;
  duration: string;
  freq: string;
}

export default function AmbientSoundscapeWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const tracks: SoundscapeTrack[] = [
    { id: "aures", name: "Batna Aurès Cedar Canopy Winds", location: "Batna Massif", duration: "Live Ambient", freq: "432 Hz" },
    { id: "djurdjura", name: "Djurdjura Alpine Songbirds & Spring", location: "Kabylie National Reserve", duration: "Live Bio-Acoustic", freq: "528 Hz" },
    { id: "oasis", name: "Biskra Ziban Date Palm Breeze", location: "Saharan Edge Oasis", duration: "Solar Grid Telemetry", freq: "440 Hz" },
  ];

  // Synthesize ambient white-noise wind audio oscillator using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const togglePlay = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        
        // Web Audio synth for ambient wind
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = activeTrack === 0 ? 400 : activeTrack === 1 ? 800 : 300;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.08;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();

        audioCtxRef.current = ctx;
        noiseNodeRef.current = whiteNoise;
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(true);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  const currentTrack = tracks[activeTrack];

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-fadeIn">
      {isExpanded ? (
        <div className="glass-card rounded-2xl p-4 w-72 border border-emerald-500/40 shadow-2xl space-y-3 bg-surface/95 dark:bg-surface-container-high/95 backdrop-blur-md">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Algerian Forest Soundscapes
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-on-surface-variant hover:text-primary cursor-pointer p-1"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            {tracks.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(idx)}
                className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                  activeTrack === idx
                    ? "bg-primary/10 border border-primary/30 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <div>
                  <div className="font-bold text-[11px] leading-snug">{track.name}</div>
                  <div className="text-[10px] text-on-surface-variant font-mono">{track.location}</div>
                </div>
                <Tag color={activeTrack === idx ? "green" : "default"} className="font-mono text-[9px] border-none m-0">
                  {track.freq}
                </Tag>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="flex-1 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? "Pause Soundscape" : "Play Soundscape"}</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="glass-card hover:bg-surface-container-high px-3.5 py-2 rounded-full border border-emerald-500/40 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 shadow-xl cursor-pointer active:scale-95 transition-all"
        >
          <Volume2 className={`w-4 h-4 text-emerald-500 ${isPlaying ? "animate-pulse" : ""}`} />
          <span>{isPlaying ? "🎶 Soundscape Active" : "🔊 Bio-Acoustics"}</span>
          <ChevronUp className="w-3.5 h-3.5 opacity-60" />
        </button>
      )}
    </div>
  );
}
