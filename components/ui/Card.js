import styles from './Card.module.css';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Card
 * - surface: elevated | subtle | muted
 * - padding: none | sm | md (default)
 * - radius: sm | md (default)
 */
export default function Card({
  as: Component = 'div',
  children,
  surface = 'elevated',
  padding = 'md',
  radius = 'md',
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
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
