'use client';

import { motion } from 'framer-motion';
import { Search, HelpCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { PageTransition } from '@/components/page-transition';
import { SectionHeading } from '@/components/section-heading';
import { faqs } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PremiumButton } from '@/components/premium-button';
import Link from 'next/link';

const categories = ['All', 'Purchasing', 'Accounts', 'Menus', 'Tools', 'Support'];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gold-500/10 items-center justify-center mb-4">
              <HelpCircle className="w-7 h-7 text-gold-400" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h1>
            <p className="text-white/50 text-lg">Find answers to common questions about our products and services.</p>
          </motion.div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full h-12 pl-11 pr-4 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        {filtered.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((faq, i) => (
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
        ) : (
          <div className="text-center py-16 glass rounded-2xl border border-white/[0.06]">
            <Search className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">No results found for "{search}"</p>
          </div>
        )}

        {/* Still need help */}
        <div className="mt-12 text-center glass rounded-2xl p-8 border border-white/[0.06]">
          <MessageCircle className="w-10 h-10 text-gold-400 mx-auto mb-3" />
          <h3 className="font-display text-xl font-semibold text-white mb-2">Still have questions?</h3>
          <p className="text-white/50 text-sm mb-4">Our support team is available 24/7 to help you.</p>
          <Link href="/contact">
            <PremiumButton variant="gold">Contact Support</PremiumButton>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
