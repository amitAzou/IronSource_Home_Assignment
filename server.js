import express from 'express';
import apiRouter from './api.js';

export const app = express();
const port= 3000


app.use('/api', apiRouter);

app.listen(port)

console.log('listening to port: '+ port + '...')

