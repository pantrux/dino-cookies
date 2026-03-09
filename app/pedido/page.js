import styles from '../page.module.css';

import Header from '@/components/Header';
import OrderForm from '@/components/OrderForm';

export default function PedidoPage() {
  return (
    <div className={styles.referenceTheme}>
      <div className={styles.poster}>
        <Header />
        <main id="main-content" tabIndex={-1} className={styles.main}>
          <OrderForm />
        </main>
      </div>
    </div>
  );
}
