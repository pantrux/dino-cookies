// Cloudflare D1 Database Functions
// This module provides database operations for the Dino Cookies application
// using Cloudflare D1 (SQLite-based edge database)

/**
 * Get all orders from the database
 * @param {D1Database} db - The D1 database binding
 * @returns {Promise<Array>} Array of order objects
 */
export async function getOrders(db) {
    try {
        const { results } = await db.prepare(
            'SELECT * FROM orders ORDER BY date DESC'
        ).all();
        return results || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Failed to fetch orders from database');
    }
}

/**
 * Save a new order to the database
 * @param {D1Database} db - The D1 database binding
 * @param {Object} order - The order data
 * @returns {Promise<Object>} The created order with id and timestamp
 */
export async function saveOrder(db, order) {
    try {
        const { firstName, lastName, email, phone, quantity, type, address } = order;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !quantity || !address) {
            throw new Error('Missing required fields');
        }

        // Insert the order using prepared statement for security
        const result = await db.prepare(
            `INSERT INTO orders (firstName, lastName, email, phone, quantity, type, address, date, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), 'Pending')`
        ).bind(firstName, lastName, email, phone, quantity, type || 'Caja Surtida', address).run();

        // Fetch the newly created order
        const { results } = await db.prepare(
            'SELECT * FROM orders WHERE id = ?'
        ).bind(result.meta.last_row_id).all();

        return results[0];
    } catch (error) {
        console.error('Error saving order:', error);
        throw new Error('Failed to save order to database');
    }
}

/**
 * Get a single order by ID
 * @param {D1Database} db - The D1 database binding
 * @param {number} id - The order ID
 * @returns {Promise<Object|null>} The order object or null if not found
 */
export async function getOrderById(db, id) {
    try {
        const { results } = await db.prepare(
            'SELECT * FROM orders WHERE id = ?'
        ).bind(id).all();
        return results[0] || null;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Failed to fetch order from database');
    }
}

/**
 * Update order status
 * @param {D1Database} db - The D1 database binding
 * @param {number} id - The order ID
 * @param {string} status - The new status
 * @returns {Promise<Object>} The updated order
 */
export async function updateOrderStatus(db, id, status) {
    try {
        await db.prepare(
            'UPDATE orders SET status = ? WHERE id = ?'
        ).bind(status, id).run();

        return await getOrderById(db, id);
    } catch (error) {
        console.error('Error updating order status:', error);
        throw new Error('Failed to update order status');
    }
}

