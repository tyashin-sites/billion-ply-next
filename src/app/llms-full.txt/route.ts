import { llmsFullTxt } from '@/lib/llms';

/** /llms-full.txt — every short answer and FAQ on the site, as plain text. */
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
