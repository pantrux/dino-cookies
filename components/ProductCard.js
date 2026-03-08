"use client";

import Image from 'next/image';
import styles from './ProductCard.module.css';
import Card from './ui/Card';
import Button from './ui/Button';
import { useCart } from './cart/cart-context';

export default function ProductCard({ product }) {
    const cart = useCart();

    return (
        <Card className={styles.card} padding="none" surface="elevated" shadow="sm" border="default">
            <div className={styles.imagePlaceholder}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <div className={styles.rating}>★★★★★ 5.0</div>
                <Button
                    variant="outline"
                    onClick={() => cart.addItem(product, 1)}
                    className={styles.button}
                >
                    Agregar
                </Button>
            </div>
        </Card>
    );
}
