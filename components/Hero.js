import Link from 'next/link';
import Image from 'next/image';
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
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Repostería artesanal · Dino Cookies</p>

          <h1 id="hero-title" className={styles.title}>
            Galletas de horno
            <br />
            con espíritu jurásico.
          </h1>

          <p className={styles.subtitle}>
            Sabores intensos, textura suave y un toque editorial. Elige tus favoritos y arma tu box en minutos.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#order" className={`${styles.cta} ${styles.primaryCta}`}>
              Pedir ahora
            </Link>
            <Link href="#menu" className={`${styles.cta} ${styles.secondaryCta}`}>
              Ver menú
            </Link>
          </div>

          <div className={styles.trustRow}>
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

        <aside className={styles.heroCard} aria-label="Dato destacado">
          <div className={styles.heroCardInner}>
            <p className={styles.cardKicker}>Edición de temporada</p>
            <p className={styles.cardTitle}>Chocolate negro + sal de mar</p>
            <p className={styles.cardBody}>
              Un clásico con borde crujiente, centro suave y un final largo.
            </p>
            <div className={styles.cardMeta}>
              <span className={styles.metaTag}>Best seller</span>
              <span className={styles.metaTag}>Box mixto</span>
            </div>
          </div>
          <div className={styles.heroCardMedia} aria-hidden="true">
            <Image
              src="/images/galletas-chocolate-negro.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className={styles.heroCardImage}
              priority
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
