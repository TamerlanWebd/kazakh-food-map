"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as d3 from "d3-geo";
import Link from "next/link";
import Image from "next/image";
import {
  ChefHat,
  Map as MapIcon,
  Info,
  Utensils,
  Maximize2,
  ChevronRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import {
  regions,
  dishesBySlug,
  RegionId,
  Dish,
  dishes,
  Drink,
} from "@/lib/kazakhCuisineData";
import geoDataRaw from "@/public/geo/kz_adm1_2024.json";

// Shared Components
import RadarChart from "@/components/RadarChart";
import DishModal from "@/components/DishModal";
import DrinkModal from "@/components/DrinkModal";
import MusicToggle from "@/components/MusicToggle";

const geoData = geoDataRaw as any;

const ADM1_TO_MACRO: Record<string, RegionId> = {
  "Akmola Region": "north",
  "North Kazakhstan Region": "north",
  "Kostanay Region": "north",
  "Pavlodar Region": "north",
  "West Kazakhstan Region": "west",
  "Atyrau Region": "west",
  "Aktobe Region": "west",
  "Mangystau Region": "west",
  "Almaty": "south",
  "Shymkent": "south",
  "Turkistan Region": "south",
  "Jambyl Region": "south",
  "Kyzylorda Region": "south",
  "Almaty Region": "south",
  "Jetisu Region": "south",
  "East Kazakhstan Region": "east",
  "Abay Region": "east",
  "Karaganda Region": "central",
  "Ulytau Region": "central",
  "Astana": "north",
};

export default function KazakhFoodMap() {
  const [activeRegionId, setActiveRegionId] = useState<RegionId>("south");
  const [isBoardMode, setIsBoardMode] = useState(true);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  const activeRegion = useMemo(() => regions.find((r) => r.id === activeRegionId) || regions[0], [activeRegionId]);

  const themeClasses = isBoardMode
    ? "bg-[#080a0c] text-white"
    : "bg-gray-50 text-gray-900";

  return (
    <main className={`min-h-screen transition-all duration-500 ${themeClasses} overflow-x-hidden font-sans ornament-grid`}>
      {/* Background Ornaments / Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden origin-center text-current">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] blur-[150px] rounded-full ${isBoardMode ? "bg-blue-600/20" : "bg-blue-200/40"}`}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] blur-[150px] rounded-full ${isBoardMode ? "bg-amber-600/10" : "bg-amber-100/40"}`}
        />
      </div>

      <header className={`relative z-20 px-8 py-10 transition-colors duration-500 ${isBoardMode ? "bg-black/40 border-b border-white/5" : "bg-white border-b-4 border-white"} backdrop-blur-2xl`}>
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className={`flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] ${isBoardMode ? "text-amber-500" : "text-amber-600"}`}>
              <Sparkles size={20} className="animate-pulse" /> <span>National Gastronomic Heritage</span>
            </div>
            <h1 className="mt-2 text-6xl font-black tracking-tighter leading-none premium-text-glow">Дәм Дала</h1>
            <p className="mt-2 text-xl font-medium opacity-60 italic">Интерактивное путешествие по вкусам Казахстана</p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <MusicToggle isDark={isBoardMode} />
            <button
              onClick={() => setIsBoardMode(!isBoardMode)}
              className={`flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-black transition-all shadow-xl border-4 ${isBoardMode
                ? "bg-amber-500 border-amber-400 text-white hover:bg-amber-600 shadow-amber-500/20"
                : "bg-white border-white text-gray-900 hover:bg-gray-50"
                }`}
            >
              {isBoardMode ? <Maximize2 size={24} /> : <MapIcon size={24} />}
              {isBoardMode ? "ВЫКЛ. ПРЕЗЕНТАЦИЮ" : "БЕЛАЯ ТЕМА"}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-12 relative z-10 space-y-16">
        {/* MAP SECTION - PRESERVED AS IS BUT WITH PREMIUM BG */}
        <section className={`rounded-[60px] p-12 relative overflow-hidden flex flex-col items-center border-4 ${isBoardMode ? "glass-card border-white/10" : "bg-white border-white shadow-2xl"}`}>
          <div className="absolute top-12 left-12 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <MapIcon className="text-amber-500" size={32} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Регионы Казахстана</h2>
          </div>

          <div className="relative w-full h-[700px] flex items-center justify-center mt-12 cursor-default">
            <svg viewBox="0 0 1000 700" className="w-full h-full drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <g>
                {geoData.features.map((feature: any, idx: number) => {
                  const adm1Name = feature.properties.ADM1_EN;
                  const macroId = ADM1_TO_MACRO[adm1Name] || "north";
                  const region = regions.find((r) => r.id === macroId)!;
                  const isActive = activeRegionId === macroId;
                  const localProjection = d3.geoMercator().scale(1900).center([67, 48]).translate([480, 400]);
                  const localPath = d3.geoPath().projection(localProjection);

                  return (
                    <motion.path
                      key={idx}
                      d={localPath(feature) || ""}
                      fill={isActive ? region.activeColor : (isBoardMode ? "#16181b" : region.color)}
                      stroke={isActive ? "#fbbf24" : (isBoardMode ? "rgba(255,255,255,0.05)" : region.stroke)}
                      strokeWidth={isActive ? 4 : 1}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="cursor-pointer transition-all hover:opacity-80"
                      onClick={() => setActiveRegionId(macroId)}
                    />
                  );
                })}
              </g>
              {regions.map((region) => {
                const labelPos = {
                  north: { x: 550, y: 200 }, west: { x: 150, y: 370 },
                  south: { x: 560, y: 620 }, east: { x: 910, y: 380 },
                  central: { x: 590, y: 400 },
                }[region.id];

                return (
                  <g key={region.id} style={{ pointerEvents: "none" }}>
                    <text
                      x={labelPos.x} y={labelPos.y} textAnchor="middle"
                      className={`text-2xl font-black uppercase tracking-[0.2em] ${isBoardMode ? "fill-white/80" : "fill-gray-900"}`}
                      style={{ filter: isBoardMode ? "drop-shadow(0 0 5px black)" : "none" }}
                    >
                      {region.id === "north" ? "Север" : region.id === "west" ? "Запад" : region.id === "south" ? "Юг" : region.id === "east" ? "Восток" : "Центр"}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className={`mt-12 flex items-center gap-4 px-10 py-5 rounded-full border-2 ${isBoardMode ? "glass-card border-white/5" : "bg-gray-100 border-gray-200"}`}>
            <Info size={24} className="text-amber-500 animate-bounce" />
            <span className="text-lg font-bold opacity-80 italic">Выберите регион, чтобы погрузиться в его гастрономическую историю...</span>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Identity */}
          <div className="space-y-12">
            <motion.section
              key={`${activeRegionId}-header`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-[60px] p-16 border-4 relative overflow-hidden ${isBoardMode ? "bg-amber-500 text-white border-amber-400/50 shadow-2xl shadow-amber-500/20" : "bg-white text-gray-900 border-white shadow-xl"
                }`}
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                <ChefHat size={160} />
              </div>
              <h2 className="text-7xl font-black tracking-tighter premium-text-glow">{activeRegion.title}</h2>
              <p className={`mt-4 text-3xl font-bold italic ${isBoardMode ? "text-amber-100" : "text-amber-700"}`}>{activeRegion.subtitle}</p>
              <div className={`mt-12 p-10 rounded-[40px] border-2 border-dashed ${isBoardMode ? "bg-black/20 border-white/10" : "bg-gray-50 border-gray-200"}`}>
                <p className="text-2xl leading-relaxed italic opacity-95">«{activeRegion.history}»</p>
              </div>
            </motion.section>

            <div className={`rounded-[60px] p-12 border-4 ${isBoardMode ? "glass-card border-white/5" : "bg-white border-white shadow-2xl"}`}>
              <div className="flex items-center gap-6 mb-10">
                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                  <TrendingUp className="text-amber-500" size={32} />
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tight">Профиль Вкуса</h3>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="relative group">
                  <div className="absolute inset-0 bg-amber-500/20 blur-[50px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                  <RadarChart profile={activeRegion.tasteProfile} isDark={isBoardMode} />
                </div>
                <div className="space-y-8 flex-1">
                  <p className={`text-2xl font-medium leading-relaxed ${isBoardMode ? "text-gray-300" : "text-gray-600"}`}>
                    {activeRegion.mainHighlight}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-6 rounded-3xl border-2 flex flex-col justify-center gap-1 ${isBoardMode ? "glass-card border-white/5" : "bg-gray-50 border-gray-100"}`}>
                      <p className="text-xs uppercase font-bold opacity-40 tracking-widest">Кухня</p>
                      <p className="text-xl font-black">Кочевая</p>
                    </div>
                    <div className={`p-6 rounded-3xl border-2 flex flex-col justify-center gap-1 ${isBoardMode ? "glass-card border-white/5" : "bg-gray-50 border-gray-100"}`}>
                      <p className="text-xs uppercase font-bold opacity-40 tracking-widest">Специи</p>
                      <p className="text-xl font-black">Умеренно</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gastronomy & Drinks */}
          <div className={`rounded-[60px] p-16 border-4 liquid-effect flex flex-col ${isBoardMode ? "glass-card border-white/5" : "bg-white border-white shadow-2xl"}`}>
            <div className="flex items-center gap-6 mb-16">
              <div className="p-5 bg-amber-500/10 rounded-3xl border border-amber-500/20">
                <Utensils size={48} className="text-amber-500" />
              </div>
              <h3 className="text-6xl font-black tracking-tighter">Гастрономия</h3>
            </div>

            <div className="flex-1 space-y-20">
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h4 className={`text-2xl font-black uppercase tracking-widest ${isBoardMode ? "text-amber-400" : "text-amber-600"}`}>🥘 Фирменные Блюда</h4>
                  <span className="text-xs font-bold opacity-30 uppercase">Нажми для деталей</span>
                </div>
                <div className="grid gap-4">
                  {activeRegion.dishes.map((dishName, i) => {
                    const dishObj = dishes.find(d => d.name === dishName);
                    return (
                      <motion.div
                        whileHover={{ x: 10, scale: 1.02 }}
                        key={i}
                        onClick={() => dishObj && setSelectedDish(dishObj)}
                        className={`flex items-center justify-between p-7 rounded-[32px] border-2 cursor-pointer transition-all ${isBoardMode ? "glass-card border-white/5 hover:bg-white/10" : "bg-gray-50 border-gray-100 hover:bg-amber-50"
                          }`}
                      >
                        <span className="text-3xl font-black">{dishName}</span>
                        <div className="h-12 w-12 rounded-full border-2 border-amber-500/20 flex items-center justify-center text-amber-500 transition-colors">
                          <ChevronRight size={24} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* DRINKS BLOCK */}
              <section className="relative">
                <div className="flex items-center gap-4 mb-10">
                  <h4 className={`text-2xl font-black uppercase tracking-widest ${isBoardMode ? "text-blue-400" : "text-blue-600"}`}>🥛 Традиционные Напитки</h4>
                  <div className="flex-1 h-[2px] bg-blue-500/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {activeRegion.drinks.map((drink, i) => (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      key={i}
                      onClick={() => setSelectedDrink(drink)}
                      className={`p-8 rounded-[40px] border-4 relative overflow-hidden group cursor-pointer transition-all ${isBoardMode ? "glass-card border-white/10" : "bg-white border-white shadow-xl hover:shadow-2xl"
                        }`}
                    >
                      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity grayscale group-hover:grayscale-0 duration-700">
                        <Image
                          src={drink.iconType === "milk" ? "/images/icons/kumis.png" : drink.iconType === "tea" ? "/images/icons/tea.png" : "/images/icons/ayran.png"}
                          alt="" width={150} height={150}
                        />
                      </div>

                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-4 rounded-2xl ${isBoardMode ? "bg-white/5 border border-white/10" : "bg-blue-50 border border-blue-100"}`}>
                            <Image
                              src={drink.iconType === "milk" ? "/images/icons/kumis.png" : drink.iconType === "tea" ? "/images/icons/tea.png" : "/images/icons/ayran.png"}
                              alt="" width={32} height={32}
                            />
                          </div>
                          <h5 className="text-2xl font-black">{drink.name}</h5>
                        </div>
                        <p className="text-sm font-medium opacity-60 leading-relaxed pr-8">
                          {drink.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                            {drink.benefit}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Featured Dishes Section */}
        <section className="pt-20">
          <div className="flex items-center gap-10 mb-20 px-8">
            <h2 className="text-7xl font-black tracking-tighter uppercase premium-text-glow">Визитные карточки</h2>
            <div className="flex-1 h-[4px] bg-amber-500/10 hidden md:block" />
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {activeRegion.featuredDishSlugs.map((slug, i) => {
              const dish = dishesBySlug[slug];
              if (!dish) return null;
              return (
                <motion.div
                  key={slug}
                  whileHover={{ y: -20 }}
                  onClick={() => setSelectedDish(dish)}
                  className={`rounded-[50px] overflow-hidden border-4 h-full flex flex-col cursor-pointer transition-all ${isBoardMode ? "glass-card border-white/5 shadow-2xl" : "bg-white border-white shadow-xl hover:shadow-2xl"
                    }`}
                >
                  <div className="relative h-80 w-full group">
                    <Image src={dish.image} alt={dish.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                      <span className="inline-block px-4 py-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl mb-4">
                        Premium Taste
                      </span>
                      <h4 className="text-4xl font-black leading-none">{dish.name}</h4>
                    </div>
                  </div>
                  <div className="p-12 flex-1 flex flex-col justify-between space-y-8">
                    <p className={`text-xl leading-relaxed opacity-70 ${isBoardMode ? "text-gray-300" : "text-gray-600"}`}>
                      {dish.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 text-amber-500 font-black uppercase tracking-widest text-sm">
                      <span>Смотреть детали</span>
                      <div className="h-[2px] flex-1 bg-amber-500/20" />
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className={`mt-40 py-24 text-center border-t-4 relative z-20 ${isBoardMode ? "border-white/5 bg-black/60 text-white/40" : "border-white bg-white text-gray-500 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
        }`}>
        <div className="container mx-auto px-8">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3 text-2xl font-black uppercase tracking-[0.4em] text-amber-500 mb-4">
              <ChefHat size={40} /> <span>Дәм Дала</span>
            </div>
            <p className="text-2xl font-medium max-w-2xl leading-relaxed text-balance">
              © 2024 — Премиальная интерактивная гастрономическая карта Казахстана.
              Разработано специально для национальных павильонов и презентаций.
            </p>
            <div className="flex gap-8 opacity-40 text-xs font-black uppercase tracking-widest mt-8">
              <span>National Heritage</span>
              <span>•</span>
              <span>Authentic Flavors</span>
              <span>•</span>
              <span>Modern Presentation</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS INTEGRATION */}
      <DishModal
        dish={selectedDish}
        isOpen={selectedDish !== null}
        onClose={() => setSelectedDish(null)}
        isDark={isBoardMode}
      />

      <DrinkModal
        drink={selectedDrink}
        isOpen={selectedDrink !== null}
        onClose={() => setSelectedDrink(null)}
        isDark={isBoardMode}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${isBoardMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}; 
          border-radius: 20px; 
        }
      `}</style>
    </main>
  );
}
