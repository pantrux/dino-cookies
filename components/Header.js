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
      <div className={styles.utility}>
        <Button variant="outline" onClick={() => setOpen(true)} className={styles.cartBtn}>
          Carrito
          {cart.totalQty > 0 ? <span className={styles.badge}>{cart.totalQty}</span> : null}
        </Button>
      </div>

      <div className={styles.mast}>
        <AppLink href="/" className={styles.logoSeal} aria-label="Dino Cookies">
          <Image
            src="/brand/seal-dino-cookies.svg"
            alt="Dino Cookies"
            width={188}
            height={188}
            sizes="188px"
            priority
          />
        </AppLink>
      </div>

      <CartDrawer open={open} onClose={handleClose} />
    </header>
  );
}
