import styles from './Alert.module.css';
import { cx } from './utils';

/**
 * Alert
 * - tone: success | danger | warning | info
 */
export default function Alert({ tone = 'info', className, children, ...props }) {
  return (
    <div className={cx(styles.base, styles[`tone_${tone}`], className)} role="status" {...props}>
      {children}
    </div>
  );
}
