import { LegalPage } from '@/components/legal-page';

export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The terms and conditions for using NexusDev."
      lastUpdated="July 1, 2026"
      sections={[
        {
          heading: 'Acceptance of Terms',
          body: [
            'By accessing or using the NexusDev website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.',
            'These terms apply to all visitors, users, and customers of NexusDev, regardless of the products purchased or the membership tier held.',
          ],
        },
        {
          heading: 'Product Licensing',
          body: [
            'All scripts and digital products sold on NexusDev are licensed, not sold. You receive a non-exclusive, non-transferable license to use the product on a single server, unless a multi-server license is purchased.',
            'You may not resell, redistribute, or share our products with third parties. License keys are tied to your account and server IP. Unauthorized distribution will result in immediate license revocation without refund.',
            'Lifetime updates are included for the original purchaser for the duration the product is actively maintained and sold on our platform.',
          ],
        },
        {
          heading: 'Account and License Transfer',
          body: [
            'You may transfer a license to another server you own from your dashboard. Transferring licenses to third parties requires written permission from our support team.',
            'Account sharing is prohibited. Each account is tied to an individual. Sharing account credentials may result in account suspension.',
          ],
        },
        {
          heading: 'Prohibited Uses',
          body: [
            'You may not use our products for any illegal activities, including but not limited to cheating in competitive environments, violating Rockstar Games Terms of Service, or distributing malicious software.',
            'Reverse engineering, decompiling, or attempting to extract source code from our compiled products (menus, tools) is strictly prohibited.',
            'Using our anti-cheat products to target, harass, or falsely ban players is prohibited. Anti-cheat detections must be reviewed before action.',
          ],
        },
        {
          heading: 'Intellectual Property',
          body: [
            'All content on NexusDev, including product names, logos, designs, code, and documentation, is the intellectual property of NexusDev or its licensors.',
            'NexusDev is not affiliated with, endorsed by, or sponsored by Rockstar Games, Take-Two Interactive, Valve Corporation, or Discord Inc. All trademarks belong to their respective owners.',
          ],
        },
        {
          heading: 'Limitation of Liability',
          body: [
            'NexusDev is not liable for any damages arising from the use or inability to use our products, including server downtime, data loss, or player disruption.',
            'Our total liability for any claim is limited to the amount you paid for the product in question.',
          ],
        },
        {
          heading: 'Changes to Terms',
          body: [
            'We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.',
            'Significant changes will be communicated via email to registered users at least 14 days before taking effect.',
          ],
        },
      ]}
    />
  );
}
