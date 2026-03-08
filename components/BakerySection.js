import Image from 'next/image';
import styles from './BakerySection.module.css';
import Container from './ui/Container';
import Section from './ui/Section';

export default function BakerySection() {
  return (
    <Section className={styles.section} aria-labelledby="bakery-title" surface="page" paddingY="lg">
      <Container size="lg">
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.kicker}>Bakery</p>
            <h2 id="bakery-title" className={styles.title}>
              Hechas a mano, como antes.
            </h2>
            <p className={styles.body}>
              Nuestra masa se trabaja en pequeños lotes, con mantequilla real y chocolate de verdad.
              Sin atajos: cada bandeja sale del horno cuando está lista.
            </p>
            <ul className={styles.bullets}>
              <li>Horneado diario</li>
              <li>Ingredientes premium</li>
              <li>Textura suave por dentro, bordes crujientes</li>
            </ul>
          </div>

          <div className={styles.illustration} aria-hidden="true">
            <div className={styles.frame}>
              <Image
                src="/images/bakery-illustration.svg"
                alt=""
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, 520px"
                className={styles.image}
              />
            </div>
            <div className={styles.doodleTop} />
            <div className={styles.doodleBottom} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
