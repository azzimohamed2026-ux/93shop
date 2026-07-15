'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowRight, MessageCircle } from 'lucide-react';
import { PageTransition } from '@/components/page-transition';
import { useDiscord } from '@/lib/discord-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { user, loading, signInWithDiscord } = useDiscord();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push('/dashboard');
  }, [user, loading, router]);

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(8,8,8,0.8)',
              border: '1px solid rgba(59,130,246,0.15)',
              boxShadow: '0 0 60px rgba(59,130,246,0.08)',
            }}
          >
            <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />

            <div className="p-8 sm:p-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold">
                  <span className="font-display font-bold text-black text-2xl">N</span>
                </div>
              </div>

              <h1 className="font-display text-2xl font-bold text-white mb-2">Create account</h1>
              <p className="text-white/50 text-sm mb-8">
                Join Nexus Dev by signing in with Discord
              </p>

              <button
                onClick={signInWithDiscord}
                className="flex items-center justify-center gap-3 w-full rounded-xl font-display font-semibold text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #5865F2, #4752C4)',
                  boxShadow: '0 4px 20px rgba(88,101,242,0.4)',
                  height: '52px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(88,101,242,0.6)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(88,101,242,0.4)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                <svg className="w-6 h-6 fill-white" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                Continue with Discord
              </button>

              <a
                href="https://discord.gg/3Tj8xZYHT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-white/50 hover:text-gold-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Join our Discord server
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
                <Shield className="w-3.5 h-3.5" />
                Secure OAuth authentication via Discord
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
