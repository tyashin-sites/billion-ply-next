import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { LEAD_SOURCES, leadMessage, leadSubject, validateLead } from '@/lib/leads';

/**
 * Lead pipeline for the enquiry, become-a-dealer and sample-request forms.
 *
 * 1. Validates the payload (src/lib/leads.ts).
 * 2. ALWAYS logs the lead with a `LEAD:` prefix so no lead is lost (visible
 *    in `wrangler tail` / Cloudflare logs).
 * 3. Forwards in the background (waitUntil) to the Tyashin Contact Form &
 *    Lead Capture plugin with the server-side API key. Each form has its own
 *    `source` and subject prefix so leads can be told apart.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  const lead = result.lead;
  const pageUrl = request.headers.get('referer') || undefined;

  console.log('LEAD:', JSON.stringify({ ...lead, submittedAt: new Date().toISOString(), pageUrl }));

  try {
    const { env, ctx } = getCloudflareContext();
    const e = env as Record<string, unknown>;
    const apiKey = (e.TYASHIN_API_KEY as string) ?? process.env.TYASHIN_API_KEY;
    const apiUrl =
      (e.TYASHIN_API_URL as string) ?? process.env.TYASHIN_API_URL ?? 'https://website-api.tyashin.com';

    if (typeof apiKey === 'string' && apiKey.length > 0) {
      const forward = fetch(`${apiUrl}/api/v1/contact/public/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          subject: leadSubject(lead),
          message: leadMessage(lead),
          source: LEAD_SOURCES[lead.type],
          pageUrl,
          metadata: {
            leadType: lead.type,
            firm: lead.firm,
            city: lead.city,
            state: lead.state,
            brands: lead.brands,
            profession: lead.profession,
            products: lead.products,
          },
        }),
      })
        .then((res) => {
          if (!res.ok) console.log(`LEAD: platform forward failed (${res.status}); lead kept in log above`);
        })
        .catch((err) => console.log(`LEAD: platform forward errored (${String(err)}); lead kept in log above`));
      ctx.waitUntil(forward);
    } else {
      console.log('LEAD: no TYASHIN_API_KEY binding; log-only fallback used');
    }
  } catch {
    console.log('LEAD: no Cloudflare context; log-only fallback used');
  }

  return NextResponse.json({ ok: true });
}
