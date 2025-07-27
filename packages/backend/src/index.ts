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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
