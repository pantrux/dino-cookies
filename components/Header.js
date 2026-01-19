"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src="/logo.png" alt="Dino Cookies Logo" width={120} height={120} priority />
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>Inicio</Link>
                    <Link href="#menu" className={styles.link}>Menú</Link>
                    <Link href="#order" className={styles.cta}>Pedir Ahora</Link>
                </nav>
            </div>
        </header>
    );
}
