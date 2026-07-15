'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ExternalLink, MessageCircle } from 'lucide-react';

const DISCORD_URL = 'https://discord.gg/3Tj8xZYHT';

interface DiscordModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

export function DiscordModal({ open, onClose, productName }: DiscordModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(8,8,8,0.97)',
                border: '1px solid rgba(59,130,246,0.2)',
                boxShadow: '0 0 80px rgba(59,130,246,0.15), 0 25px 50px rgba(0,0,0,0.6)',
              }}
            >
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />

              <div className="p-8">
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Shield icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h2 className="font-display text-2xl font-bold text-white mb-2">Secure Purchase</h2>
                  {productName && (
                    <p className="text-sm text-blue-400/80 mb-3 font-medium">{productName}</p>
                  )}
                  <p className="text-white/60 text-sm leading-relaxed">
                    To purchase this product safely, please join our official Discord server and open a support ticket.
                  </p>
                </div>

                {/* Info box */}
                <div className="rounded-2xl bg-blue-500/5 border border-blue-500/15 p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-white/70 leading-relaxed">
                      Our staff will personally assist you throughout the purchase process to guarantee a{' '}
                      <span className="text-white font-medium">secure transaction</span> and{' '}
                      <span className="text-white font-medium">excellent customer service</span>.
                    </p>
                  </div>
                </div>

                {/* Discord button */}
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full h-13 rounded-xl font-display font-semibold text-white transition-all duration-200 group"
                  style={{
                    background: 'linear-gradient(135deg, #5865F2, #4752C4)',
                    boxShadow: '0 4px 20px rgba(88,101,242,0.4)',
                    height: '52px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(88,101,242,0.6)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(88,101,242,0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                  Join our Discord
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>

                <p className="text-center text-xs text-white/30 mt-4">
                  No billing information required. Staff will assist you directly.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
