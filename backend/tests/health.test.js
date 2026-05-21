import request from 'supertest';
import app from '../src/app.js';

describe('Health check', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: 'OK',
      data: { status: 'healthy' }
    });
  });
});
