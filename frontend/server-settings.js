export const PORT = 3001;
export const HOST = '127.0.0.1';
export const PROTOCOL = 'HTTP';
const URL = `${HOST}:${PORT}`;

export const URL_MAP = new Map([
  ['experiments', `${PROTOCOL}://${URL}/experiments`],
  ['experiment', `${PROTOCOL}://${URL}/experiment`],
  ['drone-notes', `${PROTOCOL}://${URL}/drone-notes`],
  ['import-export', `${PROTOCOL}://${URL}/import-export`] 
]);

export const BACKEND_URL = 'http://127.0.0.1:3000'