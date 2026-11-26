import express from 'express';
import cors from 'cors';
import app from './api/index.js';
const server=express();
server.use(cors());
server.use(app);
const port=process.env.PORT||4000;
server.listen(port,()=>console.log('STAR//OPS API listening on '+port));