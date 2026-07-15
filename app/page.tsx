'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Code2,
  Download,
  Star,
  TrendingUp,
  Users,
  Package,
  Headphones,
  ChevronRight,
} from 'lucide-react';
import { PremiumButton } from '@/components/premium-button';
import { AnimatedCounter } from '@/components/animated-counter';
import { SectionHeading } from '@/components/section-heading';
import { ProductCard } from '@/components/product-card';
import { Marquee } from '@/components/marquee';
import { products, testimonials, stats, trustedServers, faqs } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';
import { RatingStars } from '@/components/product-badge';

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === 'best-seller').concat(products.slice(4, 8)).slice(0, 8);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs text-gold-400 font-medium">Trusted by 3,200+ servers worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight"
            >
              Your ultimate FiveM
              <br />
              <span className="text-gold-gradient text-glow-gold">domination</span>
              <br />
              starts here
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
            >
              The marketplace for elite scripts, accounts, menus, and tools. Crafted with obsessive attention to detail, optimized for performance, and backed by lifetime support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/store">
                <PremiumButton variant="gold" size="xl" className="w-full sm:w-auto">
                  Explore the Store <ArrowRight className="w-4 h-4" />
                </PremiumButton>
              </Link>
              <Link href="/docs">
                <PremiumButton variant="glass" size="xl" className="w-full sm:w-auto">
                  Read the Docs
                </PremiumButton>
              </Link>
            </motion.div>

            {/* Floating preview cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
            >
              {[
                { icon: Zap, label: 'Instant Delivery', desc: 'Get your products in seconds' },
                { icon: Shield, label: 'Secure Purchases', desc: 'Discord-verified transactions' },
                { icon: Code2, label: 'Lifetime Updates', desc: 'Free updates on all scripts' },
                { icon: Headphones, label: '24/7 Support', desc: 'Expert help when you need it' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-5 text-left border border-white/[0.06] hover:border-gold-500/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-white">{f.label}</h3>
                  <p className="text-xs text-white/40 mt-1">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY MARQUEE */}
      <section className="py-12 border-y border-white/[0.04]">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/30 mb-8">
          Powering the biggest servers
        </p>
        <Marquee items={trustedServers} />
      </section>

      {/* STATS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-gradient mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <SectionHeading
              center={false}
              eyebrow="Handpicked"
              title={<>Featured <span className="text-gold-gradient">products</span></>}
              subtitle="Our most-loved scripts and tools, chosen by the community."
            />
            <Link href="/store">
              <PremiumButton variant="gold-outline" size="md">
                View All <ArrowRight className="w-4 h-4" />
              </PremiumButton>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SHOWCASE */}
      <CategoryShowcase />

      {/* BEST SELLERS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Trending"
            title={<>Best <span className="text-gold-gradient">sellers</span></>}
            subtitle="The products our customers keep coming back for."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {bestSellers.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* DISCORD CTA */}
      <DiscordCTA />

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Questions"
            title={<>Frequently asked <span className="text-gold-gradient">questions</span></>}
            subtitle="Everything you need to know about our products and policies."
          />
          <div className="mt-12">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="glass rounded-2xl px-6 border border-white/[0.06] overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-white hover:text-gold-400 transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/50 text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryShowcase() {
  const cats = [
    { label: 'Bundles', desc: 'Save 25% on combos', icon: Package, count: '3 products', href: '/store?category=bundles' },
    { label: 'Accounts', desc: 'FiveM, RedM, Steam, Discord', icon: Shield, count: '5 products', href: '/store?category=accounts' },
    { label: 'Mod Menus', desc: 'Vanity, Cryptic & more', icon: Sparkles, count: '5 products', href: '/store?category=menus' },
    { label: 'Tools', desc: 'Executors, spoofers & bypass', icon: Zap, count: '3 products', href: '/store?category=tools' },
    { label: 'Activation Codes', desc: 'Rockstar codes', icon: Code2, count: '1 product', href: '/store?category=codes' },
    { label: 'Email Accounts', desc: 'Aged & verified', icon: Shield, count: '1 product', href: '/store?category=email-accounts' },
  ];
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Explore"
          title={<>Shop by <span className="text-gold-gradient">category</span></>}
          subtitle="From scripts to security, find exactly what your server needs."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={cat.href}>
                <div className="group glass rounded-2xl p-6 border border-white/[0.06] hover:border-gold-500/30 transition-all duration-300 card-3d flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors shrink-0">
                    <cat.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-white group-hover:text-gold-400 transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-white/40 mt-0.5">{cat.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Loved by <span className="text-gold-gradient">thousands</span></>}
          subtitle="Don't take our word for it. Here's what server owners say."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-gold-500/20 transition-colors"
            >
              <RatingStars rating={t.rating} size="md" />
              <p className="mt-4 text-white/70 text-sm leading-relaxed">"{t.content}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-white">{t.author}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiscordCTA() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl glass-strong border border-[#5865F2]/20 p-10 sm:p-16 overflow-hidden text-center"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, #5865F2, transparent 70%)' }}
          />
          <div className="relative">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-[#5865F2]/20 items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Join our <span className="text-[#5865F2]">community</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Connect with 25,000+ developers and server owners. Get support, share your projects, and access exclusive community-only deals.
            </p>
            <a href="https://discord.gg/3Tj8xZYHT" target="_blank" rel="noopener noreferrer" className="inline-block">
              <PremiumButton variant="gold" size="xl">
                Join the Discord <ArrowRight className="w-4 h-4" />
              </PremiumButton>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
