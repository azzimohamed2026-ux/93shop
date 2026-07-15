/*
# Rename Cage products and remove "Cage" from database

1. Changes
- Renames product "Cage Menu RedM" to "RedM Menu"
- Renames product "Bundle Ham + Cage RedM" to "Bundle Ham + RedM Menu"
- Updates slug for "cage-menu-redm" to "redm-menu"
- Updates slug for "bundle-ham-cage-redm" to "bundle-ham-redm"
- Updates description text to remove "Cage" references
2. Security
- No schema changes, no RLS policy changes
- Data-only update
*/

UPDATE products SET name = 'RedM Menu', slug = 'redm-menu' WHERE slug = 'cage-menu-redm';
UPDATE products SET name = 'Bundle Ham + RedM Menu', slug = 'bundle-ham-redm' WHERE slug = 'bundle-ham-cage-redm';

-- Update any descriptions containing "Cage"
UPDATE products SET description = REPLACE(description, 'Cage Menu RedM', 'RedM Menu') WHERE description ILIKE '%Cage%';
UPDATE products SET description = REPLACE(description, 'Cage', 'RedM Menu') WHERE description ILIKE '%Cage%';
