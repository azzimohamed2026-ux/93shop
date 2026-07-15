'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Eye,
} from 'lucide-react';
import { PremiumButton } from '@/components/premium-button';
import { PageTransition } from '@/components/page-transition';
import { cn } from '@/lib/utils';
import { products } from '@/lib/data';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const sidebarItems = [
  { id: 'overview', label: 'Analytics', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const salesData = [
  { month: 'Jan', sales: 8200, orders: 180 },
  { month: 'Feb', sales: 9500, orders: 210 },
  { month: 'Mar', sales: 11200, orders: 260 },
  { month: 'Apr', sales: 10800, orders: 240 },
  { month: 'May', sales: 14500, orders: 320 },
  { month: 'Jun', sales: 18900, orders: 410 },
  { month: 'Jul', sales: 22300, orders: 480 },
];

const categoryData = [
  { name: 'Mod Menus', value: 35, color: '#3B82F6' },
  { name: 'Accounts', value: 30, color: '#60A5FA' },
  { name: 'Tools', value: 20, color: '#10b981' },
  { name: 'Bundles', value: 10, color: '#f43f5e' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const topProducts = [
  { name: 'Ham Executor', sales: 24100, revenue: 481759 },
  { name: 'Vanity Menu', sales: 18200, revenue: 545848 },
  { name: 'FiveM Ready Accounts', sales: 18900, revenue: 283311 },
  { name: 'Rockstar Activation Codes', sales: 24800, revenue: 322252 },
];

export default function AdminDashboardPage() {
  const [active, setActive] = useState('overview');

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Admin <span className="text-gold-gradient">Dashboard</span>
            </h1>
            <p className="text-white/50">Monitor your store performance</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-400">Live</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass rounded-2xl p-3 border border-white/[0.06]">
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
                </button>
              ))}
            </div>
          </aside>

          <div className="min-h-[60vh]">
            {active === 'overview' && <AnalyticsOverview />}
            {active === 'products' && <ProductsAdmin />}
            {active === 'orders' && <OrdersAdmin />}
            {active === 'customers' && <CustomersAdmin />}
            {active === 'reports' && <ReportsAdmin />}
            {active === 'settings' && <AdminSettings />}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function AnalyticsOverview() {
  const kpis = [
    { label: 'Revenue', value: '€94,840', change: '+18.2%', up: true, icon: DollarSign },
    { label: 'Orders', value: '2,100', change: '+12.4%', up: true, icon: ShoppingCart },
    { label: 'Customers', value: '48,200', change: '+8.1%', up: true, icon: Users },
    { label: 'Conversion', value: '3.2%', change: '-0.4%', up: false, icon: TrendingUp },
  ];
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-white/[0.06]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <k.icon className="w-4 h-4 text-gold-400" />
              </div>
              <span className={cn(
                'flex items-center gap-1 text-xs font-medium',
                k.up ? 'text-emerald-400' : 'text-rose-400'
              )}>
                {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {k.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-white">{k.value}</p>
            <p className="text-xs text-white/40 mt-1">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Sales chart */}
      <div className="glass rounded-2xl p-6 border border-white/[0.06]">
        <h3 className="font-display font-semibold text-white mb-4">Sales Overview</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: 'rgba(10,10,10,0.95)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '12px',
              }}
              labelStyle={{ color: '#3B82F6' }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div className="glass rounded-2xl p-6 border border-white/[0.06]">
          <h3 className="font-display font-semibold text-white mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(10,10,10,0.95)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/60">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span className="text-white/40">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="glass rounded-2xl p-6 border border-white/[0.06]">
          <h3 className="font-display font-semibold text-white mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/30 font-mono w-4">#{i + 1}</span>
                  <span className="text-sm text-white">{p.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gold-400 font-medium">${p.revenue.toLocaleString()}</p>
                  <p className="text-xs text-white/30">{p.sales.toLocaleString()} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsAdmin() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-xl text-white">Products ({products.length})</h3>
        <PremiumButton size="sm" variant="gold">Add Product</PremiumButton>
      </div>
      <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/[0.06] text-xs text-white/40 uppercase tracking-wider">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Sales</span>
          <span>Actions</span>
        </div>
        {products.slice(0, 10).map((p) => (
          <div key={p.id} className="grid grid-cols-5 gap-4 p-4 border-b border-white/[0.04] last:border-0 items-center text-sm">
            <div className="flex items-center gap-3 min-w-0">
              <img src={p.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
              <span className="text-white truncate">{p.name}</span>
            </div>
            <span className="text-white/50 text-xs">{p.categoryLabel}</span>
            <span className="text-gold-400">${p.price}</span>
            <span className="text-white/50">{p.downloads.toLocaleString()}</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white"><Eye className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersAdmin() {
  return (
    <div>
      <h3 className="font-display font-semibold text-xl text-white mb-4">Recent Orders</h3>
      <div className="glass rounded-2xl p-6 border border-white/[0.06] text-center">
        <ShoppingBag className="w-10 h-10 text-white/20 mx-auto mb-3" />
        <p className="text-white/50">Order management panel with full CRUD capabilities.</p>
      </div>
    </div>
  );
}

function CustomersAdmin() {
  return (
    <div>
      <h3 className="font-display font-semibold text-xl text-white mb-4">Customers</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Customers', value: '48,200' },
          { label: 'New This Month', value: '3,120' },
          { label: 'Active', value: '31,400' },
          { label: 'Avg. LTV', value: '€142' },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5 border border-white/[0.06]">
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsAdmin() {
  return (
    <div className="space-y-6">
      <h3 className="font-display font-semibold text-xl text-white">Reports</h3>
      <div className="glass rounded-2xl p-6 border border-white/[0.06]">
        <h4 className="font-display font-semibold text-white mb-4">Orders per Month</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
            <Tooltip
              contentStyle={{ background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px' }}
            />
            <Bar dataKey="orders" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="font-display font-semibold text-xl text-white">Store Settings</h3>
      <div className="glass rounded-2xl p-6 border border-white/[0.06] space-y-5">
        {['Store Name', 'Support Email', 'Currency', 'Tax Rate (%)'].map((f) => (
          <div key={f}>
            <label className="text-sm text-white/60 mb-2 block">{f}</label>
            <input className="w-full h-11 px-4 rounded-xl glass border border-white/10 text-white focus:border-gold-500/50 focus:outline-none" />
          </div>
        ))}
        <PremiumButton variant="gold">Save Settings</PremiumButton>
      </div>
    </div>
  );
}
