"use client";
import Image from 'next/image';
import { useState } from 'react';
import styles from './Header.module.css';
import Button from './ui/Button';
import AppLink from './ui/AppLink';
import CartDrawer from './cart/CartDrawer';
import { useCart } from './cart/cart-context';

export default function Header() {
    const [open, setOpen] = useState(false);
    const cart = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Image src="/logo-v3.png" alt="Dino Cookies Logo" width={220} height={180} priority />
                </div>
                <nav className={styles.nav}>
                    <AppLink href="/" variant="nav">Inicio</AppLink>
                    <AppLink href="#menu" variant="nav">Menú</AppLink>
                    <Button href="#order" variant="outline" className={styles.cta}>Pedir Ahora</Button>
                    <Button variant="outline" onClick={() => setOpen(true)} className={styles.cartBtn}>
                        Carrito
                        {cart.totalQty > 0 ? <span className={styles.badge}>{cart.totalQty}</span> : null}
                    </Button>
                </nav>
            </div>

            <CartDrawer open={open} onClose={() => setOpen(false)} />
        </header>
    );
}
