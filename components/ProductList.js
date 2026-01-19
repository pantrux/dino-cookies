import styles from './ProductList.module.css';
import ProductCard from './ProductCard';

const PRODUCTS = [
    { id: 1, name: "Trufa de Chocolate", price: 15, image: "/hero-bg.png" }, // Using hero image as placeholder
    { id: 2, name: "Chispas de Chocolate", price: 12, image: "/hero-bg.png" },
    { id: 3, name: "Almendra Crujiente", price: 18, image: "/hero-bg.png" },
    { id: 4, name: "Caramelo (Butterscotch)", price: 14, image: "/hero-bg.png" },
];

export default function ProductList() {
    return (
        <section className={styles.section} id="menu">
            <div className={styles.container}>
                <h2 className={styles.title}>Favoritos del Horno</h2>
                <div className={styles.grid}>
                    {PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
