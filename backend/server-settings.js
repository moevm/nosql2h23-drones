export const PORT = 3000;
export const HOST = '127.0.0.1';
export const PROTOCOL = 'HTTP';
export const URL = `${PROTOCOL}://${HOST}:${PORT}`;
export const MONGODB_URI = 'mongodb://localhost:27017';
export const DB_NAME = 'nosql2h23-drones';
export const DB_COLLECTIONS = new Set(['Experiments', 'DronesInfo', 'DronesNote']);