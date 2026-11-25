import { RangePageView } from '@/components/custom/RangePageView';
import { copyMetadata } from '@/lib/seo';

export const metadata = copyMetadata('/products/commercial-plywood');

export default function Page() {
  return <RangePageView slug="commercial-plywood" eyebrow="Dry interiors" />;
}
