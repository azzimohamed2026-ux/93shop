/*
# Update product prices to match reference image + €2 increase

1. Changes
- Updates the `price` column for all 18 products in the `products` table
- Prices derived from reference image with €2.00 increase applied
- Exception products use fixed prices (no €2 increase): Rockstar Activation Codes (€0.50), RedM Ready Accounts (€4.00), Discord Accounts (€0.50), Steam Accounts (€0.10)
2. Security
- No schema changes, no RLS policy changes
*/

UPDATE products SET price = 21.99 WHERE name = 'Bundle Ham + Vanity';
UPDATE products SET price = 21.99 WHERE name = 'Bundle Ham + Cryptic';
UPDATE products SET price = 21.99 WHERE name = 'Bundle Ham + Cage RedM';
UPDATE products SET price = 8.99 WHERE name = 'Ham Spoofer';
UPDATE products SET price = 5.00 WHERE name = 'FiveM RootTool';
UPDATE products SET price = 2.16 WHERE name = 'FiveM Ready Accounts';
UPDATE products SET price = 0.50 WHERE name = 'Discord Accounts';
UPDATE products SET price = 0.10 WHERE name = 'Steam Accounts';
UPDATE products SET price = 4.00 WHERE name = 'RedM Ready Accounts';
UPDATE products SET price = 11.99 WHERE name = 'Ham Executor';
UPDATE products SET price = 13.99 WHERE name = 'Ham Executor RedM';
UPDATE products SET price = 11.99 WHERE name = 'Vanity Menu';
UPDATE products SET price = 13.99 WHERE name = 'Cage Menu RedM';
UPDATE products SET price = 11.99 WHERE name = 'Cryptic Menu';
UPDATE products SET price = 0.50 WHERE name = 'Rockstar Activation Codes';
UPDATE products SET price = 12.00 WHERE name = 'Nightfall RedM Mod Menu';
UPDATE products SET price = 2.03 WHERE name = 'Email Accounts';
UPDATE products SET price = 5.00 WHERE name = 'FiveM Anti-Spoof Bypasser';
