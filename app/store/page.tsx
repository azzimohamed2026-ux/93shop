'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  Grid3x3,
  List,
  ChevronDown,
  Tag,
  Heart,
  Zap,
} from 'lucide-react';
import { products, categories } from '@/lib/data';
import { Product, ProductBadge } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { DiscordModal } from '@/components/discord-modal';
import { PremiumButton } from '@/components/premium-button';
import { PageTransition } from '@/components/page-transition';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RatingStars, ProductBadgeDisplay } from '@/components/product-badge';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
];

const badgeFilters: { value: ProductBadge | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'best-seller', label: 'Best Seller' },
  { value: 'new', label: 'New' },
  { value: 'popular', label: 'Popular' },
  { value: 'sale', label: 'On Sale' },
];

function StoreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toggleWishlist, isInWishlist } = useCart();
  const [discordProduct, setDiscordProduct] = useState<Product | null>(null);

  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCats([cat]);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category));
    }
    if (selectedBadges.length > 0) {
      result = result.filter((p) => p.badge && selectedBadges.includes(p.badge));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [search, selectedCats, selectedBadges, priceRange, sortBy]);

  const toggleCat = (id: string) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBadge = (b: string) => {
    setSelectedBadges((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setSelectedBadges([]);
    setPriceRange([0, 100]);
    setSearch('');
  };

  const activeFilterCount =
    selectedCats.length + selectedBadges.length + (search ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCats.includes(cat.id)}
                onCheckedChange={() => toggleCat(cat.id)}
                className="border-white/20 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
              />
              <Label
                htmlFor={`cat-${cat.id}`}
                className="text-sm text-white/60 cursor-pointer hover:text-white transition-colors flex-1"
              >
                {cat.label}
              </Label>
              <span className="text-xs text-white/30">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">
          Product Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {badgeFilters.map((b) => (
            <button
              key={b.value}
              onClick={() => (b.value === 'all' ? setSelectedBadges([]) : toggleBadge(b.value))}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                b.value === 'all'
                  ? selectedBadges.length === 0
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                    : 'glass text-white/50 hover:text-white'
                  : selectedBadges.includes(b.value)
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                    : 'glass text-white/50 hover:text-white'
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
            max={100}
            min={0}
            step={5}
            className="my-4"
          />
          <div className="flex items-center justify-between text-sm text-white/50">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <PremiumButton variant="glass" size="md" className="w-full" onClick={clearFilters}>
          <X className="w-4 h-4" /> Clear Filters ({activeFilterCount})
        </PremiumButton>
      )}
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            The <span className="text-gold-gradient">Store</span>
          </h1>
          <p className="text-white/50 text-lg">
            {filtered.length} premium products for FiveM and RedM
          </p>
        </div>

        {/* Search + controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories, features..."
              className="w-full h-12 pl-11 pr-4 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-52 h-12 glass border-white/10 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass-strong border-white/10">
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-white/70 focus:bg-white/5">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            {/* Mobile filter trigger */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <PremiumButton variant="glass" size="icon" className="lg:hidden relative">
                  <SlidersHorizontal className="w-4 h-4" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-black text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </PremiumButton>
              </SheetTrigger>
              <SheetContent side="left" className="glass-strong border-white/10 w-[85%] max-w-sm overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-display text-xl text-white">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden sm:flex glass rounded-xl border border-white/10 p-1">
              <button
                onClick={() => setView('grid')}
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                  view === 'grid' ? 'bg-gold-500/20 text-gold-400' : 'text-white/40 hover:text-white'
                )}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                  view === 'list' ? 'bg-gold-500/20 text-gold-400' : 'text-white/40 hover:text-white'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24 glass rounded-2xl border border-white/[0.06]">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="font-display text-xl text-white mb-2">No products found</h3>
                <p className="text-white/40 text-sm mb-4">Try adjusting your search or filters</p>
                <PremiumButton variant="gold-outline" size="md" onClick={clearFilters}>
                  Clear all filters
                </PremiumButton>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p) => (
                  <ProductListItem
                    key={p.id}
                    product={p}
                    onQuickView={() => setQuickView(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <QuickViewDialog
        product={quickView}
        onClose={() => setQuickView(null)}
        onBuyNow={(p) => {
          setDiscordProduct(p);
          setQuickView(null);
        }}
        onToggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
        onViewDetails={(slug) => router.push(`/product/${slug}`)}
      />

      <DiscordModal
        open={!!discordProduct}
        onClose={() => setDiscordProduct(null)}
        productName={discordProduct?.name}
      />
    </PageTransition>
  );
}

function ProductListItem({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: () => void;
}) {
  const { toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [discordOpen, setDiscordOpen] = useState(false);

  return (
    <>
    <div className="group glass rounded-2xl border border-white/[0.06] hover:border-gold-500/20 transition-colors overflow-hidden flex">
      <div className="relative w-48 sm:w-64 shrink-0 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gold-400/80 uppercase tracking-wider">{product.categoryLabel}</span>
            <ProductBadgeDisplay badge={product.badge} />
          </div>
          <h3 className="font-display font-semibold text-lg text-white mb-1">{product.name}</h3>
          <p className="text-sm text-white/50 line-clamp-2">{product.tagline}</p>
          <div className="flex items-center gap-2 mt-2">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-white/40">({product.reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-display font-bold text-gold-400">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-white/30 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:border-rose-500/30 transition-colors"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-white/60'}`} />
            </button>
            <PremiumButton size="sm" variant="glass" onClick={onQuickView}>
              Quick View
            </PremiumButton>
            <PremiumButton size="sm" variant="gold" onClick={() => setDiscordOpen(true)}>
              Buy Now
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>

    <DiscordModal open={discordOpen} onClose={() => setDiscordOpen(false)} productName={product.name} />
    </>
  );
}

function QuickViewDialog({
  product,
  onClose,
  onBuyNow,
  onToggleWishlist,
  isInWishlist,
  onViewDetails,
}: {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isInWishlist: (id: string) => boolean;
  onViewDetails: (slug: string) => void;
}) {
  if (!product) return null;
  const inWishlist = isInWishlist(product.id);

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/10 max-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto overflow-hidden">
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <ProductBadgeDisplay badge={product.badge} />
            </div>
          </div>
          <div className="p-6 sm:p-8 flex flex-col">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-bold text-white">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-2 mt-3">
              <RatingStars rating={product.rating} size="md" />
              <span className="text-sm text-white/40">({product.reviewCount} reviews)</span>
            </div>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">{product.description}</p>
            <div className="mt-5 space-y-2">
              {product.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  {f}
                </div>
              ))}
            </div>
            <div className="mt-auto pt-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-display font-bold text-gold-400">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-white/30 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="flex gap-2">
                <PremiumButton
                  variant="glass"
                  size="icon"
                  onClick={() => onToggleWishlist(product)}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-white/60'}`} />
                </PremiumButton>
                <PremiumButton
                  variant="gold"
                  size="md"
                  className="flex-1"
                  onClick={() => onBuyNow(product)}
                >
                  <Zap className="w-4 h-4" /> Buy Now
                </PremiumButton>
                <PremiumButton
                  variant="gold-outline"
                  size="md"
                  onClick={() => onViewDetails(product.slug)}
                >
                  Details
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <StoreContent />
    </Suspense>
  );
}
