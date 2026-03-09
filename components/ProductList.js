import styles from './ProductList.module.css';
import ProductCard from './ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function ProductList() {
  return (
    <section id="menu" className={styles.section} aria-labelledby="menu-title">
      <h2 id="menu-title" className={styles.srOnly}>
        Colección destacada
      </h2>

      <div className={styles.row}>
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
