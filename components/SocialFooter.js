"use client";

import React from 'react';

export default function SocialFooter() {
    return (
        <footer style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-dark)',
            padding: '5rem 2rem',
            textAlign: 'center',
            marginTop: '6rem',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.02)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h3 style={{ color: 'var(--primary-pink)', fontSize: '1.8rem', fontWeight: 900, marginBottom: '2rem' }}>Dino Cookies</h3>

                <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                    <a href="https://www.instagram.com/dinocookies20252026/" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        color: '#E4405F',
                        fontWeight: 700,
                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <span style={{ fontSize: '2.5rem' }}>📸</span>
                        <span>Instagram</span>
                    </a>

                    <a href="https://wa.me/56988136073" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        color: '#25D366',
                        fontWeight: 700,
                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <span style={{ fontSize: '2.5rem' }}>💬</span>
                        <span>WhatsApp</span>
                    </a>

                    <a href="mailto:dinocookies2025@gmail.com" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        color: 'var(--secondary-blue)',
                        fontWeight: 700,
                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <span style={{ fontSize: '2.5rem' }}>✉️</span>
                        <span>Contacto Email</span>
                    </a>
                </div>

                <p style={{ opacity: 0.6, fontSize: '0.95rem', fontWeight: 500 }}>
                    Dino Cookies - © 2026 | Horneado con amor espacial 🚀
                </p>
            </div>
        </footer>
    );
}
