import styles from './ProductList.module.css';
import ProductCard from './ProductCard';
import Container from './ui/Container';
import Heading from './ui/Heading';
import Section from './ui/Section';

const PRODUCTS = [
  { id: 1, name: 'Galletas de Chocolate Negro', price: 16, image: '/images/galletas-chocolate-negro.jpg' },
  { id: 2, name: 'Trufa de Chocolate', price: 15, image: '/hero-bg.png' },
  { id: 3, name: 'Chispas de Chocolate', price: 12, image: '/hero-bg.png' },
  { id: 4, name: 'Almendra Crujiente', price: 18, image: '/hero-bg.png' },
  { id: 5, name: 'Caramelo (Butterscotch)', price: 14, image: '/hero-bg.png' },
];

export default function ProductList() {
  return (
    <Section id="menu" surface="page" paddingY="md" className={styles.section}>
      <Container size="lg">
        <header className={styles.header}>
          <Heading level={2} size="3xl" tone="brand" className={styles.title}>
            Favoritos del Horno
          </Heading>
          <p className={styles.subtitle}>
            Selección recomendada por nuestros clientes. Receta casera, textura suave y mucho chocolate.
          </p>
        </header>

        <div className={styles.grid}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
