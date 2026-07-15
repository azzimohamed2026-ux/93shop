import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { DiscordProvider } from '@/lib/discord-context';
import { ThemeProvider } from '@/lib/theme-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BackgroundEffects } from '@/components/background-effects';
import { CursorGlow } from '@/components/background-effects';
import { BackToTop } from '@/components/back-to-top';
import { PageLoader } from '@/components/page-loader';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'NexusDev — Premium FiveM & RedM Scripts, Accounts & Tools',
    template: '%s | NexusDev',
  },
  description:
    'The premium marketplace for FiveM and RedM scripts, accounts, menus, and developer tools. Trusted by 3,200+ servers and 48,000+ customers worldwide.',
  keywords: [
    'FiveM scripts',
    'RedM scripts',
    'FiveM accounts',
    'FiveM anti-cheat',
    'FiveM HUD',
    'FiveM inventory',
    'FiveM MDT',
    'Vanity menu',
    'Cryptic menu',
    'FiveM spoofer',
  ],
  authors: [{ name: 'NexusDev' }],
  openGraph: {
    title: 'NexusDev — Premium FiveM & RedM Marketplace',
    description: 'Premium scripts, accounts, and tools for FiveM and RedM. Trusted by 3,200+ servers.',
    type: 'website',
    siteName: 'NexusDev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexusDev — Premium FiveM & RedM Marketplace',
    description: 'Premium scripts, accounts, and tools for FiveM and RedM.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#080808] text-white antialiased">
        <ThemeProvider>
          <DiscordProvider>
            <CartProvider>
              <PageLoader />
              <CursorGlow />
              <BackgroundEffects />
              <AnnouncementBar />
              <Navbar />
              <main className="relative z-10 pt-32 min-h-screen">{children}</main>
              <Footer />
              <BackToTop />
              <Toaster />
            </CartProvider>
          </DiscordProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
