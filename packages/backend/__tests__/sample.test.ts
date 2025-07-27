import request from 'supertest';
import express from 'express';

const app = express();
app.get('/api/samples', (req, res) => {
  res.json([{ id: 1, name: 'Sample 1' }]);
});

describe('GET /api/samples', () => {
  it('should return sample data', async () => {
    const res = await request(app).get('/api/samples');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'Sample 1' }]);
  });
});
