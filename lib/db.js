import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Ensure db file exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

export function getOrders() {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
}

export function saveOrder(order) {
    const orders = getOrders();
    const newOrder = {
        id: Date.now().toString(),
        ...order,
        date: new Date().toISOString(),
        status: 'Pending'
    };
    orders.push(newOrder);
    fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2));
    return newOrder;
}
