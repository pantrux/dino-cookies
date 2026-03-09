import styles from './page.module.css';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import BakerySection from '@/components/BakerySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className={styles.referenceTheme}>
      <div className={styles.poster}>
        <Header />
        <main id="main-content" tabIndex={-1} className={styles.main}>
          <Hero />
          <ProductList />
          <BakerySection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
