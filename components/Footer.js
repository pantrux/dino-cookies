import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://www.instagram.com/dinocookies20252026/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>📸 Instagram</span>
        </a>
        <a
          className={styles.link}
          href="https://wa.me/56988136073"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>💬 WhatsApp</span>
        </a>
      </div>

      <p className={styles.copy}>
        Dino Cookies - © 2026 | Hecho con ❤️ para amantes de las galletas
      </p>
    </footer>
  );
}
