import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PORT, HOST, DB_COLLECTIONS } from './server-settings.js';
import * as db from './src/js/db-rest-methods.js';
import { ObjectId } from 'mongodb';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'src');
const HTML_DIR = join(SRC_DIR, 'html');

db.open_connection();

const app = express();

app.use(cors())
app.use(express.json())
app.use('/server-settings.js', express.static(join(__dirname, 'server-settings.js')));
app.use(express.static(join(SRC_DIR, 'js')));


app.get('/experiments', async (req, res)=>{
  const query = req.query;
  const new_query = Object.assign({},
    query.name === undefined ? null : {name: query.name},
    query.creationDate === undefined ? null : {creationDate: new Date(query.creationDate)},
    query.changedDate === undefined ? null : {changedDate: new Date(query.changedDate)},
    query.dronesAmount === undefined ? null : {dronesInfo: { $size: parseInt(query.dronesAmount, 10)}},
    query.timeAmount === undefined ? null : {timeAmount: parseFloat(query.timeAmount)},
  );
  const data = await db.experiments_get(new_query)
  if (!data) {
    res.sendStatus(400);
  }
  else {
    if(query.sortBy && query.sortOrder){
      if (query.sortBy == 'dronesAmount') {
        const order = query.sortOrder == 'asc' ? 1 : -1
        data.sort((a, b) => {
          return order * (a.dronesInfo.length - b.dronesInfo.length)
        })
      }
      else {
        const order = query.sortOrder == 'asc' ? 1 : -1
        data.sort((a, b) => {
          if (a[query.sortBy] > b[query.sortBy]){
            return order
          } 
          else if (a[query.sortBy] < b[query.sortBy]){
            return -order
          }
          return 0
        })
      }
    }
    res.json(data);
  }
});

app.get('/experiment', async (req, res)=>{
  const query = req.query;
  const new_query = {
    _id: new ObjectId(query.id)
  };
  const data = await db.experiment_get(new_query)
  if (!data) {
    res.sendStatus(400);
  }
  else {
    if(query.sortBy && query.sortOrder){
      const order = query.sortOrder == 'asc' ? 1 : -1
      data.sort((a, b) => {
        if (a[query.sortBy] > b[query.sortBy]){
          return order
        } 
        else if (a[query.sortBy] < b[query.sortBy]){
          return -order
        }
        return 0
      })
    }
    res.json(data);
  }
});

app.post('/experiment', async (req, res)=>{
  await db.experiment_post(req.body);
  res.sendStatus(204);
});

app.get('/experiment/drones', async (req, res)=>{
  const query = req.query;
  const new_query = Object.assign({_id: query.id,},
    query.name === undefined ? null : {name: query.name},
  );
  const data = await db.experiment_get_drones(new_query);
  if (!data) {
    res.sendStatus(400);
  }
  else {
    if(query.sortBy && query.sortOrder){
      const order = query.sortOrder == 'asc' ? 1 : -1
      data.sort((a, b) => {
        if (a[query.sortBy] > b[query.sortBy]){
          return order
        } 
        else if (a[query.sortBy] < b[query.sortBy]){
          return -order
        }
        return 0
      })
    }
    res.json(data);
  }
});

app.get('/drones-info', async (req, res)=>{
  const query = req.query;
  const data = await db.drones_info_get()
  if (!data) {
    res.sendStatus(400);
  }
  else {
    res.json(data);
  }
});

app.get('/drone-info', async (req, res)=>{
  const query = req.query;
  const new_query = {
    _id: new ObjectId(query.id)
  };
  const data = await db.drone_info_get(new_query)
  if (!data) {
    res.sendStatus(400);
  }
  else {
    res.json(data);
  }
});

app.post('/drone-info', async (req, res)=>{
  await db.drone_info_post(req.body);
  res.sendStatus(204);
});

app.get('/drone-info/notes', async (req, res)=>{
  const query = req.query;
  const new_query = Object.assign({_id: query.id,},
    query.time === undefined ? null : {time: new Date(query.time)},
    query.pos_x === undefined ? null : {pos_x: parseFloat(query.pos_x)},
    query.pos_y === undefined ? null : {pos_y: parseFloat(query.pos_y)},
    query.pos_z === undefined ? null : {pos_z: parseFloat(query.pos_z)},
    query.vel_x === undefined ? null : {vel_x: parseFloat(query.vel_x)},
    query.vel_y === undefined ? null : {vel_y: parseFloat(query.vel_y)},
    query.vel_z === undefined ? null : {vel_z: parseFloat(query.vel_z)},
    query.roll === undefined ? null : {roll: parseFloat(query.roll)},
    query.pitch === undefined ? null : {pitch: parseFloat(query.pitch)},
    query.yawl === undefined ? null : {yawl: parseFloat(query.yawl)},
    query.ang_vel_x === undefined ? null : {ang_vel_x: parseFloat(query.ang_vel_x)},
    query.ang_vel_y === undefined ? null : {ang_vel_y: parseFloat(query.ang_vel_y)},
    query.ang_vel_z === undefined ? null : {ang_vel_z: parseFloat(query.ang_vel_z)},
    query.rpm0 === undefined ? null : {rpm0: parseInt(query.rpm0, 10)},
    query.rpm1 === undefined ? null : {rpm1: parseInt(query.rpm1, 10)},
    query.rpm2 === undefined ? null : {rpm2: parseInt(query.rpm2, 10)},
    query.rpm3 === undefined ? null : {rpm3: parseInt(query.rpm3, 10)},
  );
  const data = await db.drone_info_get_notes(new_query);
  if (!data) {
    res.sendStatus(400);
  }
  else {
    if(query.sortBy && query.sortOrder){
      const order = query.sortOrder == 'asc' ? 1 : -1
      data.sort((a, b) => {
        if (a[query.sortBy] > b[query.sortBy]){
          return order
        } 
        else if (a[query.sortBy] < b[query.sortBy]){
          return -order
        }
        return 0
      })
    }
    res.json(data);
  }
});

app.get('/drones-note', async (req, res)=>{
  const query = req.query;
  const data = await db.drones_note_get()
  if (!data) {
    res.sendStatus(400);
  }
  else {
    res.json(data);
  }
});

app.get('/drone-note', async (req, res)=>{
  const query = req.query;
  const new_query = {
    _id: new ObjectId(query.id)
  };
  const data = await db.drone_note_get(new_query)
  if (!data) {
    res.sendStatus(400);
  }
  else {
    res.json(data);
  }
});

app.post('/drone-note', async (req, res)=>{
  await db.drone_note_post(req.body);
  res.sendStatus(204);
});
  
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