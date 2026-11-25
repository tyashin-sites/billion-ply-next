import { RangePageView } from '@/components/custom/RangePageView';
import { copyMetadata } from '@/lib/seo';

export const metadata = copyMetadata('/products/recon-veneer');

export default function Page() {
  return <RangePageView slug="recon-veneer" eyebrow="Reconstituted veneer" />;
}
