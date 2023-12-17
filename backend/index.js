import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PORT, HOST, DB_COLLECTIONS } from './server-settings.js';
import * as db from './src/js/db-rest-methods.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'src');
const HTML_DIR = join(SRC_DIR, 'html');

db.open_connection();

const app = express();

app.use(cors())
app.use('/server-settings.js', express.static(join(__dirname, 'server-settings.js')));
app.use(express.static(join(SRC_DIR, 'js')));

for (const collection of DB_COLLECTIONS) {
  app.get(`/${collection}`, async (req, res)=>{
    const query = req.query;
    const new_query = {
      id: query.id
    };
    const data = await db.get(query.database, query.collection, new_query)
    if (!data) {
      res.sendStatus(400);
    }
    else {
      res.json(data);
    }
  });

  app.post(`/${collection}`, async (req, res)=>{
    const query = req.query;
    const new_query = {
      id: query.id
    };
    const data = await db.post(query.database, query.collection, new_query)
    if (!data) {
      res.sendStatus(400);
    }
    else {
      res.json(data);
    }
  });
}
  
app.get('*', (req, res) => {
  res.sendStatus(404);
});

process.on('exit', ()=>{
  db.close_connection();
  console.log('App terminated!');
})

process.on('SIGINT', ()=>{
  process.exit();
})

app.listen(PORT, HOST, () => {
  console.log(`App listening on port ${PORT}!`);
})