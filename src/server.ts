require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { routes } from './routes'

const app = express();

app.use(express.json()); // Sem isso, todas as requisições feito pelo insomnia retornarão undefined

app.use(cors());

mongoose.connect(
  process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use('/api', routes);

app.listen(process.env.PORT);