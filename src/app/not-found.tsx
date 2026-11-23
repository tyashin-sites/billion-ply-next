import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <div className="container text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display-lg mt-4">This page has moved or never existed</h1>
        <p className="lead mx-auto mt-4 max-w-xl">Try the product range, or tell us what you were looking for.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn-primary">Our products</Link>
          <Link href="/contact" className="btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
