import Image from 'next/image';
import styles from './BakerySection.module.css';

export default function BakerySection() {
  return (
    <section id="nosotros" className={styles.section} aria-labelledby="bakery-title">
      <div className={styles.grid}>
        <div className={styles.illustration} aria-hidden="true">
          <Image
            src="/images/reference/bakery-illustration-ref.jpg"
            alt=""
            fill
            sizes="(max-width: 900px) 280px, 360px"
            className={styles.image}
          />
        </div>

        <div className={styles.copy}>
          <h2 id="bakery-title" className={styles.title}>
            Nosotros
          </h2>

          <p className={styles.body}>
            En Dino Cookies horneamos galletas artesanales con recetas caseras, ingredientes seleccionados y una
            obsesión feliz por los detalles. Cada sabor nace para sentirse especial: cálido, divertido y absolutamente
            devorable.
          </p>
        </div>
      </div>
    </section>
  );
}
