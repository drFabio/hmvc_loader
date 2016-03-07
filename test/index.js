const app = require('../src/index.js')
const request = require('co-supertest').agent(app.listen())
const expect = require('chai').expect

describe('/ endpoint', ()=> {
    it('should return Hello, World', function *(){
        const rpc = {
            'id':'1',
            'jsonrpc':'2.0',
            'params':{
                'foo':'bar'
            },
            'method':'baz'
        }
        const res = yield request.post('/ping')
        .type('json')
        .send(JSON.stringify(rpc))
        .expect(200)
        .end()
        expect(res.text).to.equal('Hello, World')
    })
})