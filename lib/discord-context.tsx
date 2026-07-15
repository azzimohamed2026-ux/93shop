'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

const DISCORD_URL = 'https://discord.gg/3Tj8xZYHT';

interface DiscordUser {
  id: string;
  username: string;
  avatarUrl: string | null;
}

interface DiscordContextValue {
  user: DiscordUser | null;
  loading: boolean;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  discordUrl: string;
}

const DiscordContext = createContext<DiscordContextValue>({
  user: null,
  loading: true,
  signInWithDiscord: async () => {},
  signOut: async () => {},
  discordUrl: DISCORD_URL,
});

function extractDiscordUser(user: User | null): DiscordUser | null {
  if (!user) return null;
  const meta = user.user_metadata || {};
  const username = meta.full_name || meta.name || meta.user_name || meta.preferred_username || 'User';
  const discordAvatar = meta.avatar_url || meta.picture || null;
  return {
    id: user.id,
    username,
    avatarUrl: discordAvatar,
  };
}

export function DiscordProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(extractDiscordUser(data.session?.user ?? null));
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(extractDiscordUser(session?.user ?? null));
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signInWithDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: window.location.origin },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <DiscordContext.Provider
      value={{ user, loading, signInWithDiscord, signOut, discordUrl: DISCORD_URL }}
    >
      {children}
    </DiscordContext.Provider>
  );
}

export function useDiscord() {
  return useContext(DiscordContext);
}

export const DISCORD_INVITE_URL = DISCORD_URL;
