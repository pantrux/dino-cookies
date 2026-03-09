import styles from '../page.module.css';

import Header from '@/components/Header';
import OrderForm from '@/components/OrderForm';

export const metadata = {
  title: 'Pedido | Dino Cookies',
  description: 'Finaliza tu pedido de Dino Cookies y agenda la entrega.',
};

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
