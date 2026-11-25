import { siteConfig, FULL_ADDRESS } from '@/config/site';
import { SITE_URL } from '@/lib/seo';
import { getSiteRoutes } from '@/lib/site-routes';
import { COMPANY_ONE_LINE, COMPANY_SHORT, HOME, PAGE_COPY, PRODUCT_ANSWERS } from '@/data/seo-content';

const url = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

function header(): string[] {
  return [
    `# ${siteConfig.name}`,
    '',
    `> ${COMPANY_ONE_LINE}`,
    '',
    COMPANY_SHORT,
    '',
    ...(FULL_ADDRESS ? [`- Address: ${FULL_ADDRESS}`] : []),
    ...(siteConfig.contact.phoneDisplay ? [`- Phone: ${siteConfig.contact.phoneDisplay}`] : []),
    ...(siteConfig.contact.email ? [`- Email: ${siteConfig.contact.email}`] : []),
    '',
  ];
}

/** One line per indexable page, in sitemap order (legal pages left out). */
function pageLines(): string[] {
  return getSiteRoutes()
    .filter((r) => PAGE_COPY[r.path])
    .map((r) => {
      const c = PAGE_COPY[r.path];
      return `- [${c.h1}](${url(r.path)}): ${c.description}`;
    });
}

/** /llms.txt */
export function llmsTxt(): string {
  return [
    ...header(),
    '## Pages',
    ...pageLines(),
    '',
    '## More',
    `- [Full text: short answers and FAQs](${url('/llms-full.txt')})`,
    '',
  ].join('\n');
}

/** /llms-full.txt: every page's short answer and FAQ, as plain text. */
export function llmsFullTxt(): string {
  const out = [...header()];
  out.push('## Home', '', `### ${HOME.answerHeading}`, '', HOME.answer, '');
  for (const f of HOME.faqs) out.push(`**${f.q}**`, f.a, '');
  for (const r of getSiteRoutes()) {
    const slug = r.path.startsWith('/products/') ? r.path.slice('/products/'.length) : null;
    const a = slug ? PRODUCT_ANSWERS[slug] : undefined;
    if (!a) continue;
    out.push(`## ${PAGE_COPY[r.path].h1}`, '', `Page: ${url(r.path)}`, '', a.shortAnswer, '');
    for (const s of a.sections) {
      out.push(`### ${s.heading}`, '');
      if (s.kind === 'table') {
        out.push(`| ${s.columns.join(' | ')} |`, `|${s.columns.map(() => '---').join('|')}|`);
        for (const row of s.rows) out.push(`| ${row.join(' | ')} |`);
        out.push('');
        if (s.note) out.push(s.note, '');
      } else if (s.kind === 'list') {
        for (const it of s.items) out.push(`- ${it.label ? `${it.label}: ` : ''}${it.text}`);
        out.push('');
        if (s.note) out.push(s.note, '');
      } else if (s.kind === 'steps') {
        s.items.forEach((it, i) => out.push(`${i + 1}. ${it}`));
        out.push('');
      } else {
        out.push(s.text, '');
      }
    }
    for (const f of a.faqs) out.push(`**${f.q}**`, f.a, '');
  }
  return out.join('\n');
}
