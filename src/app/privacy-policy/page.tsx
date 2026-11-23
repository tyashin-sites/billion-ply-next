import { LegalPageRenderer } from '@/components/LegalPageRenderer';
import { pageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How Billionply collects, uses and protects your information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return <LegalPageRenderer slug="privacy-policy" />;
}
