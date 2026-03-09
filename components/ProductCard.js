"use client";

import Image from 'next/image';
import styles from './ProductCard.module.css';
import Button from './ui/Button';
import { useCart } from './cart/cart-context';

const POLAROID_TILTS = ['-3deg', '-1.4deg', '1.4deg', '3deg'];
const POLAROID_OFFSETS = ['0px', '6px', '4px', '2px'];

export default function ProductCard({ product, index = 0 }) {
  const cart = useCart();

  return (
    <article
      className={styles.card}
      style={{
        '--polaroid-tilt': POLAROID_TILTS[index % POLAROID_TILTS.length],
        '--polaroid-offset': POLAROID_OFFSETS[index % POLAROID_OFFSETS.length],
      }}
    >
      <div className={styles.inner}>
        <div className={styles.photoWrap}>
          <div className={styles.photoFrame}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 620px) 42vw, (max-width: 1024px) 240px, 260px"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.meta}>
          <p className={styles.titleRow}>
            <span className={styles.name}>{product.name}</span>
            <span className={styles.price}>- {product.priceLabel}</span>
          </p>

          <Button
            variant="primary"
            className={styles.button}
            onClick={() => cart.addItem(product, 1)}
          >
            Añadir al carrito
          </Button>
        </div>
      </div>
    </article>
  );
}
