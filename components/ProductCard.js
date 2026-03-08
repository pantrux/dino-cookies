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

export default function ProductCard({ product, index = 0 }) {
    const cart = useCart();
    const rating = Number(product.rating ?? 5);

    const tilts = ['-2.2deg', '1.8deg', '-1.2deg', '2.4deg', '-1.6deg'];
    const tilt = tilts[index % tilts.length];

    return (
        <Card
            className={styles.card}
            padding="none"
            surface="elevated"
            shadow="none"
            border="none"
            style={{ '--polaroid-tilt': tilt }}
        >
            <div className={styles.inner}>
                <div className={styles.imagePlaceholder}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    />
                </div>
                <div className={styles.info}>
                    <p className={styles.tag}>Cookie</p>
                    <h3 className={styles.name}>{product.name}</h3>
                    <div className={styles.metaRow}>
                        <p className={styles.price}>${product.price}</p>
                        <div className={styles.rating} aria-label={`Rating ${rating.toFixed(1)} de 5`}>
                            {getStars(rating)}
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => cart.addItem(product, 1)}
                        className={styles.button}
                    >
                        Agregar
                    </Button>
                </div>
            </div>
        </Card>
    );
}
