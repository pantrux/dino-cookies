"use client";
import { useState } from 'react';
import styles from './ReviewSection.module.css';
import Button from './ui/Button';
import Card from './ui/Card';
import Container from './ui/Container';
import Field from './ui/Field';
import Stack from './ui/Stack';
import { Input, Textarea } from './ui/Input';

const MOCK_REVIEWS = [
    { id: 1, user: "Maria G.", text: "¡Las trufas de chocolate son para morirse! 😍", image: null },
    { id: 2, user: "Carlos R.", text: "El mejor regalo de cumpleaños. Llegaron frescas.", image: null },
    { id: 3, user: "Sofia L.", text: "Me encantó la presentación.", image: null },
];

export default function ReviewSection() {
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        const text = e.target.text.value;
        const name = e.target.name.value;
        alert("¡Gracias por tu reseña! Será aprobada pronto.");
        setReviews([...reviews, { id: Date.now(), user: name, text, image: null }]);
        setShowForm(false);
        e.target.reset();
    };

    return (
        <section className={styles.section}>
            <Container className={styles.container} size="md">
                <h2 className={styles.title}>Amor de Clientes</h2>
                <div className={styles.grid}>
                    {reviews.map(review => (
                        <Card key={review.id} className={styles.card} padding="sm" radius="sm" shadow="none">
                            <div className={styles.avatar}>{review.user.charAt(0)}</div>
                            <div>
                                <h4 className={styles.username}>{review.user}</h4>
                                <p className={styles.text}>{review.text}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className={styles.action}>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        variant="outline"
                        className={styles.toggle}
                    >
                        {showForm ? 'Cancelar Reseña' : 'Agrega tu Dulce Reseña'}
                    </Button>
                </div>

                {showForm && (
                    <Card as="form" className={styles.form} radius="sm" shadow="none" onSubmit={handleSubmit}>
                        <Stack gap={4}>
                        <Field label="Tu Nombre" htmlFor="reviewName">
                            <Input id="reviewName" name="name" placeholder="Tu Nombre" required />
                        </Field>
                        <Field label="Tu Reseña" htmlFor="reviewText">
                            <Textarea id="reviewText" name="text" placeholder="Cuéntanos tu experiencia..." required />
                        </Field>
                        <div className={styles.fileUpload}>
                            <label>Subir Foto (Opcional)</label>
                            <input type="file" accept="image/*" className={styles.fileInput} />
                        </div>
                        <Button type="submit" fullWidth>Publicar Reseña</Button>
                        </Stack>
                    </Card>
                )}
            </Container>
        </section>
    );
}
