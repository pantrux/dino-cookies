import Link from 'next/link';
import styles from './Footer.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '#menu', label: 'Galletas' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: 'https://www.instagram.com/dinocookies20252026/', label: 'Instagram' },
  { href: 'https://wa.me/56988136073', label: 'Contacto' },
];

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/dinocookies20252026/', label: '◎', title: 'Instagram' },
  { href: 'mailto:skynetbot.pantrux@gmail.com', label: '✉', title: 'Email' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacto" aria-label="Pie de página">
      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.grid}>
        <nav className={styles.nav} aria-label="Navegación del sitio">
          {NAV_LINKS.map((link) => {
            if (link.href.startsWith('/')) {
              return (
                <Link key={link.label} className={styles.navLink} href={link.href}>
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.label}
                className={styles.navLink}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className={styles.socialBlock}>
          <p className={styles.label}>Social media</p>
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.title}
                className={styles.socialLink}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={link.title}
                title={link.title}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.followBlock}>
          <p className={styles.label}>Síguenos</p>
          <a
            className={styles.followLink}
            href="https://www.instagram.com/dinocookies20252026/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @dinocookies20252026
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
