"use client";
import { useState } from 'react';
import styles from './ReviewSection.module.css';
import Button from './ui/Button';

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
            <div className={styles.container}>
                <h2 className={styles.title}>Amor de Clientes</h2>
                <div className={styles.grid}>
                    {reviews.map(review => (
                        <div key={review.id} className={styles.card}>
                            <div className={styles.avatar}>{review.user.charAt(0)}</div>
                            <div>
                                <h4 className={styles.username}>{review.user}</h4>
                                <p className={styles.text}>{review.text}</p>
                            </div>
                        </div>
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
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input name="name" placeholder="Tu Nombre" required className={styles.input} />
                        <textarea name="text" placeholder="Cuéntanos tu experiencia..." required className={styles.textarea} />
                        <div className={styles.fileUpload}>
                            <label>Subir Foto (Opcional)</label>
                            <input type="file" accept="image/*" className={styles.fileInput} />
                        </div>
                        <Button type="submit" fullWidth>Publicar Reseña</Button>
                    </form>
                )}
            </div>
        </section>
    );
}
