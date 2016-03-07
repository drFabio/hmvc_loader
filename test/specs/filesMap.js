'use strict'
const chai = require('chai')
const expect = chai.expect
const mockData = require('../mocks/data')
describe('File Mapping',()=>{
    const getFilesMap = require('../../src/directory').getFilesMap
    describe('Files map',()=>{
        it('Gets the files map and flatten it, indexing by type ', function *(){
            const files = yield getFilesMap(mockData.DEFAULT_APP_DIR)
            const expected = mockData.EXPECTED_DEFAULT_MAP
            expect(files).to.deep.equal(expected)
        })
        it('Accept custom configurations ', function *(){
            const files = yield getFilesMap(mockData.CUSTOM_APP_DIR,'modules')
            const expected = mockData.EXPECTED_CUSTOM_MAP
            expect(files).to.deep.equal(expected)
        })
    })
})