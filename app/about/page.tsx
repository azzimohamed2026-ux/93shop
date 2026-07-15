'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Zap, Shield, Users, Award, Globe } from 'lucide-react';
import { PageTransition } from '@/components/page-transition';
import { SectionHeading } from '@/components/section-heading';
import { AnimatedCounter } from '@/components/animated-counter';
import { stats } from '@/lib/data';
import { PremiumButton } from '@/components/premium-button';
import Link from 'next/link';

const values = [
  { icon: Zap, title: 'Performance First', desc: 'Every tool and menu is benchmarked and optimized for minimal impact. We refuse to ship anything that compromises your experience.' },
  { icon: Shield, title: 'Security by Design', desc: 'Our tools and accounts are built and verified by security professionals, not hobbyists. You deserve real protection and quality.' },
  { icon: Heart, title: 'Customer Obsessed', desc: '48,000+ customers trust us because we treat every ticket, every review, and every customer like they matter. Because they do.' },
  { icon: Award, title: 'Quality Over Quantity', desc: 'We would rather ship 18 exceptional products than 180 mediocre ones. Every release is handcrafted and rigorously tested.' },
];

const team = [
  { name: 'Alex Morgan', role: 'Founder & Lead Developer', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Sarah Chen', role: 'Head of Design', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Marcus Reid', role: 'Security Engineer', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Elena Vasquez', role: 'Customer Success', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="relative">
        {/* Hero */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-xs text-gold-400/80 uppercase tracking-[0.2em] mb-4">Our Story</p>
              <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                We build the tools that <span className="text-gold-gradient">power</span> the best servers
              </h1>
              <p className="text-white/50 text-lg sm:text-xl leading-relaxed">
                NexusDev was founded in 2021 by a team of FiveM and RedM enthusiasts who were tired of buggy, unoptimized, and poorly supported tools. We set out to build a marketplace where quality, performance, and customer support are non-negotiable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
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
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  </div>
                  <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Target, title: 'Our Mission', desc: 'To empower FiveM and RedM players with premium tools, menus, and accounts that elevate the gaming experience, backed by support you can count on.' },
                { icon: Eye, title: 'Our Vision', desc: 'To be the gold standard for FiveM and RedM modding tools and accounts — the first name players think of when they need quality, security, and support.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-3xl p-8 border border-white/[0.06]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              eyebrow="What we stand for"
              title={<>Our <span className="text-gold-gradient">values</span></>}
              subtitle="The principles that guide every product we build and every decision we make."
            />
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-gold-500/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                      <v.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white mb-1">{v.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeading
              eyebrow="The people behind it"
              title={<>Meet the <span className="text-gold-gradient">team</span></>}
              subtitle="A small, passionate team obsessed with building the best FiveM and RedM products."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="relative group mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-2xl object-cover mx-auto border border-white/10 group-hover:border-gold-500/30 transition-colors"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-white">{member.name}</h3>
                  <p className="text-xs text-white/40 mt-1">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-3xl p-12 border border-gold-500/15"
            >
              <Globe className="w-10 h-10 text-gold-400 mx-auto mb-4" />
              <h2 className="font-display text-3xl font-bold text-white mb-3">
                Join the NexusDev family
              </h2>
              <p className="text-white/50 mb-6">
                Become one of 48,000+ customers who trust us with their gaming experience.
              </p>
              <Link href="/store">
                <PremiumButton variant="gold" size="lg">Explore the Store</PremiumButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
