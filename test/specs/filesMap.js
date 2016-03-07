"use strict"
const path = require('path')
const chai = require('chai')
const expect = chai.expect
describe.only('File Mapping',()=>{
    const getFilesMap = require('../../src/directory').getFilesMap
    describe('Files map',()=>{
        it('Gets the files map and flatten it, indexing by type ', function *(){
            const appDir = path.resolve(__dirname, '../mocks/app')+'/'
            const files = yield getFilesMap(appDir)
            const expected = {
                'models': {
                    'bar/components/xpto': [
                        {
                            'name': 'Zap',
                            'file': appDir+'components/bar/components/xpto/models/Zap.js'
                        }
                    ],
                    'foo': [
                        {
                            'name': 'Index',
                            'file': appDir+'components/foo/models/Index.js'
                        }
                    ]
                },
                'controllers': {
                    'bar': [
                        {
                            'name': 'Baz',
                            'file': appDir+'components/bar/controllers/Baz.js'
                        }
                    ]
                }
            }
            expect(files).to.deep.equal(expected)
        })
    })
})