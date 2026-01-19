import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import ReviewSection from '@/components/ReviewSection';
import OrderForm from '@/components/OrderForm';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductList />
        <ReviewSection />
        <OrderForm />
      </main>
      <footer style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
        <p>Dino Cookies - © 2026</p>
      </footer>
    </>
  );
}
