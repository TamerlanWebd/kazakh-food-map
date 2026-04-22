"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Loader2 } from "lucide-react";

interface MusicToggleProps {
  isDark: boolean;
}

export default function MusicToggle({ isDark }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using the specific file provided by the user.
  const audioSrc = "/Talasbek Tattimbet seri - Zira Naurzbayeva (128k).mp3";

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.volume = 0.4; // Set to a quiet volume as requested
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch((err) => {
        console.error("Playback failed:", err);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        preload="none"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        className={`flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-black transition-all border-2 shadow-lg ${
          isPlaying 
            ? "bg-amber-500 border-amber-400 text-white shadow-amber-500/20" 
            : isDark 
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
              : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
        }`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 size={18} />
            </motion.div>
          ) : isPlaying ? (
            <motion.div key="playing" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Volume2 size={18} />
            </motion.div>
          ) : (
            <motion.div key="muted" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <VolumeX size={18} />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="uppercase tracking-widest">
          {isPlaying ? "Атмосфера: ВКЛ" : "Атмосфера: ВЫКЛ"}
        </span>
      </motion.button>
    </div>
  );
}
