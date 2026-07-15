/*
# Update product thumbnails to local images

1. Changes
- Updates thumbnail and gallery for FiveM Ready Accounts, Discord Accounts, and Steam Accounts
- Points to local /images/products/ files instead of Pexels URLs
2. Security
- No schema changes, no RLS policy changes
*/

UPDATE products SET thumbnail = '/images/products/827376.webp' WHERE slug = 'fivem-ready-accounts';
UPDATE products SET thumbnail = '/images/products/827374.webp' WHERE slug = 'discord-accounts';
UPDATE products SET thumbnail = '/images/products/827375.webp' WHERE slug = 'steam-accounts';
