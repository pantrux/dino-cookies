import styles from './Card.module.css';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Card
 * - as: div (default) | form | section | ...
 * - surface: elevated | subtle | muted
 * - padding: none | sm | md (default) | lg
 * - radius: sm | md (default)
 * - shadow: none | sm | md (default) | lg
 * - border: default | none
 */
export default function Card({
  as: Component = 'div',
  children,
  surface = 'elevated',
  padding = 'md',
  radius = 'md',
  shadow = 'md',
  border = 'default',
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
        styles[`border_${border}`],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
