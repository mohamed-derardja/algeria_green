"use client";

import { useEffect } from "react";
import { Modal } from "antd";
import { Trophy, Sparkles, Award, CheckCircle2, Trees } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badgeName: string;
  xpReward: number;
  description: string;
}

export default function AchievementUnlockModal({
  isOpen,
  onClose,
  title,
  badgeName,
  xpReward,
  description,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      // Trigger canvas particle burst
      try {
        const canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "9999";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const particles: any[] = [];
          const colors = ["#10b981", "#0d631b", "#f59e0b", "#14b8a6", "#3b82f6", "#ec4899"];

          for (let i = 0; i < 80; i++) {
            particles.push({
              x: canvas.width / 2,
              y: canvas.height / 2,
              vx: (Math.random() - 0.5) * 16,
              vy: (Math.random() - 0.7) * 16,
              size: Math.random() * 8 + 4,
              color: colors[Math.floor(Math.random() * colors.length)],
              alpha: 1,
            });
          }

          let animationFrame: number;
          const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;
            particles.forEach((p) => {
              if (p.alpha > 0) {
                alive = true;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.3; // Gravity
                p.alpha -= 0.015;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
              }
            });

            if (alive) {
              animationFrame = requestAnimationFrame(render);
            } else {
              document.body.removeChild(canvas);
            }
          };

          render();

          return () => {
            cancelAnimationFrame(animationFrame);
            if (document.body.contains(canvas)) {
              document.body.removeChild(canvas);
            }
          };
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      className="achievement-unlock-modal"
    >
      <div className="p-6 text-center space-y-4 animate-fadeIn">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border-2 border-emerald-500/40 shadow-xl animate-bounce">
            <Trophy className="w-10 h-10 text-emerald-400" />
          </div>
          <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow">
            +{xpReward} XP
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-emerald-500 block mb-1">
            🎉 NEW ACHIEVEMENT UNLOCKED!
          </span>
          <h3 className="font-headline-lg text-2xl font-bold text-on-surface">
            {badgeName}
          </h3>
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Added to your Volunteer Badge Inventory
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-colors shadow-md cursor-pointer font-bold"
        >
          Awesome! Continue Exploring
        </button>
      </div>
    </Modal>
  );
}
