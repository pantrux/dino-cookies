import styles from './Footer.module.css';
import Container from './ui/Container';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size="lg">
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.eyebrow}>Dino Cookies</p>
            <p className={styles.tagline}>Horneamos felicidad en formato galleta 🦕🍪</p>
          </div>

          <div className={styles.links}>
            <a
              className={styles.link}
              href="https://www.instagram.com/dinocookies20252026/"
              target="_blank"
              rel="noopener noreferrer"
            >
              📸 Instagram
            </a>
            <a
              className={styles.link}
              href="https://wa.me/56988136073"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        <p className={styles.copy}>© 2026 Dino Cookies · Hecho con cariño para amantes de las galletas</p>
      </Container>
    </footer>
  );
}
