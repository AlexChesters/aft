/* eslint-env jest */

const request = require('supertest')

const app = require('../../src/app')

describe('Status', () => {
  it('GET /status', async () => {
    await request(app)
      .get('/status')
      .expect(200)
  })
})
