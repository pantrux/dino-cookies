import styles from './Field.module.css';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Field({
  label,
  hint,
  error,
  children,
  className,
  ...props
}) {
  return (
    <div className={cx(styles.field, className)} {...props}>
      {label ? <div className={styles.label}>{label}</div> : null}
      {children}
      {hint ? <div className={styles.hint}>{hint}</div> : null}
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
}
