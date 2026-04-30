"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Link as LinkIcon, Smartphone, X } from "lucide-react";

interface QrModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export default function QrModal({
  url,
  isOpen,
  onClose,
  isDark,
}: QrModalProps) {
  const [copied, setCopied] = useState(false);

  const handleClose = useCallback(() => {
    setCopied(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!url) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className={`w-full max-w-2xl overflow-hidden rounded-[32px] border-4 shadow-2xl ${
                isDark
                  ? "bg-[#101114]/96 border-white/10 text-white"
                  : "bg-white border-white text-gray-900"
              }`}
            >
              <div className="relative p-6 sm:p-8 md:p-10">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-full bg-black/10 p-2 transition-all hover:scale-110 hover:bg-black/20"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.35em] text-amber-500">
                    <Smartphone className="h-5 w-5" />
                    <span>Сканируй и открывай</span>
                  </div>

                  <div
                    className={`rounded-[28px] p-6 shadow-xl ${isDark ? "bg-white" : "bg-gray-50"}`}
                  >
                    <QRCodeSVG
                      value={url}
                      size={240}
                      level="Q"
                      includeMargin
                      bgColor={isDark ? "#ffffff" : "#f9fafb"}
                      fgColor="#111827"
                    />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tighter">
                      Открой сайт с телефона
                    </h2>
                    <p
                      className={`max-w-md text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Наведи камеру на QR-код, чтобы мгновенно перейти на эту же
                      страницу с любого устройства.
                    </p>
                  </div>

                  <div
                    className={`w-full rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-2 text-left text-[10px] font-black uppercase tracking-[0.35em] opacity-60">
                      <LinkIcon className="h-4 w-4" />
                      <span>Адрес страницы</span>
                    </div>
                    <p className="mt-2 break-all text-sm font-semibold">
                      {url}
                    </p>
                  </div>

                  <button
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.2em] transition-all ${
                      isDark
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Скопировано" : "Скопировать ссылку"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
