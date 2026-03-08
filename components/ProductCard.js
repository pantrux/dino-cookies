"use client";

import Image from 'next/image';
import styles from './ProductCard.module.css';
import Card from './ui/Card';
import Button from './ui/Button';
import { useCart } from './cart/cart-context';

function getStars(rating = 5) {
    const rounded = Math.round(Number(rating) || 5);
    return '★'.repeat(Math.max(1, Math.min(5, rounded)));
}

export default function ProductCard({ product }) {
    const cart = useCart();
    const rating = Number(product.rating ?? 5);

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
                <div className={styles.rating}>{getStars(rating)} {rating.toFixed(1)}</div>
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
