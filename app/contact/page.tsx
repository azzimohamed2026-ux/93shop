'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, MapPin, Clock, LifeBuoy } from 'lucide-react';
import { PageTransition } from '@/components/page-transition';
import { PremiumButton } from '@/components/premium-button';
import { toast } from 'sonner';

const contactMethods = [
  { icon: MessageCircle, label: 'Discord', value: 'Join our server', desc: 'Fastest way to reach us - click to join', href: 'https://discord.gg/3Tj8xZYHT', external: true },
  { icon: Mail, label: 'Email', value: 'support@nexusdev.io', desc: 'We reply within 24 hours', href: 'mailto:support@nexusdev.io', external: false },
  { icon: LifeBuoy, label: 'Support Tickets', value: 'Open a ticket', desc: 'Via our Discord server', href: 'https://discord.gg/3Tj8xZYHT', external: true },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs text-gold-400/80 uppercase tracking-[0.2em] mb-3">Get in touch</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              We're here to <span className="text-gold-gradient">help</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Questions, feedback, or need a custom solution? Our team is ready to assist you.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {contactMethods.map((m, i) => (
              <motion.a
                key={m.label}
                href={m.href}
                {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-gold-500/20 transition-colors block"
              >
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3">
                  <m.icon className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-display font-semibold text-white">{m.label}</h3>
                <p className="text-gold-400 text-sm mt-1">{m.value}</p>
                <p className="text-white/40 text-xs mt-1">{m.desc}</p>
              </motion.a>
            ))}

            <div className="glass rounded-2xl p-6 border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-white font-medium">Business Hours</span>
              </div>
              <p className="text-xs text-white/40">Monday - Friday: 9AM - 6PM (CET)</p>
              <p className="text-xs text-white/40">Weekend: Limited support via Discord</p>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 border border-white/[0.06]"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full h-11 px-4 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full h-11 px-4 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Subject</label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                  className="w-full h-11 px-4 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none resize-none"
                />
              </div>
              <PremiumButton type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <Send className="w-4 h-4" />}
              </PremiumButton>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
