'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Book, Code2, Package, Zap, Shield } from 'lucide-react';
import { PageTransition } from '@/components/page-transition';
import { cn } from '@/lib/utils';

const docSections = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: Zap,
    articles: [
      { title: 'Account Setup Guide', slug: 'setup' },
      { title: 'Menu Installation', slug: 'menu-install' },
      { title: 'Executor Setup', slug: 'executor-setup' },
      { title: 'System Requirements', slug: 'requirements' },
    ],
  },
  {
    id: 'menus',
    label: 'Mod Menus',
    icon: Package,
    articles: [
      { title: 'Vanity Menu Guide', slug: 'vanity' },
      { title: 'Cryptic Menu Guide', slug: 'cryptic' },
      { title: 'RedM Menu Guide', slug: 'redm-menu' },
      { title: 'Nightfall RedM Guide', slug: 'nightfall' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Executors',
    icon: Code2,
    articles: [
      { title: 'Ham Executor Guide', slug: 'ham-executor' },
      { title: 'Ham Spoofer Setup', slug: 'ham-spoofer' },
      { title: 'FiveM RootTool', slug: 'roottool' },
      { title: 'Anti-Spoof Bypasser', slug: 'bypasser' },
    ],
  },
  {
    id: 'accounts',
    label: 'Accounts & Codes',
    icon: Shield,
    articles: [
      { title: 'FiveM Ready Accounts', slug: 'fivem-accounts' },
      { title: 'RedM Ready Accounts', slug: 'redm-accounts' },
      { title: 'Rockstar Activation Codes', slug: 'rockstar-codes' },
      { title: 'Steam & Discord Accounts', slug: 'steam-discord' },
    ],
  },
  {
    id: 'support',
    label: 'Support & Licensing',
    icon: Shield,
    articles: [
      { title: 'License Management', slug: 'licenses' },
      { title: 'Replacement Warranty', slug: 'warranty' },
      { title: 'Discord Support', slug: 'discord-support' },
    ],
  },
];

export default function DocsPage() {
  const [active, setActive] = useState('getting-started');
  const [search, setSearch] = useState('');

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            <span className="text-gold-gradient">Documentation</span>
          </h1>
          <p className="text-white/50 text-lg">Everything you need to install, configure, and customize our products.</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="w-full h-12 pl-11 pr-4 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none"
          />
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass rounded-2xl p-3 border border-white/[0.06]">
              {docSections.map((section) => (
                <div key={section.id} className="mb-2">
                  <button
                    onClick={() => setActive(section.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                      active === section.id
                        ? 'bg-gold-500/15 text-gold-400'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </button>
                  {active === section.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-7 mt-1 space-y-1"
                    >
                      {section.articles.map((art) => (
                        <a
                          key={art.slug}
                          href="#"
                          className="block px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {art.title}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="min-h-[60vh]">
            <div className="glass rounded-2xl p-8 border border-white/[0.06]">
              <h2 className="font-display text-2xl font-bold text-white mb-4">Getting Started</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Welcome to Nexus Dev. This guide covers everything you need to get started with your purchase, from accounts to menus and tools.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gold-500/15 text-gold-400 text-xs flex items-center justify-center font-bold">1</span>
                    Join our Discord
                  </h3>
                  <p className="text-white/50 text-sm ml-8">
                    All purchases are handled through our official Discord server. Join and open a support ticket to get started with your order.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gold-500/15 text-gold-400 text-xs flex items-center justify-center font-bold">2</span>
                    Receive your product
                  </h3>
                  <p className="text-white/50 text-sm ml-8">
                    After purchase, our staff will deliver your product directly via Discord, including any license keys, download links, and setup instructions.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gold-500/15 text-gold-400 text-xs flex items-center justify-center font-bold">3</span>
                    Install and configure
                  </h3>
                  <p className="text-white/50 text-sm ml-8 mb-2">
                    Follow the product-specific instructions provided by our team. Most tools and menus are ready to use within minutes.
                  </p>
                  <div className="ml-8 rounded-xl bg-black/40 border border-white/10 p-4 font-mono text-xs text-white/60 overflow-x-auto">
                    <div className="text-white/30"># Example: Ham Executor launch</div>
                    <div className="text-emerald-400">./HamExecutor.exe</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gold-500/15 text-gold-400 text-xs flex items-center justify-center font-bold">4</span>
                    Get support anytime
                  </h3>
                  <p className="text-white/50 text-sm ml-8">
                    If you need help, just open another ticket on Discord. Our support team is available to assist you with installation, configuration, or troubleshooting.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gold-500/5 border border-gold-500/15">
                <p className="text-sm text-gold-400/80 flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Need help? Join our Discord and open a support ticket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
