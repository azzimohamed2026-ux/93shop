'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Shield, ExternalLink } from 'lucide-react';
import { PageTransition } from '@/components/page-transition';
import { DISCORD_INVITE_URL } from '@/lib/discord-context';

export default function CheckoutPage() {
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Secure <span className="text-gold-gradient">Purchase</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Complete your purchase safely through our official Discord server.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(8,8,8,0.8)',
            border: '1px solid rgba(59,130,246,0.2)',
            boxShadow: '0 0 60px rgba(59,130,246,0.1)',
          }}
        >
          <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
          <div className="p-8 sm:p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Secure Purchase</h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-6">
              To purchase this product safely, please join our official Discord server and open a support ticket.
            </p>
            <div className="rounded-2xl bg-blue-500/5 border border-blue-500/15 p-5 mb-6 max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/70 leading-relaxed text-left">
                  Our staff will personally assist you throughout the purchase process to guarantee a{' '}
                  <span className="text-white font-medium">secure transaction</span> and{' '}
                  <span className="text-white font-medium">excellent customer service</span>.
                </p>
              </div>
            </div>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-13 px-8 rounded-xl font-display font-semibold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #4752C4)',
                boxShadow: '0 4px 20px rgba(88,101,242,0.4)',
                height: '52px',
              }}
            >
              <svg className="w-6 h-6 fill-white" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              Join our Discord
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
            <p className="text-xs text-white/30 mt-4">
              No billing information required. Staff will assist you directly.
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
