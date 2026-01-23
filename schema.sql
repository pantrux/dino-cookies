-- Cloudflare D1 Database Schema for Dino Cookies
-- This schema defines the orders table for storing customer cookie orders

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    type TEXT NOT NULL,
    address TEXT NOT NULL,
    date TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'Pending'
);

-- Create indexes for common queries
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_date ON orders(date DESC);
CREATE INDEX idx_orders_status ON orders(status);
