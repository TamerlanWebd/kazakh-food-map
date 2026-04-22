"use client";

import React from "react";
import { motion } from "framer-motion";
import { TasteProfile } from "@/lib/kazakhCuisineData";

interface RadarChartProps {
  profile: TasteProfile;
  isDark: boolean;
}

export default function RadarChart({ profile, isDark }: RadarChartProps) {
  const size = 200;
  const center = size / 2;
  const radius = size * 0.35;
  const metrics: { key: keyof TasteProfile; label: string }[] = [
    { key: "meatiness", label: "Мясо" },
    { key: "spice", label: "Острота" },
    { key: "sweetness", label: "Сладость" },
    { key: "sourness", label: "Кислость" },
    { key: "fatness", label: "Жирность" },
  ];

  const angleStep = (Math.PI * 2) / metrics.length;
  const pathData = metrics.map((m, i) => {
    const val = profile[m.key] / 10;
    const x = center + Math.cos(i * angleStep - Math.PI / 2) * radius * val;
    const y = center + Math.sin(i * angleStep - Math.PI / 2) * radius * val;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={size} height={size} className="overflow-visible">
      {[0.5, 1].map((r) => (
        <polygon
          key={r}
          points={metrics.map((_, i) => `${center + Math.cos(i * angleStep - Math.PI / 2) * radius * r},${center + Math.sin(i * angleStep - Math.PI / 2) * radius * r}`).join(" ")}
          className={isDark ? "stroke-white/10 fill-none" : "stroke-gray-200 fill-none"}
        />
      ))}
      <motion.polygon
        initial={false}
        animate={{ points: pathData }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={isDark ? "fill-amber-500/30 stroke-amber-400" : "fill-amber-500/20 stroke-amber-600"}
        strokeWidth="2.5"
      />
      {metrics.map((m, i) => {
        const x = center + Math.cos(i * angleStep - Math.PI / 2) * (radius + 25);
        const y = center + Math.sin(i * angleStep - Math.PI / 2) * (radius + 25);
        return (
          <text 
            key={i} 
            x={x} 
            y={y} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "fill-gray-400" : "fill-gray-500"}`}
          >
            {m.label}
          </text>
        );
      })}
    </svg>
  );
}
