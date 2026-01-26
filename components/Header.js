"use client";
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image src="/logo-pixar.png" alt="Dino Cookies Logo" width={100} height={100} priority />
                    <span className={styles.brandName}>Dino Cookies</span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>Inicio</Link>
                    <Link href="#menu" className={styles.link}>Menú</Link>
                    <Link href="#order" className={styles.cta}>Pedir Galletas</Link>
                </nav>
            </div>
        </header>
    );
}
