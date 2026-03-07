import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                />
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <div className={styles.rating}>★★★★★ 5.0</div>
                <button className={styles.button}>Agregar</button>
            </div>
        </div>
    );
}
