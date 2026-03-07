"use client";
import { useEffect, useState } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data.orders || []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Panel de Administración</h1>
                <div className={styles.stats}>Total Pedidos: {orders.length}</div>
            </header>

            {loading ? (
                <div className={styles.loading}>Cargando pedidos...</div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Pedido</th>
                                <th>Contacto</th>
                                <th>Dirección</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr><td colSpan="6" className={styles.empty}>No hay pedidos recibidos aún.</td></tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{new Date(order.date).toLocaleString()}</td>
                                        <td>{order.firstName} {order.lastName}</td>
                                        <td>
                                            <span className={styles.qty}>{order.quantity} doz</span><br />
                                            <span className={styles.type}>{order.type}</span>
                                        </td>
                                        <td>
                                            {order.phone}<br />
                                            <span className={styles.email}>{order.email}</span>
                                        </td>
                                        <td className={styles.address}>{order.address}</td>
                                        <td><span className={styles.status}>{order.status}</span></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
