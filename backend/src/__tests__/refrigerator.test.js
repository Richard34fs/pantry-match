const request = require('supertest');
const app = require('../../app.js');

describe('Refrigerator API', () => {

  it('should return status 200 and an array when GET /geladeira is called', async () => {
    const response = await request(app).get('/geladeira');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return status 200 or 201 when POST /geladeira is called with valid data', async () => {
    const newIngredient = {
      userId: 1,
      ingredientName: "Apple",
      quantity: 5,
      unitMeasurement: "units"
    };
    const response = await request(app).post('/geladeira').send(newIngredient);
    expect(response.status).toBe(201); 
  });

  it('should return status 200 when PUT /geladeira/:id is called', async () => {
    const updateData = { quantity: 10 };
    const response = await request(app).put('/geladeira/1').send(updateData);
    expect(response.status).toBe(200);
  });

  it('should return status 200 when DELETE /geladeira/:id is called', async () => {
    const response = await request(app).delete('/geladeira/1');
    expect(response.status).toBe(200);
  });

});
