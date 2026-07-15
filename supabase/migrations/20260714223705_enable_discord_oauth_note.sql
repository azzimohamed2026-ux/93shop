/*
# Enable Discord OAuth provider

1. Changes
- No schema changes. This migration exists to document that Discord OAuth must be enabled in the Supabase dashboard.
- The auth schema already supports external OAuth providers via auth.users identities.
2. Notes
- Discord OAuth provider must be enabled in the Supabase Dashboard > Authentication > Providers > Discord.
- Required config: Discord Client ID and Client Secret from the Discord Developer Portal.
- Redirect URL: <SUPABASE_URL>/auth/v1/callback
*/

SELECT 1;
