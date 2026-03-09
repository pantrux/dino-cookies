import Image from 'next/image';
import Link from 'next/link';

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Repostería artesanal · Dino Cookies</p>

          <h1 id="hero-title" className={styles.title}>
            Cookies de horno,
            <br />
            estilo bakery moderna.
          </h1>

          <p className={styles.subtitle}>
            Horneadas a diario, ingredientes premium y boxes listos para regalar (o atacar en modo velociraptor).
            Elige tus favoritas y agenda tu entrega en Santiago.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#order" className={`${styles.cta} ${styles.primaryCta}`}>
              Pedir ahora
            </Link>
            <Link href="#menu" className={`${styles.cta} ${styles.secondaryCta}`}>
              Ver menú
            </Link>
          </div>

          <dl className={styles.metrics} aria-label="Atributos principales">
            <div className={styles.metric}>
              <dt className={styles.metricLabel}>Horneado</dt>
              <dd className={styles.metricValue}>Diario</dd>
            </div>
            <div className={styles.metric}>
              <dt className={styles.metricLabel}>Ingredientes</dt>
              <dd className={styles.metricValue}>Premium</dd>
            </div>
            <div className={styles.metric}>
              <dt className={styles.metricLabel}>Entrega</dt>
              <dd className={styles.metricValue}>Santiago</dd>
            </div>
          </dl>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/galletas-chocolate-negro.webp"
              alt="Galletas de chocolate negro"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 520px"
              className={styles.heroImage}
            />
            <div className={styles.imageGlow} aria-hidden="true" />
          </div>

          <div className={`${styles.floatingCard} ${styles.cardTop}`} aria-hidden="true">
            <span className={styles.cardKicker}>Más vendido</span>
            <span className={styles.cardTitle}>Chocolate Negro</span>
            <span className={styles.cardMeta}>★★★★★ · 5.0</span>
          </div>

          <div className={`${styles.floatingCard} ${styles.cardBottom}`} aria-hidden="true">
            <span className={styles.cardKicker}>Box listo</span>
            <span className={styles.cardTitle}>para regalo</span>
            <span className={styles.cardMeta}>Cinta + tarjeta</span>
          </div>
        </div>
      </div>
    </section>
  );
}
