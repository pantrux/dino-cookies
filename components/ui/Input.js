import styles from './Input.module.css';
import { cx } from './utils';

export function Input({ className, error, ...props }) {
  return (
    <input
      className={cx(styles.control, error && styles.error, className)}
      {...props}
    />
  );
}

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cx(styles.control, error && styles.error, className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cx(styles.control, styles.textarea, error && styles.error, className)}
      {...props}
    />
  );
}
