import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

import { Request, Response } from 'express';

app.get('/api/samples', async (req: Request, res: Response) => {
  const samples = await prisma.sample.findMany();
  res.json(samples);
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
