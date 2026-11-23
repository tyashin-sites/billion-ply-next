import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/data/products';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/products/${product.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[10/7] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
        />
        {product.standard && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-ink backdrop-blur">
            {product.standard}
          </span>
        )}
        {product.tenFoot && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-white">
            10 ft
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.cardLine}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-deep">
          Specs and uses <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
