"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import Button from './ui/Button';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Image src="/logo-v3.png" alt="Dino Cookies Logo" width={220} height={180} priority />
                </div>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Inicio</Link>
                    <Link href="#menu" className={styles.navLink}>Menú</Link>
                    <Button href="#order" variant="outline" className={styles.cta}>Pedir Ahora</Button>
                </nav>
            </div>
        </header>
    );
}
