"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Info, Utensils, Clock, Flame } from "lucide-react";
import { Dish } from "@/lib/kazakhCuisineData";

interface DishModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export default function DishModal({ dish, isOpen, onClose, isDark }: DishModalProps) {
  if (!dish) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`pointer-events-auto w-full max-w-4xl overflow-hidden rounded-[40px] border-4 shadow-2xl ${
                isDark 
                  ? "bg-[#111112]/95 border-white/10 text-white" 
                  : "bg-white border-white text-gray-900"
              }`}
            >
              <div className="relative grid grid-cols-1 md:grid-cols-2">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-6 top-6 z-10 rounded-full bg-black/20 p-2 text-white transition-all hover:bg-black/40 hover:scale-110 backdrop-blur-md"
                >
                  <X size={28} />
                </button>

                {/* Left: Image & Badge */}
                <div className="relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder while loading */}
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="inline-block px-4 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {dish.category}
                    </span>
                    <h2 className="mt-2 text-5xl font-black tracking-tighter leading-none">
                      {dish.name}
                    </h2>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="p-10 md:p-12 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                  {/* Story */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <Info className="text-amber-500" size={24} />
                      <h3 className="text-xl font-black uppercase tracking-tight">История</h3>
                    </div>
                    <p className={`text-lg leading-relaxed opacity-80 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {dish.story}
                    </p>
                  </section>

                  {/* Ingredients */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <Utensils className="text-amber-500" size={24} />
                      <h3 className="text-xl font-black uppercase tracking-tight">Ингредиенты</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dish.ingredients.map((ing, i) => (
                        <span 
                          key={i} 
                          className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                            isDark ? "bg-white/5 border-white/5 shadow-inner shadow-white/5" : "bg-gray-100 border-gray-200 shadow-sm"
                          }`}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-5 rounded-3xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-2 mb-2 opacity-50">
                        <Flame size={16} />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Острота</span>
                      </div>
                      <div className="flex gap-1.5">
                        {[1, 2, 3].map((lvl) => (
                          <div 
                            key={lvl} 
                            className={`h-2 w-full rounded-full transition-all duration-500 ${
                              lvl <= dish.spiceLevel ? "bg-red-500 shadow-sm shadow-red-500/50" : "bg-gray-700/30"
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className={`p-5 rounded-3xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-2 mb-2 opacity-50">
                        <Clock size={16} />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Где найти</span>
                      </div>
                      <p className="text-sm font-black truncate">{dish.whereToTry}</p>
                    </div>
                  </div>

                  {/* Tourist Tip */}
                  <div className={`p-6 rounded-[32px] border-4 overflow-hidden relative ${
                    isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-100"
                  }`}>
                    <div className="relative z-10">
                      <p className={`text-xs font-black uppercase tracking-widest mb-2 ${isDark ? "text-amber-400" : "text-amber-600"}`}>
                        💡 Совет путешественнику
                      </p>
                      <p className="text-lg font-bold leading-relaxed italic opacity-95">
                        «{dish.touristTip}»
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
