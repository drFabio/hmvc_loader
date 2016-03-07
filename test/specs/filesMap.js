'use strict'
const chai = require('chai')
const expect = chai.expect
const mockData = require('../mocks/data')
describe('File Mapping',()=>{
    const getFilesMap = require('../../src/directory').getFilesMap
    describe('Files map',()=>{
        it.only('Gets the files map and flatten it, indexing by type ', function *(){
            const files = yield getFilesMap(mockData.DEFAULT_APP_DIR)
            const expected = mockData.EXPECTED_DEFAULT_MAP
            expect(files).to.deep.equal(expected)
        })
    })
})