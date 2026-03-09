"use client";

import Image from 'next/image';
import { useCallback, useState } from 'react';
import styles from './Header.module.css';
import Button from './ui/Button';
import AppLink from './ui/AppLink';
import CartDrawer from './cart/CartDrawer';
import { useCart } from './cart/cart-context';

export default function Header() {
    const [open, setOpen] = useState(false);
    const cart = useCart();

    const handleClose = useCallback(() => setOpen(false), []);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <AppLink href="/" className={styles.logoSeal} aria-label="Dino Cookies">
                        <Image
                            src="/brand/seal-dino-cookies.svg"
                            alt=""
                            width={220}
                            height={220}
                            sizes="112px"
                            priority
                        />
                    </AppLink>
                </div>

                <nav className={styles.nav} aria-label="Navegación principal">
                    <AppLink href="#menu" variant="nav">Menú</AppLink>
                    <AppLink href="#order" variant="nav">Pedido</AppLink>
                    <Button href="#order" variant="outline" className={styles.cta}>Pedir ahora</Button>
                </nav>

                <div className={styles.utility}>
                    <Button variant="outline" onClick={() => setOpen(true)} className={styles.cartBtn}>
                        Carrito
                        {cart.totalQty > 0 ? <span className={styles.badge}>{cart.totalQty}</span> : null}
                    </Button>
                </div>
            </div>

            <CartDrawer open={open} onClose={handleClose} />
        </header>
    );
}
