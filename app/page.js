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
      <footer style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '3rem 2rem', textAlign: 'center', marginTop: '4rem' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="https://www.instagram.com/dinocookies20252026/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📸 Instagram</span>
          </a>
          <a href="https://wa.me/56988136073" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💬 WhatsApp</span>
          </a>
        </div>
        <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Dino Cookies - © 2026 | Hecho con ❤️ para amantes de las galletas</p>
      </footer>
    </>
  );
}
