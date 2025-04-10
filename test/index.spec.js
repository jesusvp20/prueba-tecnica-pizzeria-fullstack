import request from 'supertest';
import app from '../src/app.js';

describe('API Pizzeria', () => {

  test('GET /api/pizzas debería devolver todas las pizzas', async () => {
    const response = await request(app).get('/api/pizzas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/orders debería devolver todas las órdenes', async () => {
    const response = await request(app).get('/api/orders');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/orders/:id con un ID válido debería devolver la orden', async () => {
    const response = await request(app).get('/api/orders/1'); // asegúrate que exista la orden 1
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('cliente');
    expect(response.body).toHaveProperty('items');
  });

  test('GET /api/orders/:id con un ID inexistente debería devolver 404', async () => {
    const response = await request(app).get('/api/orders/9999'); // ID que no exista
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Orden no encontrada');
  });

});
 