import styles from './Text.module.css';
import { cx } from './utils';

/**
 * Text
 * - size: sm | md (default) | lg
 * - tone: primary | secondary | muted | danger | success | warning
 */
export default function Text({
  as: Component = 'p',
  size = 'md',
  tone = 'secondary',
  weight = 'normal',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cx(styles.base, styles[`size_${size}`], styles[`tone_${tone}`], styles[`weight_${weight}`], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
