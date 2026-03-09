import styles from './ProductList.module.css';
import ProductCard from './ProductCard';
import { POSTER_PRODUCTS } from '@/lib/posterProducts';

export default function ProductList() {
  return (
    <section id="menu" className={styles.section} aria-labelledby="menu-title">
      <h2 id="menu-title" className={styles.srOnly}>
        Colección destacada
      </h2>

      <div className={styles.row}>
        {POSTER_PRODUCTS.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
