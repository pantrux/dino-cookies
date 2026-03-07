import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import ReviewSection from '@/components/ReviewSection';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';

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
      <Footer />
    </>
  );
}
