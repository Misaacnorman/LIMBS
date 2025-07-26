import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/samples', async (req, res) => {
  const samples = await prisma.sample.findMany();
  res.json(samples);
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
