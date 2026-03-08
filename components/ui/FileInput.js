import styles from './FileInput.module.css';
import { cx } from './utils';

/**
 * FileInput
 * - Simple wrapper for `<input type="file">` with consistent styling.
 */
export default function FileInput({ className, ...props }) {
  return <input type="file" className={cx(styles.control, className)} {...props} />;
}
