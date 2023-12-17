import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PORT, HOST, URL_MAP } from './server-settings.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'src');
const HTML_DIR = join(SRC_DIR, 'html');

const app = express();

app.use('/server-settings.js', express.static(join(__dirname, 'server-settings.js')));
app.use(express.static(join(SRC_DIR, 'css')));
app.use(express.static(join(SRC_DIR, 'js')));

for (const addr of URL_MAP.keys()) {
  app.get(`/${addr}`, (req, res) => {
    res.sendFile(`${addr}.html`, {root: HTML_DIR});
  })
}

app.get('*', (req, res) => {
  res.sendStatus(404);
})

app.listen(PORT, HOST, () => {
  console.log(`App listening on port ${PORT}!`);
})