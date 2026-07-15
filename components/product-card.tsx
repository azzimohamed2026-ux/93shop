'use client';

import { motion } from 'framer-motion';
import { Heart, Eye, Zap } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { ProductBadgeDisplay, RatingStars } from './product-badge';
import { PremiumButton } from './premium-button';
import { DiscordModal } from './discord-modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [discordOpen, setDiscordOpen] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative"
      >
        <div className="relative rounded-2xl overflow-hidden glass border border-white/[0.06] hover:border-gold-500/30 transition-all duration-500 card-3d">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-dark-200">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <ProductBadgeDisplay badge={product.badge} />
              {discount > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-xs font-bold backdrop-blur-md">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-3 right-3 w-9 h-9 rounded-xl glass-strong flex items-center justify-center transition-all hover:scale-110"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-all ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-white/70'}`}
              />
            </button>

            {/* Quick view overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 bottom-0 p-4 flex gap-2"
            >
              <PremiumButton
                size="sm"
                variant="glass"
                className="flex-1 backdrop-blur-xl"
                onClick={() => router.push(`/product/${product.slug}`)}
              >
                <Eye className="w-3.5 h-3.5" /> Quick View
              </PremiumButton>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gold-400/80 font-medium uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1">
                <RatingStars rating={product.rating} />
                <span className="text-xs text-white/40 ml-1">({product.reviewCount})</span>
              </div>
            </div>

            <h3
              className="font-display font-semibold text-base text-white leading-snug line-clamp-1 cursor-pointer hover:text-gold-400 transition-colors"
              onClick={() => router.push(`/product/${product.slug}`)}
            >
              {product.name}
            </h3>

            <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{product.tagline}</p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-display font-bold text-gold-400">
                  &euro;{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-white/30 line-through">
                    &euro;{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <PremiumButton
              size="sm"
              variant="gold"
              className="w-full"
              onClick={() => setDiscordOpen(true)}
            >
              <Zap className="w-3.5 h-3.5" /> Buy Now
            </PremiumButton>
          </div>
        </div>
      </motion.div>

      <DiscordModal open={discordOpen} onClose={() => setDiscordOpen(false)} productName={product.name} />
    </>
  );
}
