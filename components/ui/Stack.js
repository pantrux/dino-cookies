import styles from './Stack.module.css';
import { cx } from './utils';

/**
 * Stack
 * - direction: row | column
 * - gap: 1|2|3|4|5|6|8|10|12|16|20|24
 */
export default function Stack({
  as: Component = 'div',
  direction = 'column',
  gap = 4,
  align,
  justify,
  wrap,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cx(
        styles.base,
        styles[`dir_${direction}`],
        styles[`gap_${gap}`],
        align && styles[`align_${align}`],
        justify && styles[`justify_${justify}`],
        wrap && styles.wrap,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
