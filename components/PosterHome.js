"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './PosterHome.module.css';
import { POSTER_PRODUCTS } from '@/lib/posterProducts';
import CartDrawer from './cart/CartDrawer';
import { useCart } from './cart/cart-context';

const PRODUCT_HOTSPOTS = [
  { left: '25.5%', top: '35.8%', width: '11.2%', height: '31%' },
  { left: '38.5%', top: '35.8%', width: '11.2%', height: '31%' },
  { left: '51.1%', top: '35.8%', width: '11.2%', height: '31%' },
  { left: '63.7%', top: '35.8%', width: '11.2%', height: '31%' },
];

const BOTTOM_LINKS = [
  { label: 'Inicio', href: '/', left: '11.2%', top: '91.4%', width: '3.5%', height: '3.6%' },
  { label: 'Galletas', href: '#productos', left: '15.3%', top: '91.4%', width: '5.2%', height: '3.6%' },
  { label: 'Nosotros', href: '#nosotros', left: '20.8%', top: '91.4%', width: '5.2%', height: '3.6%' },
  { label: 'Blog', href: 'https://www.instagram.com/dinocookies20252026/', left: '25.9%', top: '91.4%', width: '3.2%', height: '3.6%' },
  { label: 'Contacto', href: 'https://wa.me/56988136073', left: '29.6%', top: '91.4%', width: '5.3%', height: '3.6%' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com', left: '44.8%', top: '91.4%', width: '2.3%', height: '4.2%' },
  { label: 'Instagram', href: 'https://www.instagram.com/dinocookies20252026/', left: '47.8%', top: '91.4%', width: '2.3%', height: '4.2%' },
  { label: 'Email', href: 'mailto:skynetbot.pantrux@gmail.com', left: '50.9%', top: '91.4%', width: '2.3%', height: '4.2%' },
];

export default function PosterHome() {
  const cart = useCart();
  const [openCart, setOpenCart] = useState(false);

  const liveSummary = useMemo(() => {
    if (cart.totalQty === 0) return 'Carrito vacío';
    return `${cart.totalQty} producto${cart.totalQty === 1 ? '' : 's'} en el carrito`;
  }, [cart.totalQty]);

  const focusFirstProduct = () => {
    const first = document.querySelector('[data-poster-product="0"]');
    if (first instanceof HTMLElement) first.focus();
  };

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.posterShell} aria-labelledby="poster-title">
        <div className={styles.poster}>
          <Image
            src="/images/reference/home-reference.jpg"
            alt="Diseño final de Dino Cookies con estética parchment vintage y galería destacada de productos"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className={styles.posterImage}
          />

          <h1 id="poster-title" className={styles.srOnly}>
            Dino Cookies — landing visual final
          </h1>
          <p className={styles.srOnly} id="productos">
            Colección destacada de productos.
          </p>
          <p className={styles.srOnly} id="nosotros">
            Sección Nosotros.
          </p>

          <button
            type="button"
            className={styles.hotspot}
            style={{ left: '43.2%', top: '28.7%', width: '13.4%', height: '7.2%' }}
            onClick={focusFirstProduct}
            aria-label="Ver colección de galletas destacadas"
          />

          {POSTER_PRODUCTS.map((product, index) => (
            <button
              key={product.id}
              type="button"
              className={styles.hotspot}
              style={PRODUCT_HOTSPOTS[index]}
              data-poster-product={index}
              aria-label={`Añadir ${product.name} al carrito por ${product.priceLabel}`}
              onClick={() => {
                cart.addItem(product, 1);
                setOpenCart(true);
              }}
            />
          ))}

          {BOTTOM_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.hotspot}
              style={{ left: link.left, top: link.top, width: link.width, height: link.height }}
              aria-label={link.label}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            />
          ))}

          {SOCIAL_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.hotspotCircle}
              style={{ left: link.left, top: link.top, width: link.width, height: link.height }}
              aria-label={link.label}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            />
          ))}

        </div>
      </section>

      <div className={styles.a11yControls}>
        <Link href="/pedido" className={styles.assistControl} aria-label="Ir al formulario de pedido">
          Ir a pedido
        </Link>
        <button
          type="button"
          className={styles.assistControl}
          onClick={() => setOpenCart(true)}
          aria-label={`Abrir carrito. ${liveSummary}`}
        >
          Abrir carrito
          {cart.totalQty > 0 ? <span className={styles.cartBadge}>{cart.totalQty}</span> : null}
        </button>
      </div>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </main>
  );
}
