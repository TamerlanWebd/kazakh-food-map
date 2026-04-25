"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Info, Sparkles, Heart } from "lucide-react";
import { Drink } from "@/lib/kazakhCuisineData";

interface DrinkModalProps {
  drink: Drink | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export default function DrinkModal({ drink, isOpen, onClose, isDark }: DrinkModalProps) {
  if (!drink) return null;

  const iconSrc = drink.iconType === "milk" ? "/images/icons/kumis.png" : drink.iconType === "tea" ? "/images/icons/tea.png" : "/images/icons/ayran.png";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`pointer-events-auto w-full max-w-2xl overflow-hidden rounded-[30px] md:rounded-[50px] border-4 shadow-2xl relative ${
                isDark 
                  ? "bg-[#0a0c10]/95 border-white/10 text-white" 
                  : "bg-white/95 border-white text-gray-900"
              }`}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 md:right-8 md:top-8 z-10 rounded-full bg-black/10 p-2 text-current transition-all hover:bg-black/20 hover:scale-110"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="p-8 md:p-12 text-center space-y-6 md:space-y-8">
                {/* 3D Icon Container */}
                <div className="relative mx-auto w-32 h-32 md:w-48 md:h-48 premium-glow">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Image
                      src={iconSrc}
                      alt={drink.name}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2 md:space-y-4">
                  <span className={`inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"
                  }`}>
                    Традиционный напиток
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter">{drink.name}</h2>
                </div>

                <p className={`text-base md:text-xl leading-relaxed opacity-80 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {drink.description}
                </p>

                <div className={`p-6 md:p-8 rounded-[30px] md:rounded-[40px] border-2 flex flex-col items-center gap-3 md:gap-4 transition-colors ${
                  isDark ? "bg-white/5 border-white/10" : "bg-blue-50/50 border-blue-100"
                }`}>
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-black uppercase tracking-widest text-blue-500">
                    <Heart className="animate-pulse w-4 h-4 md:w-5 md:h-5" />
                    <span>Полезные свойства</span>
                  </div>
                  <p className="text-xl md:text-2xl font-black italic">
                    «{drink.benefit}»
                  </p>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                   <div className="flex items-center gap-2 opacity-40">
                      <Sparkles size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Natural</span>
                   </div>
                   <div className="flex items-center gap-2 opacity-40">
                      <Info size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Heritage</span>
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
