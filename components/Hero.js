import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            {/* Background image is handled in CSS */}

            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.icon}>🚚</div>
                    <h3 className={styles.cardTitle}>Tu pedido en 2 horas</h3>
                    <p className={styles.cardText}>Haz tu pedido y en 2 horas lo tienes en tu domicilio</p>
                    <div className={styles.contact}>
                        <span className={styles.phone}>+56 9 1234 5678</span>
                        <span className={styles.note}>sólo por teléfono</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.icon}>🛒</div>
                    <h3 className={styles.cardTitle}>Compra Online</h3>
                    <p className={styles.cardText}>Haz tu pedido online y te lo entregamos en 48 hs.</p>
                    <div className={styles.highlight}>
                        Opción<br />recogida en tienda
                    </div>
                </div>
            </div>
        </section>
    );
}
