import Link from 'next/link';
import type { NavChild } from '@/lib/site-config';

const INDENT = ['', 'pl-6', 'pl-10'] as const;

/**
 * One dropdown entry: a link, or a group label when it has no href. Depth
 * indents it under the entry above (the client's product hierarchy).
 */
export function NavChildLink({
  item,
  className = '',
  labelClassName = '',
  onClick,
}: {
  item: NavChild;
  className?: string;
  labelClassName?: string;
  onClick?: () => void;
}) {
  const indent = INDENT[item.depth ?? 0];
  if (!item.href) {
    return <span className={`block ${indent} ${labelClassName}`}>{item.label}</span>;
  }
  const external = /^https?:\/\//.test(item.href);
  const cls = `block ${indent} ${className}`;
  return external ? (
    <a href={item.href} target="_blank" rel="noopener" onClick={onClick} className={cls}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} onClick={onClick} className={cls}>
      {item.label}
    </Link>
  );
}
