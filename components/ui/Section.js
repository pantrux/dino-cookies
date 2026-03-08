import styles from './Section.module.css';
import { cx } from './utils';

/**
 * Section
 * - surface: page | subtle | muted
 * - paddingY: none | sm | md (default) | lg
 */
export default function Section({
  as: Component = 'section',
  surface = 'page',
  paddingY = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cx(styles.base, styles[`surface_${surface}`], styles[`py_${paddingY}`], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
