import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

/** Closing call to action: talk to the team, find a dealer, or WhatsApp. */
export function CtaBand({ location, title = 'Planning a project?' }: { location: string; title?: string }) {
  return (
    <section className="ink-section on-dark overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-leaf/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-oak/20 blur-3xl" />
      <div className="container relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">Talk to Billion Ply</p>
          <h2 className="display-lg mt-4">{title}</h2>
          <p className="mt-5 max-w-xl text-white/75">
            Tell us what you are building. We will help you pick the right board, send samples to architects and designers, and point you to your nearest dealer.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href="/contact" className="btn-primary !bg-white !text-ink hover:!bg-leaf-tint">Send an enquiry</Link>
          <Link href="/dealers" className="btn-ghost">Find a dealer</Link>
          <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location }} className="btn-whatsapp">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
