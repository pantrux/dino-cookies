import styles from './Footer.module.css';
import Container from './ui/Container';

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Pie de página">
      <Container size="lg">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.kicker}>Dino Cookies</p>
            <p className={styles.tagline}>Repostería artesanal, horneada en pequeños lotes.</p>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Explorar</p>
            <a className={styles.footerLink} href="#menu">Menú</a>
            <a className={styles.footerLink} href="#order">Pedido</a>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Contacto</p>
            <a
              className={styles.footerLink}
              href="https://www.instagram.com/dinocookies20252026/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className={styles.footerLink}
              href="https://wa.me/56988136073"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <p className={styles.copy}>© 2026 Dino Cookies · Hecho en Santiago.</p>
      </Container>
    </footer>
  );
}
