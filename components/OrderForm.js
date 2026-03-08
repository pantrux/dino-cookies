"use client";
import { useState } from 'react';
import styles from './OrderForm.module.css';
import Button from './ui/Button';
import Card from './ui/Card';
import Container from './ui/Container';
import Field from './ui/Field';
import Section from './ui/Section';
import Stack from './ui/Stack';
import { Input, Select, Textarea } from './ui/Input';

const COOKIE_TYPES = [
    "Trufa de Chocolate",
    "Chispas de Chocolate",
    "Almendra Crujiente",
    "Caramelo (Butterscotch)",
    "Caja Surtida"
];

export default function OrderForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
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
                        <h2 className={styles.title}>¿Listo para disfrutar?</h2>
                        <p className={styles.subtitle}>Completa el formulario para realizar tu pedido.</p>
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
                            <Field label="Cantidad (Docenas)" htmlFor="quantity" className={styles.group}>
                                <Input type="number" id="quantity" name="quantity" min="1" defaultValue="1" required />
                            </Field>
                        </div>

                        <Field label="Tipo de Galleta" htmlFor="type" className={styles.group}>
                            <Select id="type" name="type">
                                {COOKIE_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Dirección de Entrega" htmlFor="address" className={styles.group}>
                            <Textarea id="address" name="address" required rows="3" placeholder="Calle, Número, Comuna..." />
                        </Field>

                        {error && <div className={styles.error}>{error}</div>}
                        {success && <div className={styles.success}>¡Pedido realizado con éxito! Te contactaremos pronto.</div>}

                        <Button type="submit" fullWidth disabled={loading} className={styles.submit}>
                            {loading ? 'Enviando...' : 'Realizar Pedido'}
                        </Button>
                    </Stack>
                </Card>
            </Container>
        </Section>
    );
}
