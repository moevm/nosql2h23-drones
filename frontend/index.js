import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './server-settings.js';
import { URLS } from './urls.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'src');
const HTML_DIR = join(SRC_DIR, 'html');

const app = express();

app.use(cors());
app.use('/dynamic_settings.js', express.static(join(__dirname, 'dynamic_settings.js')));
app.use(express.static(join(SRC_DIR, 'css')));
app.use(express.static(join(SRC_DIR, 'js')));

for (const addr of URLS) {
  app.get(`/${addr}`, (req, res) => {
    res.sendFile(`${addr}.html`, {root: HTML_DIR});
  });
}

app.get('/', (req, res) => {
  res.redirect('/experiments');
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
})
