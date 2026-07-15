import { LegalPage } from '@/components/legal-page';

export const metadata = { title: 'Refund Policy' };

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund Policy"
      subtitle="Our refund and warranty terms for all products."
      lastUpdated="July 1, 2026"
      sections={[
        {
          heading: 'Digital Product Refunds',
          body: [
            'Due to the nature of digital products, all sales are generally final. However, we offer a 7-day money-back guarantee on FiveM and RedM scripts if the product does not work as described on your server and our support team is unable to resolve the issue.',
            'To request a refund, open a support ticket from your dashboard within 7 days of purchase. Include a detailed description of the issue and evidence (screenshots, server logs) showing the product is not functioning as advertised.',
          ],
        },
        {
          heading: 'Non-Refundable Products',
          body: [
            'The following products are non-refundable once delivered: activation codes (Rockstar, Steam), digital accounts (FiveM, Steam, Discord), and any product that has been downloaded from your dashboard.',
            'However, these products are covered by our replacement warranty (see below) if they are defective or do not match the product description.',
          ],
        },
        {
          heading: 'Replacement Warranty',
          body: [
            'All accounts and activation codes come with a replacement warranty: 30 days for premium accounts, 14 days for starter accounts, and 7 days for Discord accounts. If your account or code is defective within the warranty period, we will provide a free replacement.',
            'To request a replacement, open a support ticket with proof of the issue (e.g., a screenshot showing the account is banned or the code is invalid).',
          ],
        },
        {
          heading: 'Refund Process',
          body: [
            'Approved refunds are processed back to the original payment method within 5-10 business days. Cryptocurrency refunds are processed within 24 hours to the original wallet address.',
            'If your refund is denied, you will receive a detailed explanation and an offer to help resolve the issue or provide a replacement where applicable.',
          ],
        },
        {
          heading: 'Installation Service Refunds',
          body: [
            'If you purchased professional installation and our team was unable to install the product on your server due to a product issue, the installation fee will be fully refunded in addition to any product refund.',
            'If the installation was completed successfully, the installation fee is non-refundable.',
          ],
        },
        {
          heading: 'Chargebacks',
          body: [
            'Filing a chargeback without first contacting our support team violates our Terms of Service and will result in immediate account suspension and license revocation. We strongly encourage you to contact us first — we resolve most issues within 24 hours.',
          ],
        },
      ]}
    />
  );
}
