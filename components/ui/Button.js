import Link from 'next/link';
import { forwardRef } from 'react';
import styles from './Button.module.css';
import { cx } from './utils';

/**
 * Button / LinkButton
 * - If `href` is provided, renders a Next <Link> styled as a button.
 * - Otherwise renders a native <button>.
 */
const Button = forwardRef(function Button(
  {
    href,
    children,
    variant = 'primary',
    tone = 'brand',
    fullWidth = false,
    disabled,
    className,
    ...props
  },
  ref
) {
  const classes = cx(
    styles.base,
    styles[`variant_${variant}`],
    styles[`tone_${tone}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={ref}
        className={classes}
        aria-disabled={disabled ? 'true' : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          props.onClick?.(e);
        }}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
});

export default Button;
