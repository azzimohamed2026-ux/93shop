'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ArrowRight, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { PremiumButton } from '@/components/premium-button';
import { PageTransition } from '@/components/page-transition';
import { ProductCard } from '@/components/product-card';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white/20" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-3">Your wishlist is empty</h1>
            <p className="text-white/50 mb-8">Save products you love for later</p>
            <Link href="/store">
              <PremiumButton variant="gold" size="lg">
                Browse Store <ArrowRight className="w-4 h-4" />
              </PremiumButton>
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              My <span className="text-gold-gradient">Wishlist</span>
            </h1>
            <p className="text-white/50">{wishlist.length} item(s) saved</p>
          </div>
          <PremiumButton
            variant="glass"
            onClick={() => {
              wishlist.forEach((p) => addToCart(p));
              toast.success(`Added ${wishlist.length} items to cart`);
            }}
          >
            <ShoppingCart className="w-4 h-4" /> Add All to Cart
          </PremiumButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((p, i) => (
            <div key={p.id} className="relative">
              <ProductCard product={p} index={i} />
              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-xl glass-strong flex items-center justify-center hover:border-rose-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
