import { Children, cloneElement, isValidElement, useId } from 'react';
import styles from './Field.module.css';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className,
  ...props
}) {
  const fieldId = useId();
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  let control = children;
  // Best-effort: if the child is a single React element, attach a11y props.
  // This keeps the API ergonomic (Field owns hint/error text + a11y linkage).
  try {
    const onlyChild = Children.only(children);
    if (isValidElement(onlyChild)) {
      control = cloneElement(onlyChild, {
        'aria-describedby': describedBy,
        'aria-invalid': error ? 'true' : undefined,
      });
    }
  } catch {
    // If children is not a single element, leave it as-is.
  }

  return (
    <div className={cx(styles.field, className)} {...props}>
      {label ? (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {control}
      {hint ? (
        <div className={styles.hint} id={hintId}>
          {hint}
        </div>
      ) : null}
      {error ? (
        <div className={styles.error} id={errorId}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
