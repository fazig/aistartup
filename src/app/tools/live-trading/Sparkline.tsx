"use client";

import { useId } from "react";

type SparklineProps = {
  points: number[];
  up: boolean;
};

export default function Sparkline({ points, up }: SparklineProps) {
  const fillId = `tfFill-${useId().replace(/:/g, "")}`;
  if (points.length < 2) {
    return <div className="pulse-chart-empty">Waiting for tape…</div>;
  }

  const width = 640;
  const height = 220;
  const pad = 8;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const coords = points.map((value, index) => {
    const x = pad + (index / (points.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${coords[coords.length - 1][0].toFixed(1)} ${height} L${coords[0][0].toFixed(1)} ${height} Z`;
  const last = coords[coords.length - 1];
  const color = up ? "#0ecb81" : "#f6465d";

  return (
    <svg className="pulse-spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${fillId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="4.5" fill={color} className="pulse-spark-dot" />
    </svg>
  );
}
