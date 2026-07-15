'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Shield,
  Package,
  Key,
  Wrench,
  LayoutGrid,
  Mail,
  Sun,
  Moon,
  MessageCircle,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useTheme } from '@/lib/theme-context';
import { useDiscord } from '@/lib/discord-context';

const DISCORD_URL = 'https://discord.gg/3Tj8xZYHT';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/store', label: 'Store' },
  { href: '/docs', label: 'Docs' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const categories = [
  { label: 'Bundles', href: '/store?category=bundles', icon: Package },
  { label: 'FiveM Ready Accounts', href: '/store?category=accounts', icon: Shield },
  { label: 'Mod Menus', href: '/store?category=menus', icon: LayoutGrid },
  { label: 'Tools', href: '/store?category=tools', icon: Wrench },
  { label: 'Activation Codes', href: '/store?category=codes', icon: Key },
  { label: 'Email Accounts', href: '/store?category=email-accounts', icon: Mail },
];

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 127.14 96.36" fill="currentColor">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { cartCount, wishlist } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, loading, signInWithDiscord, signOut } = useDiscord();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-9 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass-strong border-b border-white/[0.06] py-2' : 'py-4'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-shadow">
              <span className="font-display font-bold text-black text-lg">N</span>
            </div>
            <span className="font-display font-bold text-lg text-white hidden sm:block">
              NEXUS<span className="text-gold-400">DEV</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1">
                Categories <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', catOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2 w-64"
                  >
                    <div className="glass-strong rounded-2xl p-2 border border-white/[0.06] shadow-glass-lg">
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white"
                        >
                          <cat.icon className="w-4 h-4 text-gold-400/70" />
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm transition-colors relative',
                    active ? 'text-gold-400' : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <Link
              href="/store"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 hidden sm:flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Discord Join button */}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-xl text-white text-sm font-medium transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #4752C4)',
                boxShadow: '0 2px 12px rgba(88,101,242,0.3)',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 18px rgba(88,101,242,0.5)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 12px rgba(88,101,242,0.3)')}
            >
              <DiscordIcon className="w-4 h-4" />
              <span className="hidden md:block">Discord</span>
            </a>

            {/* User / Discord login */}
            {!loading && !user && (
              <button
                onClick={signInWithDiscord}
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Login with Discord"
              >
                <UserIcon className="w-5 h-5" />
              </button>
            )}
            {!loading && user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 h-10 px-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-7 h-7 rounded-full border border-white/20"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-white/60" />
                    </div>
                  )}
                  <span className="hidden md:block text-sm text-white/80 max-w-[100px] truncate">
                    {user.username}
                  </span>
                  <ChevronDown className="w-3 h-3 text-white/40" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 pt-2 w-56"
                    >
                      <div className="glass-strong rounded-2xl p-2 border border-white/[0.06] shadow-glass-lg">
                        <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                          <p className="text-xs text-white/40">Signed in as</p>
                          <p className="text-sm text-white font-medium truncate">{user.username}</p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white"
                        >
                          <UserIcon className="w-4 h-4 text-gold-400/70" />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm text-white/70 hover:text-white w-full"
                        >
                          <LogOut className="w-4 h-4 text-gold-400/70" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-white"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-[61] w-[85%] max-w-sm glass-strong border-l border-white/10 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-lg text-white">
                  NEXUS<span className="text-gold-400">DEV</span>
                </span>
                <button onClick={() => setMobileOpen(false)} className="text-white/60">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-base transition-colors',
                      pathname === link.href
                        ? 'bg-gold-500/10 text-gold-400'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="px-4 text-xs text-white/40 uppercase tracking-wider mb-2">Categories</p>
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-sm text-white/70"
                    >
                      <cat.icon className="w-4 h-4 text-gold-400/70" />
                      {cat.label}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white transition-colors hover:bg-white/5"
                    style={{ background: 'rgba(88,101,242,0.15)' }}
                  >
                    <DiscordIcon className="w-5 h-5 text-[#5865F2]" />
                    Join our Discord
                  </a>
                  {!loading && !user && (
                    <button
                      onClick={signInWithDiscord}
                      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5"
                    >
                      <UserIcon className="w-5 h-5" />
                      Login with Discord
                    </button>
                  )}
                  {!loading && user && (
                    <>
                      <Link href="/dashboard" className="block px-4 py-3 rounded-xl text-white/70 hover:bg-white/5">
                        Dashboard
                      </Link>
                      <button
                        onClick={signOut}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign out
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
