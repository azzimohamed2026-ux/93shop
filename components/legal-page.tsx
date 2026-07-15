'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/page-transition';
import { SectionHeading } from '@/components/section-heading';

export function LegalPage({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs text-gold-400/80 uppercase tracking-[0.2em] mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">{title}</h1>
          <p className="text-white/50 text-lg mb-2">{subtitle}</p>
          <p className="text-sm text-white/30">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2 className="font-display text-xl font-semibold text-white mb-3">
                {i + 1}. {section.heading}
              </h2>
              {section.body.map((p, j) => (
                <p key={j} className="text-white/50 leading-relaxed mb-3 text-sm">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
