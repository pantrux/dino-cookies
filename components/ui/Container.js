import styles from './Container.module.css';
import { cx } from './utils';

/**
 * Container
 * - size: sm | md (default) | lg
 */
export default function Container({
  as: Component = 'div',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Component className={cx(styles.base, styles[`size_${size}`], className)} {...props}>
      {children}
    </Component>
  );
}
