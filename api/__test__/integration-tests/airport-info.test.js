/* eslint-env jest */

// const request = require('supertest')
// const Validator = require('jsonschema').Validator

// const app = require('../../src/app')

// const v = new Validator()

describe('Airport info', () => {
  // const schema = {
  //   type: 'object',
  //   properties: {
  //     airportInfo: {
  //       name: {
  //         type: 'string'
  //       },
  //       country: {
  //         type: 'string'
  //       },
  //       identifier: {
  //         type: 'string'
  //       },
  //       iataCode: {
  //         type: 'string'
  //       },
  //       elevation: {
  //         type: 'string'
  //       },
  //       runways: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           properties: {
  //             leIdent: {
  //               type: 'string'
  //             },
  //             heIdent: {
  //               type: 'string'
  //             },
  //             length: {
  //               type: 'string'
  //             },
  //             width: {
  //               type: 'string'
  //             },
  //             surface: {
  //               type: 'string'
  //             }
  //           },
  //           required: ['leIdent', 'heIdent', 'length', 'width', 'surface']
  //         }
  //       },
  //       frequencies: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           properties: {
  //             type: {
  //               type: 'string'
  //             },
  //             frequency: {
  //               type: 'string'
  //             }
  //           },
  //           required: ['type', 'frequency']
  //         }
  //       }
  //     },
  //     required: [
  //       'name',
  //       'country',
  //       'identifier',
  //       'iataCode',
  //       'elevation',
  //       'runways',
  //       'frequencies'
  //     ]
  //   },
  //   required: ['airportInfo']
  // }

  // const toMatchSchema = (res) => {
  //   const result = v.validate(res.body, schema)
  //   if (!result.valid) throw new Error(result.errors)
  // }

  it('is a dummy test', () => {
    expect(true).toEqual(true)
  })

  // it('GET /airport-info/search/egcc', async () => {
  //   await request(app)
  //     .get('/airport-info/search/egcc')
  //     .expect(200)
  //     .expect('cache-control', 'public, max-age=86400')
  //     .expect('content-type', 'application/json; charset=utf-8')
  //     .expect(toMatchSchema)
  // })
})
