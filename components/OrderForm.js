"use client";
import { useMemo, useState } from 'react';
import styles from './OrderForm.module.css';
import Button from './ui/Button';
import Card from './ui/Card';
import Container from './ui/Container';
import Field from './ui/Field';
import Alert from './ui/Alert';
import Heading from './ui/Heading';
import Section from './ui/Section';
import Stack from './ui/Stack';
import Text from './ui/Text';
import { Input, Textarea } from './ui/Input';
import { useCart } from './cart/cart-context';

function formatPriceFromUnit(price) {
    const n = Number(price);
    if (!Number.isFinite(n)) return '$0';
    if (Number.isInteger(n)) return `$${n}`;
    return `$${n.toFixed(2)}`;
}

function formatPriceFromCents(cents) {
    const n = Number(cents);
    if (!Number.isFinite(n)) return '$0';
    if (n % 100 === 0) return `$${n / 100}`;
    return `$${(n / 100).toFixed(2)}`;
}

export default function OrderForm() {
    const cart = useCart();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const cartSummary = useMemo(() => {
        return {
            totalQty: cart.totalQty,
            subtotal: formatPriceFromCents(cart.subtotalCents),
            items: cart.items,
        };
    }, [cart.items, cart.totalQty, cart.subtotalCents]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        if (cart.totalQty === 0) {
            setError('Tu carrito está vacío. Agrega productos antes de pedir.');
            setLoading(false);
            return;
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            ...data,
            quantity: cart.totalQty,
            type: 'Carrito',
            items: cart.items,
            subtotalCents: cart.subtotalCents,
        };

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setSuccess(true);
                cart.clear();
                e.target.reset();
            } else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Error al enviar el pedido');
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Algo salió mal. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section id="order" className={styles.section} surface="subtle" paddingY="lg">
            <Container size="sm">
                <Card padding="lg">
                    <div className={styles.header}>
                        <Heading level={2} size="4xl" tone="brand" className={styles.title}>
                            ¿Listo para disfrutar?
                        </Heading>
                        <Text className={styles.subtitle} tone="muted">
                            Completa el formulario para realizar tu pedido.
                        </Text>
                    </div>

                    <Stack as="form" className={styles.form} gap={6} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <Field label="Nombre" htmlFor="firstName" className={styles.group}>
                                <Input type="text" id="firstName" name="firstName" required placeholder="Juan" />
                            </Field>
                            <Field label="Apellido" htmlFor="lastName" className={styles.group}>
                                <Input type="text" id="lastName" name="lastName" required placeholder="Pérez" />
                            </Field>
                        </div>

                        <Field label="Correo Electrónico" htmlFor="email" className={styles.group}>
                            <Input type="email" id="email" name="email" required placeholder="juan.perez@ejemplo.com" />
                        </Field>

                        <div className={styles.row}>
                            <Field label="Teléfono" htmlFor="phone" className={styles.group}>
                                <Input type="tel" id="phone" name="phone" required placeholder="+56 9 1234 5678" />
                            </Field>
                            <div className={styles.group}>
                                <Text as="div" tone="muted" size="sm" className={styles.cartLabel}>Resumen de carrito</Text>
                                <Card className={styles.cartSummary} padding="sm" shadow="none" radius="sm" border="none">
                                    {cartSummary.items.length === 0 ? (
                                        <Text tone="muted" size="sm">Carrito vacío</Text>
                                    ) : (
                                        <Stack gap={2}>
                                            {cartSummary.items.map((it) => (
                                                <div key={it.id} className={styles.cartRow}>
                                                    <Text as="div" tone="primary" size="sm" className={styles.cartItemName}>
                                                        {it.qty}× {it.name}
                                                    </Text>
                                                    <Text as="div" tone="muted" size="sm">
                                                        {formatPriceFromUnit(it.price)} c/u
                                                    </Text>
                                                </div>
                                            ))}
                                            <div className={styles.cartTotal}>
                                                <Text as="div" tone="muted" size="sm">
                                                    Total ({cartSummary.totalQty})
                                                </Text>
                                                <Text as="div" tone="primary" weight="bold">
                                                    {cartSummary.subtotal}
                                                </Text>
                                            </div>
                                        </Stack>
                                    )}
                                </Card>
                            </div>
                        </div>

                        <Field label="Dirección de Entrega" htmlFor="address" className={styles.group}>
                            <Textarea id="address" name="address" required rows="3" placeholder="Calle, Número, Comuna..." />
                        </Field>

                        {cart.totalQty === 0 && !success ? (
                            <Alert tone="warning">Tu carrito está vacío. Agrega productos desde el menú.</Alert>
                        ) : null}

                        {error && <Alert tone="danger">{error}</Alert>}
                        {success && (
                            <Alert tone="success">¡Pedido realizado con éxito! Te contactaremos pronto.</Alert>
                        )}

                        <Button type="submit" fullWidth disabled={loading || cart.totalQty === 0} className={styles.submit}>
                            {loading ? 'Enviando...' : 'Realizar Pedido'}
                        </Button>
                    </Stack>
                </Card>
            </Container>
        </Section>
    );
}
