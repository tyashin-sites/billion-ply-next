import { RangePageView } from '@/components/custom/RangePageView';
import { copyMetadata } from '@/lib/seo';

export const metadata = copyMetadata('/products/natural-veneer');

export default function Page() {
  return <RangePageView slug="natural-veneer" eyebrow="Decorative veneer · IS 1328" />;
}
