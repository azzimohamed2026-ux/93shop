import { LegalPage } from '@/components/legal-page';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your data."
      lastUpdated="July 1, 2026"
      sections={[
        {
          heading: 'Information We Collect',
          body: [
            'We collect information you provide directly to us, including your name, email address, billing address, and purchase history. When you create an account, we store your account credentials (securely hashed) and profile information.',
            'We also automatically collect certain technical data, including your IP address, browser type, device information, and usage data through cookies and similar technologies.',
          ],
        },
        {
          heading: 'How We Use Your Information',
          body: [
            'We use your information to process orders, deliver products, manage licenses, provide customer support, and send important account notifications.',
            'We may use your email to send marketing communications about new products and deals. You can unsubscribe at any time from the footer of any email or from your account settings.',
            'Aggregate, non-identifiable usage data may be used to improve our products and website experience.',
          ],
        },
        {
          heading: 'Payment Processing',
          body: [
            'All payments are processed by Stripe, a PCI-DSS Level 1 compliant payment processor. We never see, store, or have access to your full card details. Stripe provides us with a tokenized representation of your payment method.',
            'For cryptocurrency payments, we receive only the transaction hash and wallet address used. No additional personal data is shared.',
          ],
        },
        {
          heading: 'Data Storage and Security',
          body: [
            'Your data is stored in encrypted databases hosted on Supabase (AWS infrastructure). All data in transit is secured with TLS 1.3 encryption. Data at rest is encrypted with AES-256.',
            'Access to personal data is restricted to authorized personnel only, with multi-factor authentication enforced for all internal systems.',
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'We use essential cookies to maintain your session and shopping cart functionality. We also use analytics cookies (anonymized) to understand how our website is used.',
            'You can control cookies through your browser settings. Disabling essential cookies will affect cart and account functionality.',
          ],
        },
        {
          heading: 'Your Rights (GDPR)',
          body: [
            'Under the GDPR, you have the right to access, correct, export, or delete your personal data. You can exercise these rights from your account settings or by contacting us at privacy@nexusdev.io.',
            'We process deletion requests within 30 days. Note that certain data (order records, license keys) may be retained for legal and fraud-prevention purposes.',
          ],
        },
        {
          heading: 'Third-Party Services',
          body: [
            'We use the following third-party services that may process your data: Stripe (payments), Supabase (database and authentication), Discord (community), and Google Analytics (anonymized traffic analytics).',
            'Each service has its own privacy policy. We encourage you to review them.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'For privacy questions or data requests, email us at privacy@nexusdev.io. We respond to all privacy inquiries within 72 hours.',
          ],
        },
      ]}
    />
  );
}
