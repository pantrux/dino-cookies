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
  { id: 1, user: 'Maria G.', text: '¡Las trufas de chocolate son para morirse! 😍', image: null, rating: 5 },
  { id: 2, user: 'Carlos R.', text: 'El mejor regalo de cumpleaños. Llegaron frescas.', image: null, rating: 5 },
  { id: 3, user: 'Sofia L.', text: 'Me encantó la presentación.', image: null, rating: 4.8 },
];

export default function ReviewSection() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    const name = e.target.name.value;

    setReviews((current) => [...current, { id: Date.now(), user: name, text, image: null, rating: 5 }]);
    setSuccessMessage('¡Gracias! Tu reseña ya quedó publicada.');
    setShowForm(false);
    e.target.reset();
  };

  return (
    <Section className={styles.section} surface="page" paddingY="md">
      <Container size="md">
        <header className={styles.header}>
          <Heading level={2} size="3xl" tone="brand" className={styles.title}>
            Amor de Clientes
          </Heading>
          <Text className={styles.subtitle} tone="muted" size="md">
            Historias reales de clientes que ya probaron su caja jurásica.
          </Text>
        </header>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <Card key={review.id} className={styles.card} padding="md" radius="md" shadow="sm" border="default">
              <div className={styles.avatar}>{review.user.charAt(0)}</div>
              <div className={styles.cardBody}>
                <h4 className={styles.username}>{review.user}</h4>
                <div className={styles.rating}>★ {Number(review.rating ?? 5).toFixed(1)}</div>
                <Text className={styles.text} tone="muted" size="sm">
                  {review.text}
                </Text>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.action}>
          <Button
            onClick={() => {
              setShowForm((prev) => !prev);
              setSuccessMessage('');
            }}
            variant="outline"
            className={styles.toggle}
          >
            {showForm ? 'Cancelar reseña' : 'Agregar reseña'}
          </Button>
        </div>

        {successMessage ? <p className={styles.success}>{successMessage}</p> : null}

        {showForm && (
          <Card as="form" className={styles.form} radius="md" shadow="sm" onSubmit={handleSubmit}>
            <Stack gap={4}>
              <Field label="Tu nombre" htmlFor="reviewName">
                <Input id="reviewName" name="name" placeholder="Tu nombre" required />
              </Field>
              <Field label="Tu reseña" htmlFor="reviewText">
                <Textarea id="reviewText" name="text" placeholder="Cuéntanos tu experiencia..." required />
              </Field>
              <Field label="Subir foto (opcional)" htmlFor="reviewPhoto">
                <FileInput id="reviewPhoto" accept="image/*" />
              </Field>
              <Button type="submit" fullWidth>
                Publicar reseña
              </Button>
            </Stack>
          </Card>
        )}
      </Container>
    </Section>
  );
}
