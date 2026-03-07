"use client";
import { useState } from 'react';
import styles from './OrderForm.module.css';
import Button from './ui/Button';

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
        <section id="order" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>¿Listo para disfrutar?</h2>
                        <p className={styles.subtitle}>Completa el formulario para realizar tu pedido.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="firstName" className={styles.label}>Nombre</label>
                                <input type="text" id="firstName" name="firstName" required className={styles.input} placeholder="Juan" />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="lastName" className={styles.label}>Apellido</label>
                                <input type="text" id="lastName" name="lastName" required className={styles.input} placeholder="Pérez" />
                            </div>
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
                            <input type="email" id="email" name="email" required className={styles.input} placeholder="juan.perez@ejemplo.com" />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="phone" className={styles.label}>Teléfono</label>
                                <input type="tel" id="phone" name="phone" required className={styles.input} placeholder="+56 9 1234 5678" />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="quantity" className={styles.label}>Cantidad (Docenas)</label>
                                <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" required className={styles.input} />
                            </div>
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="type" className={styles.label}>Tipo de Galleta</label>
                            <select id="type" name="type" className={styles.select}>
                                {COOKIE_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="address" className={styles.label}>Dirección de Entrega</label>
                            <textarea id="address" name="address" required className={styles.textarea} rows="3" placeholder="Calle, Número, Comuna..."></textarea>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}
                        {success && <div className={styles.success}>¡Pedido realizado con éxito! Te contactaremos pronto.</div>}

                        <Button type="submit" fullWidth disabled={loading} className={styles.submit}>
                            {loading ? 'Enviando...' : 'Realizar Pedido'}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
