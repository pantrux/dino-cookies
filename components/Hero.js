import Link from 'next/link';
import styles from './Hero.module.css';

const highlights = [
  'Horneadas cada mañana',
  'Ingredientes premium',
  'Entrega en Santiago y retiro en tienda',
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Dino Cookies · Repostería artesanal</p>
          <h1 id="hero-title" className={styles.title}>
            Galletas jurásicamente buenas para alegrar cualquier día
          </h1>
          <p className={styles.subtitle}>
            Elige tus sabores favoritos, confirma tu pedido en minutos y recibe un box recién horneado.
            Sin complicaciones, sin formularios eternos.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#order" className={`${styles.cta} ${styles.primaryCta}`}>
              Pedir ahora
            </Link>
            <Link href="#menu" className={`${styles.cta} ${styles.secondaryCta}`}>
              Ver menú
            </Link>
          </div>

          <ul className={styles.highlightList}>
            {highlights.map((item) => (
              <li key={item} className={styles.highlightItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.infoCard} aria-label="Información de despacho">
          <p className={styles.cardOverline}>Entrega express</p>
          <p className={styles.cardLead}>Tu pedido en menos de 2 horas*</p>
          <p className={styles.cardBody}>
            Cobertura en zonas habilitadas. También puedes retirar en tienda el mismo día.
          </p>
          <div className={styles.cardMeta}>
            <div>
              <span className={styles.metaLabel}>Horario</span>
              <strong className={styles.metaValue}>09:00 - 20:00</strong>
            </div>
            <div>
              <span className={styles.metaLabel}>Pedidos hoy</span>
              <strong className={styles.metaValue}>+120</strong>
            </div>
          </div>
          <p className={styles.cardFootnote}>*Tiempo estimado según distancia y demanda.</p>
        </aside>
      </div>
    </section>
  );
}
