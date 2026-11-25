import { RangePageView } from '@/components/custom/RangePageView';
import { copyMetadata } from '@/lib/seo';

export const metadata = copyMetadata('/products/teak-veneer');

export default function Page() {
  return <RangePageView slug="teak-veneer" eyebrow="Decorative veneer · IS 1328" />;
}
