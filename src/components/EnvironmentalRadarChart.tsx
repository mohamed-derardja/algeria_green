"use client";

import { Tag } from "antd";

interface RadarMetric {
  axis: string;
  value: number; // 0 to 100
}

interface Props {
  wilayaName: string;
  metrics?: RadarMetric[];
}

export default function EnvironmentalRadarChart({ wilayaName, metrics }: Props) {
  const defaultMetrics: RadarMetric[] = [
    { axis: "Canopy Density", value: 85 },
    { axis: "Biodiversity", value: 92 },
    { axis: "Water Retention", value: 78 },
    { axis: "Reforestation Speed", value: 88 },
    { axis: "Volunteer Action", value: 95 },
  ];

  const chartMetrics = metrics || defaultMetrics;

  // SVG Radar pentagon math
  const size = 260;
  const center = size / 2;
  const radius = 90;
  const angleStep = (Math.PI * 2) / 5;

  // Compute pentagon points for a given scale (0.2, 0.4, 0.6, 0.8, 1.0)
  const getPolygonPoints = (scale: number) => {
    return chartMetrics
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const r = radius * scale;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Compute data polygon points
  const dataPoints = chartMetrics
    .map((m, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = radius * (m.value / 100);
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 text-center space-y-3">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="font-bold text-on-surface">5-Axis Ecological Radar Chart</span>
        <Tag color="green" className="font-mono font-bold border-none m-0">{wilayaName}</Tag>
      </div>

      <div className="relative flex justify-center items-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background Pentagon Rings */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale) => (
            <polygon
              key={scale}
              points={getPolygonPoints(scale)}
              fill="none"
              stroke="rgba(16, 185, 129, 0.15)"
              strokeWidth="1"
              strokeDasharray={scale === 1.0 ? "none" : "2 2"}
            />
          ))}

          {/* Axis Radial Lines */}
          {chartMetrics.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="rgba(16, 185, 129, 0.2)"
                strokeWidth="1"
              />
            );
          })}

          {/* Data Polygon Fill */}
          <polygon
            points={dataPoints}
            fill="rgba(16, 185, 129, 0.25)"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Data Vertices Dots */}
          {chartMetrics.map((m, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius * (m.value / 100);
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Axis Labels */}
          {chartMetrics.map((m, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius + 22;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-on-surface-variant text-[9px] font-mono font-bold"
              >
                {m.axis}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
