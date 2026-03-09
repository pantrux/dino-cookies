import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.doodles} aria-hidden="true">
          <span className={styles.cloudA} />
          <span className={styles.cloudB} />
          <span className={styles.sparkles} />
          <span className={styles.dino} />
          <span className={styles.swirl} />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Repostería artesanal · Dino Cookies</p>

          <h1 id="hero-title" className={styles.title}>
            Galletas de horno
            <br />
            con espíritu jurásico.
          </h1>

          <p className={styles.subtitle}>
            Hechas a mano, horneadas a diario y pensadas para regalar (o devorar). Elige tus favoritas y arma tu box.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#order" className={`${styles.cta} ${styles.primaryCta}`}>
              Pedir ahora
            </Link>
            <Link href="#menu" className={`${styles.cta} ${styles.secondaryCta}`}>
              Ver menú
            </Link>
          </div>

          <div className={styles.trustRow} aria-label="Atributos principales">
            <div className={styles.trustItem}>
              <span className={styles.trustLabel}>Horneado</span>
              <strong className={styles.trustValue}>Diario</strong>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustLabel}>Ingredientes</span>
              <strong className={styles.trustValue}>Premium</strong>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustLabel}>Entrega</span>
              <strong className={styles.trustValue}>Santiago</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
