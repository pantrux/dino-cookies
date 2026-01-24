import styles from './ProductList.module.css';
import ProductCard from './ProductCard';

const PRODUCTS = [
    { id: 1, name: "Galletas de Chocolate Negro", price: 16, image: "/images/galletas-chocolate-negro.jpg" },
    { id: 2, name: "Trufa de Chocolate", price: 15, image: "/hero-bg.png" },
    { id: 3, name: "Chispas de Chocolate", price: 12, image: "/hero-bg.png" },
    { id: 4, name: "Almendra Crujiente", price: 18, image: "/hero-bg.png" },
    { id: 5, name: "Caramelo (Butterscotch)", price: 14, image: "/hero-bg.png" },
];

export default function ProductList() {
    return (
        <section className={styles.section} id="menu">
            <div className={styles.container}>
                <h2 className={styles.title}>Favoritos del Horno</h2>
                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeTrack}>
                        {/* Duplicate products to create seamless loop */}
                        {[...PRODUCTS, ...PRODUCTS].map((product, index) => (
                            <div key={`${product.id}-${index}`} className={styles.slide}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
