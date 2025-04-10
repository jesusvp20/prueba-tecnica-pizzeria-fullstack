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
    const response = await request(app).get('/api/orders/1'); 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('cliente');
    expect(response.body).toHaveProperty('items');
  });


  test('GET /api/orders/:id con un ID inexistente debería devolver 404', async () => {
    const response = await request(app).get('/api/orders/9999'); 
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Orden no encontrada');
  });

  test('POST /api/orders debería crear una orden y devolver un 201', async () => {
    const newOrder = {
      cliente: 'Carlos Pérez',
      items: [
        { pizzaId: 1, cantidad: 2 }, 
        { pizzaId: 2, cantidad: 1 }  
      ]
    };
    
    const response = await request(app).post('/api/orders').send(newOrder);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Tu orden ha sido confirmada.');
    expect(response.body.orderSummary).toEqual(expect.objectContaining({
      cliente: 'Carlos Pérez',
      items: expect.arrayContaining([
        expect.objectContaining({ pizzaId: 1, cantidad: 2 }),
        expect.objectContaining({ pizzaId: 2, cantidad: 1 })
      ])
    }));
    
    expect(response.body.orderSummary).not.toHaveProperty('fecha');
  });

test('POST sin cliente devuelve error', async () => {
  const response = await request(app)
    .post('/api/orders')
    .send({ items: [{ pizzaId: 1, cantidad: 2 }] });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    message: 'El cliente es requerido' // Mensaje actualizado
  });
});

test('POST /api/orders con datos incompletos debería devolver un 400', async () => {
  const invalidOrder = {
    cliente: 'Carlos Pérez'  
  };

  const response = await request(app).post('/api/orders').send(invalidOrder);
  
  expect(response.status).toBe(400); 
  expect(response.body).toHaveProperty('message', 'Los items son requeridos'); 
});

})


 