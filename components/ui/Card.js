import styles from './Card.module.css';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Card
 * - surface: elevated | subtle | muted
 * - padding: none | sm | md (default) | lg
 * - radius: sm | md (default)
 * - shadow: none | sm | md (default) | lg
 */
export default function Card({
  as: Component = 'div',
  children,
  surface = 'elevated',
  padding = 'md',
  radius = 'md',
  shadow = 'md',
  className,
  ...props
}) {
  return (
    <Component
      className={cx(
        styles.base,
        styles[`surface_${surface}`],
        styles[`pad_${padding}`],
        styles[`radius_${radius}`],
        styles[`shadow_${shadow}`],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
