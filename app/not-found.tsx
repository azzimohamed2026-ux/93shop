'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { PremiumButton } from '@/components/premium-button';
import { PageTransition } from '@/components/page-transition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative inline-block mb-8"
          >
            <h1 className="font-display text-[120px] sm:text-[180px] font-bold leading-none text-gold-gradient">
              404
            </h1>
            <div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 60%)' }}
            />
          </motion.div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Page not found
          </h2>
          <p className="text-white/50 text-base sm:text-lg mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <PremiumButton variant="gold" size="lg">
                <Home className="w-4 h-4" /> Back to Home
              </PremiumButton>
            </Link>
            <Link href="/store">
              <PremiumButton variant="glass" size="lg">
                <Search className="w-4 h-4" /> Browse Store
              </PremiumButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
