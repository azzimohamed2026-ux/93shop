'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Download as DownloadIcon,
  Key,
  Ticket,
  LifeBuoy,
  Heart,
  Settings,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { PremiumButton } from '@/components/premium-button';
import { PageTransition } from '@/components/page-transition';
import { useCart } from '@/lib/cart-context';
import { products } from '@/lib/data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'downloads', label: 'Download Center', icon: DownloadIcon },
  { id: 'licenses', label: 'License Management', icon: Key },
  { id: 'orders', label: 'Order History', icon: ShoppingBag },
  { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Demo data
const demoOrders = [
  { id: 'ORD-2841', date: '2026-07-12', items: 3, total: 109.97, status: 'completed' },
  { id: 'ORD-2798', date: '2026-06-28', items: 1, total: 34.99, status: 'completed' },
  { id: 'ORD-2755', date: '2026-06-15', items: 2, total: 64.98, status: 'completed' },
];

const demoLicenses = [
  { product: 'Ham Executor', key: 'NEXUS-HEX-XXXX-XXXX-XXXX', servers: 1, status: 'active' },
  { product: 'Vanity Menu', key: 'NEXUS-VAN-XXXX-XXXX-XXXX', servers: 1, status: 'active' },
  { product: 'Ham Spoofer', key: 'NEXUS-HSP-XXXX-XXXX-XXXX', servers: 1, status: 'active' },
];

const demoTickets = [
  { id: 'TKT-1024', subject: 'Ham Executor installation help', status: 'open', date: '2026-07-10' },
  { id: 'TKT-1019', subject: 'License transfer request', status: 'resolved', date: '2026-06-30' },
];

export default function DashboardPage() {
  const [active, setActive] = useState('overview');
  const { wishlist } = useCart();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            My <span className="text-gold-gradient">Dashboard</span>
          </h1>
          <p className="text-white/50">Welcome back, John</p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass rounded-2xl p-3 border border-white/[0.06]">
              {/* User card */}
              <div className="flex items-center gap-3 p-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-display font-bold text-black">
                  JD
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-white">John Doe</p>
                  <p className="text-xs text-white/40">Premium Member</p>
                </div>
              </div>
              <div className="h-px bg-white/[0.06] my-2" />
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                    active === item.id
                      ? 'bg-gold-500/15 text-gold-400'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {item.id === 'wishlist' && wishlist.length > 0 && (
                    <span className="ml-auto px-1.5 py-0.5 rounded-md bg-gold-500/20 text-gold-400 text-xs">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="min-h-[60vh]">
            {active === 'overview' && <OverviewSection />}
            {active === 'downloads' && <DownloadsSection />}
            {active === 'licenses' && <LicensesSection />}
            {active === 'orders' && <OrdersSection />}
            {active === 'tickets' && <TicketsSection />}
            {active === 'wishlist' && <WishlistSection />}
            {active === 'settings' && <SettingsSection />}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function OverviewSection() {
  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-gold-400' },
    { label: 'Active Licenses', value: '3', icon: Key, color: 'text-emerald-400' },
    { label: 'Total Spent', value: '€89.97', icon: DollarSign, color: 'text-sky-400' },
    { label: 'Open Tickets', value: '1', icon: LifeBuoy, color: 'text-rose-400' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-white/[0.06]"
          >
            <s.icon className={cn('w-5 h-5 mb-3', s.color)} />
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 border border-white/[0.06]">
        <h3 className="font-display font-semibold text-white mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {demoOrders.map((o) => (
            <div key={o.id} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{o.id}</p>
                <p className="text-xs text-white/40">{o.date} • {o.items} items</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gold-400 font-medium">€{o.total}</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-xs">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DownloadsSection() {
  const ownedProducts = products.slice(0, 5);
  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-xl text-white mb-4">Your Downloads</h3>
      {ownedProducts.map((p) => (
        <div key={p.id} className="glass rounded-2xl p-4 border border-white/[0.06] flex items-center gap-4">
          <img src={p.thumbnail} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-sm text-white truncate">{p.name}</p>
            <p className="text-xs text-white/40 mt-0.5">Version 2.1.0 • Updated {p.lastUpdated}</p>
          </div>
          <PremiumButton size="sm" variant="gold" onClick={() => toast.success('Download started')}>
            <DownloadIcon className="w-3.5 h-3.5" /> Download
          </PremiumButton>
        </div>
      ))}
    </div>
  );
}

function LicensesSection() {
  return (
    <div>
      <h3 className="font-display font-semibold text-xl text-white mb-4">License Management</h3>
      <div className="space-y-3">
        {demoLicenses.map((l, i) => (
          <div key={i} className="glass rounded-2xl p-5 border border-white/[0.06]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-display font-semibold text-white">{l.product}</p>
                <p className="text-xs text-white/40 mt-1">License Key</p>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-xs">{l.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-sm text-gold-400 font-mono">
                {l.key}
              </code>
              <PremiumButton size="sm" variant="glass" onClick={() => toast.success('Copied to clipboard')}>
                Copy
              </PremiumButton>
              <PremiumButton size="sm" variant="glass" onClick={() => toast.info('Transfer dialog opened')}>
                Transfer
              </PremiumButton>
            </div>
            <p className="text-xs text-white/40 mt-2">{l.servers} server license(s)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersSection() {
  return (
    <div>
      <h3 className="font-display font-semibold text-xl text-white mb-4">Order History</h3>
      <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/[0.06] text-xs text-white/40 uppercase tracking-wider">
          <span>Order ID</span>
          <span>Date</span>
          <span>Total</span>
          <span>Status</span>
        </div>
        {demoOrders.map((o) => (
          <div key={o.id} className="grid grid-cols-4 gap-4 p-4 border-b border-white/[0.04] last:border-0 text-sm">
            <span className="text-white font-medium">{o.id}</span>
            <span className="text-white/50">{o.date}</span>
            <span className="text-gold-400">€{o.total}</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TicketsSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-xl text-white">Support Tickets</h3>
        <PremiumButton size="sm" variant="gold" onClick={() => toast.success('New ticket form opened')}>
          New Ticket
        </PremiumButton>
      </div>
      <div className="space-y-3">
        {demoTickets.map((t) => (
          <div key={t.id} className="glass rounded-2xl p-5 border border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="font-display font-semibold text-white">{t.subject}</p>
              <p className="text-xs text-white/40 mt-1">{t.id} • {t.date}</p>
            </div>
            <span className={cn(
              'px-2 py-0.5 rounded-md text-xs',
              t.status === 'open' ? 'bg-sky-500/15 text-sky-400' : 'bg-emerald-500/15 text-emerald-400'
            )}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WishlistSection() {
  const { wishlist, toggleWishlist } = useCart();
  if (wishlist.length === 0) {
    return (
      <div className="text-center py-16 glass rounded-2xl border border-white/[0.06]">
        <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <h3 className="font-display text-xl text-white mb-2">Your wishlist is empty</h3>
        <p className="text-white/40 text-sm mb-4">Save products you love for later</p>
        <Link href="/store"><PremiumButton variant="gold">Browse Store</PremiumButton></Link>
      </div>
    );
  }
  return (
    <div>
      <h3 className="font-display font-semibold text-xl text-white mb-4">Your Wishlist</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {wishlist.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-4 border border-white/[0.06] flex gap-4">
            <img src={p.thumbnail} alt={p.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-display font-semibold text-sm text-white">{p.name}</p>
              <p className="text-gold-400 font-bold mt-1">€{p.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-2">
                <Link href={`/product/${p.slug}`}><PremiumButton size="sm" variant="gold">View</PremiumButton></Link>
                <PremiumButton size="sm" variant="glass" onClick={() => toggleWishlist(p)}>Remove</PremiumButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="font-display font-semibold text-xl text-white">Account Settings</h3>
      <div className="glass rounded-2xl p-6 border border-white/[0.06] space-y-5">
        {[
          { label: 'Full Name', value: 'John Doe' },
          { label: 'Email', value: 'john@example.com' },
          { label: 'Discord', value: 'johndoe#1234' },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-sm text-white/60 mb-2 block">{f.label}</label>
            <input
              defaultValue={f.value}
              className="w-full h-11 px-4 rounded-xl glass border border-white/10 text-white focus:border-gold-500/50 focus:outline-none transition-colors"
            />
          </div>
        ))}
        <PremiumButton variant="gold" onClick={() => toast.success('Settings saved')}>Save Changes</PremiumButton>
      </div>
      <div className="glass rounded-2xl p-6 border border-rose-500/20">
        <h4 className="font-display font-semibold text-white mb-2">Danger Zone</h4>
        <p className="text-sm text-white/40 mb-4">Permanently delete your account and all data.</p>
        <PremiumButton variant="destructive" size="sm" onClick={() => toast.error('Account deletion requires confirmation')}>
          Delete Account
        </PremiumButton>
      </div>
    </div>
  );
}
