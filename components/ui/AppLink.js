import Link from 'next/link';
import styles from './AppLink.module.css';
import { cx } from './utils';

/**
 * AppLink
 * - variant: inline | nav
 */
export default function AppLink({
  href,
  children,
  variant = 'inline',
  className,
  ...props
}) {
  return (
    <Link href={href} className={cx(styles.base, styles[`variant_${variant}`], className)} {...props}>
      {children}
    </Link>
  );
}
