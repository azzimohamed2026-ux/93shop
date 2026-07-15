'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gamepad2, Github, Twitter, Youtube, MessageCircle, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { PremiumButton } from './premium-button';

const footerLinks = {
  Products: [
    { label: 'Bundles', href: '/store?category=bundles' },
    { label: 'Mod Menus', href: '/store?category=menus' },
    { label: 'Accounts', href: '/store?category=accounts' },
    { label: 'Tools', href: '/store?category=tools' },
    { label: 'Activation Codes', href: '/store?category=codes' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Documentation', href: '/docs' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Admin Dashboard', href: '/admin' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refunds' },
  ],
  Account: [
    { label: 'Login with Discord', href: '/login' },
    { label: 'My Dashboard', href: '/dashboard' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Cart', href: '/cart' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative z-10 mt-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative -translate-y-16 rounded-3xl glass-strong border border-gold-500/15 p-8 sm:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Stay in the <span className="text-gold-gradient">loop</span>
              </h3>
              <p className="text-white/50 text-sm max-w-md">
                Get exclusive deals, product updates, and early access drops. Join 48,000+ subscribers.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors"
                />
              </div>
              <PremiumButton type="submit" variant="gold" size="lg">
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <Send className="w-4 h-4" />}
              </PremiumButton>
            </form>
          </div>
        </motion.div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold">
                <span className="font-display font-bold text-black text-xl">N</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                NEXUS<span className="text-gold-400">DEV</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-4">
              The premium marketplace for FiveM and RedM scripts, accounts, and tools. Trusted by 3,200+ servers worldwide.
            </p>
            <div className="flex gap-2">
              {[
                { icon: MessageCircle, href: 'https://discord.gg/3Tj8xZYHT', external: true },
                { icon: Twitter, href: '#', external: false },
                { icon: Youtube, href: '#', external: false },
                { icon: Github, href: '#', external: false },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="https://discord.gg/3Tj8xZYHT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 h-10 rounded-xl text-white text-sm font-medium transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #5865F2, #4752C4)', boxShadow: '0 2px 12px rgba(88,101,242,0.3)' }}
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              Join our Discord
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} NexusDev. All rights reserved. Not affiliated with Rockstar Games or Take-Two Interactive.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
