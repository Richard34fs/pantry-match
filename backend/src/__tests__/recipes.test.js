const request = require('supertest');
const app = require('../../app.js');

describe('Recipe API', () => {
  
  it('should return status 200 and an array when GET /receitas is called', async () => {
    const response = await request(app).get('/receitas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return status 200 when GET /receitas/:id is called', async () => {
    const response = await request(app).get('/receitas/642276');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(false);
  });
});
