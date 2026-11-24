import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Large downloads served from the site's own R2 bucket
 * (`billionply-site-assets`, binding SITE_ASSETS), for files over
 * Cloudflare's 25 MiB static-asset limit and the Media Library's 15 MB PDF
 * cap. Only files listed here can be fetched.
 */
const FILES: Record<string, { key: string; type: string }> = {
  'billionply-natural-veneer-catalogue.pdf': {
    key: 'catalogues/billionply-natural-veneer-catalogue.pdf',
    type: 'application/pdf',
  },
  'billionply-recon-veneer-catalogue.pdf': {
    key: 'catalogues/billionply-recon-veneer-catalogue.pdf',
    type: 'application/pdf',
  },
};

type R2Body = {
  body: ReadableStream;
  size: number;
  httpEtag: string;
  range?: { offset?: number; length?: number };
};
type R2Bucket = {
  get(key: string, opts?: { range?: Headers; onlyIf?: Headers }): Promise<R2Body | null>;
};

export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const entry = FILES[file];
  if (!entry) return new Response('Not found', { status: 404 });

  const { env } = getCloudflareContext();
  const bucket = (env as unknown as { SITE_ASSETS?: R2Bucket }).SITE_ASSETS;
  if (!bucket) return new Response('Download unavailable', { status: 503 });

  const hasRange = request.headers.has('range');
  const obj = await bucket.get(entry.key, hasRange ? { range: request.headers } : undefined);
  if (!obj) return new Response('Not found', { status: 404 });

  const headers = new Headers({
    'content-type': entry.type,
    'content-disposition': `inline; filename="${file}"`,
    'cache-control': 'public, max-age=86400',
    'accept-ranges': 'bytes',
    etag: obj.httpEtag,
  });
  if (hasRange && obj.range && typeof obj.range.offset === 'number') {
    const start = obj.range.offset;
    const len = obj.range.length ?? obj.size - start;
    headers.set('content-range', `bytes ${start}-${start + len - 1}/${obj.size}`);
    headers.set('content-length', String(len));
    return new Response(obj.body, { status: 206, headers });
  }
  headers.set('content-length', String(obj.size));
  return new Response(obj.body, { status: 200, headers });
}
