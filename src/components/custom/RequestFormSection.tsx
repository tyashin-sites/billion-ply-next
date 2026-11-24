import { siteConfig, TYASHIN_API_ORIGIN } from '@/config/site';
import { products } from '@/data/products';
import type { LeadType } from '@/lib/leads';
import { RequestForm } from './RequestForm';

/**
 * Server wrapper: reads the platform env (TYASHIN_API_KEY is in every Tyashin
 * site's build and runtime env) and hands it to the client form, the same way
 * the kit's Contact section does.
 */
export function RequestFormSection({ type, defaultProduct }: { type: LeadType; defaultProduct?: string }) {
  const reach = [
    siteConfig.contact.phoneDisplay && `call ${siteConfig.contact.phoneDisplay}`,
    siteConfig.contact.whatsappNumber && 'message us on WhatsApp',
    siteConfig.contact.email && `email ${siteConfig.contact.email}`,
  ].filter(Boolean);
  const fallback = reach.length ? `Please ${reach.join(', ')}.` : undefined;
  const names = products.map((p) => p.name);
  const preset = defaultProduct ? products.find((p) => p.slug === defaultProduct)?.name : undefined;
  return (
    <RequestForm
      type={type}
      apiUrl={process.env.TYASHIN_API_URL || TYASHIN_API_ORIGIN}
      apiKey={process.env.TYASHIN_API_KEY ?? ''}
      products={names}
      defaultProduct={preset}
      fallback={fallback}
    />
  );
}
