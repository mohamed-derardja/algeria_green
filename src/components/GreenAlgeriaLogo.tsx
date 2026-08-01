import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function GreenAlgeriaLogo({ className = "w-8 h-8", size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Emerald Emblem Ring */}
      <circle cx="32" cy="32" r="30" stroke="#059669" strokeWidth="2.5" strokeDasharray="4 2" />
      
      {/* Central Lush Cedar / Pine Tree Branches */}
      <path
        d="M32 10L18 28H24L14 42H27V54H37V42H50L40 28H46L32 10Z"
        fill="url(#logo_emerald_gradient)"
      />
      
      {/* Golden Star & Crescent Symbol Overlay */}
      <path
        d="M32 20C29 20 26.5 22.2 26.5 25C26.5 27.8 29 30 32 30C30.5 30 29 28.5 29 25C29 21.5 30.5 20 32 20Z"
        fill="#F59E0B"
      />
      <path
        d="M33.5 24L34.2 25.4L35.8 25.6L34.6 26.8L34.9 28.3L33.5 27.6L32.1 28.3L32.4 26.8L31.2 25.6L32.8 25.4L33.5 24Z"
        fill="#F59E0B"
      />
      
      {/* Leaf Vein Accents */}
      <path d="M32 14V42" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 24L24 32" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 24L40 32" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 34L20 44" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 34L44 44" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="logo_emerald_gradient" x1="32" y1="10" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="0.6" stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>
    </svg>
  );
}
