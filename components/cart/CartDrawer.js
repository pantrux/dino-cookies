"use client";

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './CartDrawer.module.css';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Stack from '../ui/Stack';
import Text from '../ui/Text';
import { Input } from '../ui/Input';
import { useCart } from './cart-context';

function formatPriceFromUnit(price) {
  const n = Number(price);
  return `$${Number.isFinite(n) ? n : 0}`;
}

function formatPriceFromCents(cents) {
  const n = Number(cents);
  if (!Number.isFinite(n)) return '$0';
  if (n % 100 === 0) return `$${n / 100}`;
  return `$${(n / 100).toFixed(2)}`;
}

export default function CartDrawer({ open, onClose }) {
  const cart = useCart();
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const [draftQty, setDraftQty] = useState({});

  // discard drafts when closing
  useEffect(() => {
    if (!open) setDraftQty({});
  }, [open]);

  // remove stale drafts when items change (remove/clear)
  useEffect(() => {
    if (!open) return;
    setDraftQty((prev) => {
      const ids = new Set(cart.items.map((x) => x.id));
      const next = {};
      for (const [k, v] of Object.entries(prev)) {
        if (ids.has(k)) next[k] = v;
      }
      return next;
    });
  }, [open, cart.items]);

  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }

      if (e.key === 'Tab') {
        const root = panelRef.current;
        if (!root) return;

        const focusable = root.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      // restore focus to previous element
      const el = lastFocusedRef.current;
      if (el && typeof el.focus === 'function') el.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const ui = (
    <div className={styles.overlay} onClick={() => onClose?.()}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        onClick={(e) => e.stopPropagation()}
        ref={panelRef}
      >
        <Card className={styles.card}>
          <Stack direction="row" justify="between" align="center" className={styles.header}>
            <Heading level={3} size="2xl">Carrito</Heading>
            <Button
              variant="ghost"
              onClick={onClose}
              aria-label="Cerrar carrito"
              ref={closeBtnRef}
            >
              Cerrar
            </Button>
          </Stack>

          {cart.items.length === 0 ? (
            <Text tone="muted">Tu carrito está vacío.</Text>
          ) : (
            <Stack gap={4} className={styles.content}>
              <div className={styles.items}>
                <Stack gap={4}>
                  {cart.items.map((item) => (
                    <div key={item.id} className={styles.itemRow}>
                      <div className={styles.itemMeta}>
                        <Text as="div" tone="primary" weight="semibold">{item.name}</Text>
                        <Text as="div" tone="muted" size="sm">{formatPriceFromUnit(item.price)} c/u</Text>
                      </div>

                      <div className={styles.itemControls}>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={draftQty[item.id] ?? String(item.qty)}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v === '' || /^[0-9]{0,2}$/.test(v)) {
                              setDraftQty((s) => ({ ...s, [item.id]: v }));
                            }
                          }}
                          onBlur={() => {
                            const v = draftQty[item.id];
                            if (v == null) return;
                            const n = Number(v);
                            cart.setQty(item.id, Number.isFinite(n) ? n : 1);
                            setDraftQty((s) => {
                              const next = { ...s };
                              delete next[item.id];
                              return next;
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.currentTarget.blur();
                          }}
                          aria-label={`Cantidad de ${item.name}`}
                          className={styles.qty}
                        />
                        <Button
                          variant="ghost"
                          tone="danger"
                          onClick={() => {
                            setDraftQty((s) => {
                              const next = { ...s };
                              delete next[item.id];
                              return next;
                            });
                            cart.removeItem(item.id);
                          }}
                        >
                          Quitar
                        </Button>
                      </div>
                    </div>
                  ))}
                </Stack>
              </div>

              <div className={styles.summary}>
                <Text as="div" tone="muted" size="sm">Subtotal</Text>
                <Text as="div" tone="primary" weight="bold">
                  {formatPriceFromCents(cart.subtotalCents)}
                </Text>
              </div>

              <Stack direction="row" gap={2}>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setDraftQty({});
                    cart.clear();
                  }}
                  tone="danger"
                >
                  Vaciar
                </Button>
                <Button fullWidth href="#order" onClick={onClose}>
                  Ir a pedir
                </Button>
              </Stack>
            </Stack>
          )}
        </Card>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(ui, document.body);
}
