const request = require('supertest');
const app = require('../src/server/server');

describe('Watchlist API Endpoints', () => {
  // Test GET /api/users/:userId/watchlist
  describe('GET /api/users/:userId/watchlist', () => {
    it('should return list of assets', async () => {
      const res = await request(app)
        .get('/api/users/user1/watchlist')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach(asset => {
        expect(asset).toHaveProperty('id');
        expect(asset).toHaveProperty('title');
        expect(asset).toHaveProperty('category');
        expect(asset).toHaveProperty('price');
      });
    });
  });

  // Test POST /api/users/:userId/watchlist/:assetId
  describe('POST /api/users/:userId/watchlist/:assetId', () => {
    it('should add asset to watchlist', async () => {
      const res = await request(app)
        .post('/api/users/user1/watchlist/1')
        .expect(201);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toContain('1');
    });
  });

  // Test DELETE /api/users/:userId/watchlist/:assetId
  describe('DELETE /api/users/:userId/watchlist/:assetId', () => {
    it('should remove asset from watchlist', async () => {
      await request(app)
        .post('/api/users/user1/watchlist/4')
        .expect(201);

      const res = await request(app)
        .delete('/api/users/user1/watchlist/4')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).not.toContain('4');
    });
  });
});
