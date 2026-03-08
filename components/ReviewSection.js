"use client";
import { useState } from 'react';
import styles from './ReviewSection.module.css';
import Button from './ui/Button';
import Card from './ui/Card';
import Container from './ui/Container';
import Field from './ui/Field';
import Heading from './ui/Heading';
import Section from './ui/Section';
import Stack from './ui/Stack';
import Text from './ui/Text';
import FileInput from './ui/FileInput';
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
        <Section className={styles.section} surface="page" paddingY="md">
            <Container size="md">
                <Heading level={2} size="3xl" tone="brand" className={styles.title}>Amor de Clientes</Heading>
                <div className={styles.grid}>
                    {reviews.map(review => (
                        <Card key={review.id} className={styles.card} padding="sm" radius="sm" shadow="none">
                            <div className={styles.avatar}>{review.user.charAt(0)}</div>
                            <div>
                                <h4 className={styles.username}>{review.user}</h4>
                                <Text className={styles.text} tone="muted" size="sm">{review.text}</Text>
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
                            <Field label="Subir Foto (Opcional)">
                                <FileInput accept="image/*" />
                            </Field>
                            <Button type="submit" fullWidth>Publicar Reseña</Button>
                        </Stack>
                    </Card>
                )}
            </Container>
        </Section>
    );
}
