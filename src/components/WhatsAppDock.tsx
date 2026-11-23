import { siteConfig } from '@/config/site';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

/** Floating WhatsApp button on every page. */
export function WhatsAppDock() {
  return (
    <TrackedLink
      href={siteConfig.contact.whatsappHref}
      external
      event="whatsapp_click"
      props={{ location: 'floating' }}
      ariaLabel="Chat with Billion Ply on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-hover transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#17713d] md:bottom-7 md:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </TrackedLink>
  );
}
