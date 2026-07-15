'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingCart,
  Zap,
  Check,
  Download,
  Shield,
  RefreshCw,
  ChevronRight,
  Star,
  Play,
  GitCompare,
  ArrowLeft,
} from 'lucide-react';
import { products, reviews } from '@/lib/data';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { DiscordModal } from '@/components/discord-modal';
import { PremiumButton } from '@/components/premium-button';
import { ProductCard } from '@/components/product-card';
import { RatingStars, ProductBadgeDisplay } from '@/components/product-badge';
import { PageTransition } from '@/components/page-transition';
import { SectionHeading } from '@/components/section-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed, toggleCompare, isInCompare, recentlyViewed } = useCart();
  const [discordOpen, setDiscordOpen] = useState(false);

  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [installService, setInstallService] = useState(false);

  useEffect(() => {
    if (product) addToRecentlyViewed(product);
    window.scrollTo(0, 0);
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="font-display text-3xl text-white mb-4">Product not found</h1>
          <Link href="/store">
            <PremiumButton variant="gold">Back to Store</PremiumButton>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const totalPrice = (product.price + (installService ? 15 : 0)) * quantity;
  const recentProducts = recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/store" className="hover:text-white">Store</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/store?category=${product.category}`} className="hover:text-white">
            {product.categoryLabel}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gold-400 truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden glass border border-white/[0.06] mb-4 group"
            >
              <img
                src={product.gallery[selectedImage] || product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <ProductBadgeDisplay badge={product.badge} />
              </div>
              {/* Video preview button */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-xl glass-strong flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-white fill-white" />
              </button>
            </motion.div>
            {product.gallery.length > 1 && (
              <div className="flex gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-gold-500' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gold-400/80 uppercase tracking-wider font-medium">
                {product.categoryLabel}
              </span>
              <ProductBadgeDisplay badge={product.badge} />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              {product.name}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-4">{product.tagline}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <RatingStars rating={product.rating} size="md" />
                <span className="text-sm text-white/60">{product.rating}</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-sm text-white/50">{product.reviewCount} reviews</span>
              <span className="text-white/20">|</span>
              <span className="text-sm text-white/50">{product.downloads.toLocaleString()} downloads</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-display font-bold text-gold-400">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-white/30 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-xs font-bold">
                    SAVE ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Features */}
            <div className="glass rounded-2xl p-5 border border-white/[0.06] mb-6">
              <h3 className="font-display font-semibold text-sm text-white mb-3 uppercase tracking-wider">
                What's included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="glass rounded-2xl p-4 border border-white/[0.06] mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={installService}
                  onChange={(e) => setInstallService(e.target.checked)}
                  className="w-4 h-4 rounded accent-gold-500"
                />
                <div className="flex-1">
                  <span className="text-sm text-white font-medium">Professional Installation (+€15.00)</span>
                  <p className="text-xs text-white/40 mt-0.5">Our team installs and configures it for you</p>
                </div>
              </label>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-white/60">Quantity:</span>
              <div className="flex items-center glass rounded-xl border border-white/10">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
                >
                  –
                </button>
                <span className="w-12 text-center text-white font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <PremiumButton
                  variant="gold"
                  size="lg"
                  className="flex-1"
                  onClick={() => setDiscordOpen(true)}
                >
                  <Zap className="w-4 h-4" /> Buy Now — &euro;{product.price.toFixed(2)}
                </PremiumButton>
                <PremiumButton
                  variant="glass"
                  size="lg"
                  onClick={() => toggleWishlist(product)}
                  className="px-4"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
                </PremiumButton>
                <PremiumButton
                  variant="glass"
                  size="lg"
                  onClick={() => {
                    toggleCompare(product);
                    toast(!inCompare ? 'Added to compare' : 'Removed from compare');
                  }}
                  className="px-4"
                >
                  <GitCompare className={`w-5 h-5 ${inCompare ? 'text-gold-400' : ''}`} />
                </PremiumButton>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { icon: Download, label: 'Instant Delivery' },
                { icon: Shield, label: 'Secure Payment' },
                { icon: RefreshCw, label: 'Lifetime Updates' },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2 text-center">
                  <t.icon className="w-5 h-5 text-gold-400/70" />
                  <span className="text-xs text-white/40">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description, Reviews, Tech Stack */}
        <div className="mb-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="glass rounded-xl p-1 border border-white/10 inline-flex">
              <TabsTrigger value="description" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400 rounded-lg text-white/60">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400 rounded-lg text-white/60">
                Reviews ({productReviews.length})
              </TabsTrigger>
              <TabsTrigger value="tech" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400 rounded-lg text-white/60">
                Tech Stack
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="glass rounded-2xl p-8 border border-white/[0.06] max-w-4xl">
                <p className="text-white/60 leading-relaxed text-base">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Last Updated</p>
                    <p className="text-sm text-white">{product.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Downloads</p>
                    <p className="text-sm text-white">{product.downloads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Rating</p>
                    <p className="text-sm text-white">{product.rating}/5.0</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4 max-w-4xl">
                {productReviews.length > 0 ? (
                  productReviews.map((r) => (
                    <div key={r.id} className="glass rounded-2xl p-6 border border-white/[0.06]">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-display font-semibold text-white">{r.author}</p>
                              <p className="text-xs text-white/40">{r.server}</p>
                            </div>
                            <span className="text-xs text-white/30">{r.date}</span>
                          </div>
                          <RatingStars rating={r.rating} size="md" />
                          <p className="mt-3 text-sm text-white/60 leading-relaxed">{r.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass rounded-2xl p-12 border border-white/[0.06] text-center">
                    <Star className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <p className="text-white/50">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="tech" className="mt-6">
              <div className="glass rounded-2xl p-8 border border-white/[0.06] max-w-4xl">
                <h3 className="font-display font-semibold text-white mb-4">Built with</h3>
                <div className="flex flex-wrap gap-3">
                  {product.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl glass-gold text-sm text-gold-400 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <h4 className="font-display font-semibold text-white mb-3">Compatibility</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['QBCore', 'ESX', 'ox_lib', 'ox_inventory', 'Standalone', 'MySQL'].map((c) => (
                      <div key={c} className="flex items-center gap-2 text-sm text-white/60">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mb-20">
            <SectionHeading
              center={false}
              eyebrow="You might also like"
              title={<>Related <span className="text-gold-gradient">products</span></>}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentProducts.length > 0 && (
          <section className="mb-20">
            <SectionHeading
              center={false}
              eyebrow="Pick up where you left off"
              title={<>Recently <span className="text-gold-gradient">viewed</span></>}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {recentProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <DiscordModal open={discordOpen} onClose={() => setDiscordOpen(false)} productName={product.name} />
    </PageTransition>
  );
}
