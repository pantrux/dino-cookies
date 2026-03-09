import Link from 'next/link';

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          GALLETAS CASERAS CON AMOR JURÁSICO
        </h1>

        <p className={styles.subtitle}>
          Descubre nuestra deliciosa colección de galletas artesanales, horneadas con magia y sabor.
        </p>

        <div className={styles.ctaWrap}>
          <Link href="#menu" className={styles.cta}>
            Ver colección
          </Link>
        </div>
      </div>
    </section>
  );
}
