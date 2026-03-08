import styles from './Heading.module.css';
import { cx } from './utils';

/**
 * Heading
 * - level: 1|2|3|4|5|6
 * - size: 2xl | 3xl | 4xl (default 3xl)
 */
export default function Heading({
  level = 2,
  size = '3xl',
  tone = 'primary',
  className,
  children,
  ...props
}) {
  const Tag = `h${level}`;
  return (
    <Tag
      className={cx(styles.base, styles[`size_${size}`], styles[`tone_${tone}`], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
