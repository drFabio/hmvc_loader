'use strict'
const chai = require('chai')
const expect = chai.expect
const loaderLib =  require('../../src/loader')
const Loader = loaderLib.Loader
const mockData = require('../mocks/data')
const sinon = require('sinon')
describe('Loader',()=>{
    let sandbox

    beforeEach(()=> {
        sandbox = sinon.sandbox.create()
    })

    describe('Loader',()=>{
        it('Loads with the default parameter',function * (){
            const loadData = mockData.EXPECTED_DEFAULT_MAP
            const myLoader = new Loader(loadData)
            for(const type in  myLoader._config.dirFactoryMap){
                sandbox.stub(myLoader._config.dirFactoryMap, type)
            }
            myLoader.loadComponents()
            for(const type in loadData){
                for(const namespace in loadData[type]){
                    for(const name in loadData[type][namespace]){
                        const file = loadData[type][namespace][name]
                        const factory = myLoader._config.dirFactoryMap[type]
                        const call = factory.calledWithExactly(myLoader, namespace, name, file) 
                        expect(call).to.be.true
                    }
                }
            }
        })
        it('Loads invoking custom factories',()=>{
            const config = loaderLib.DEFAULT_CONFIG
            const type = 'models'
            sandbox.stub(config.dirFactoryMap,type)
            const loadData = mockData.EXPECTED_DEFAULT_MAP
            const myLoader = new Loader(loadData)
            myLoader.loadComponents()
            for(const namespace in loadData[type]){
                for(const name in loadData[type][namespace]){
                    const file = loadData[type][namespace][name]
                    const factory = myLoader._config.dirFactoryMap[type]
                    const call = factory.calledWithExactly(myLoader, namespace, name, file) 
                    expect(call).to.be.true
                }
            }
        })
        it('loads a custom structure',()=>{
            const config = {
                'dirFactoryMap':{
                    'M':sandbox.stub(),
                    'V':sandbox.stub(),
                    'C':sandbox.stub()
                },
                'componentDir':'modules'
            }
            const loadData = mockData.EXPECTED_CUSTOM_MAP
            const myLoader = new Loader(loadData,config)
            myLoader.loadComponents()
            for(const type in loadData){
                for(const namespace in loadData[type]){
                    for(const name in loadData[type][namespace]){
                        const file = loadData[type][namespace][name]
                        const factory = myLoader._config.dirFactoryMap[type]
                        const call = factory.calledWithExactly(myLoader, namespace, name, file) 
                        expect(call).to.be.true
                    }
                }
            }


        })
        it('Loads by path on the factory function', function * (){
            const loadData = mockData.EXPECTED_DEFAULT_MAP
            const myLoader = yield Loader.getLoaderFromPath(mockData.DEFAULT_APP_DIR)
            for(const type in  myLoader._config.dirFactoryMap){
                sandbox.stub(myLoader._config.dirFactoryMap, type)
            }
            myLoader.loadComponents()
            for(const type in loadData){
                for(const namespace in loadData[type]){
                    for(const name in loadData[type][namespace]){
                        const file = loadData[type][namespace][name]
                        const factory = myLoader._config.dirFactoryMap[type]
                        const call = factory.calledWithExactly(myLoader, namespace, name, file) 
                        expect(call).to.be.true
                    }
                }
            }
        })
    })
    describe('Url builder',()=>{
        it('Build the route using the namespaces and ignoring indexes',()=>{
            const loadData = mockData.EXPECTED_DEFAULT_MAP
            const myLoader = new Loader(loadData)
            myLoader.loadComponents()
            const stub = sandbox.stub()
            myLoader.buildRoutes(stub)
            const expectedMethodParam = {'foo': ['bar']}
            const type = 'controllers'
            for(const namespace in loadData[type]){
                for(const name in loadData[type][namespace]){
                    let expectedUrl = '/'+namespace.replace(new RegExp('/components','g'),'')
                    if(name !== 'Index'){
                        expectedUrl += '/'+name.toLowerCase()
                    }
                    const call = stub.calledWith(expectedUrl, expectedMethodParam) 
                    expect(call).to.be.true
                }
            }
        })
        it('Build the route for custom structure',()=>{
            const loadData = mockData.EXPECTED_DEFAULT_MAP
            const myLoader = new Loader(loadData)
            myLoader.loadComponents()
            const stub = sandbox.stub()
            myLoader.buildRoutes(stub)
            const expectedMethodParam = {'foo': ['bar']}
            const type = 'controllers'
            for(const namespace in loadData[type]){
                for(const name in loadData[type][namespace]){
                    let expectedUrl = '/'+namespace.replace(new RegExp('/modules','g'),'')
                    if(name !== 'Index'){
                        expectedUrl += '/'+name.toLowerCase()
                    }
                    const call = stub.calledWith(expectedUrl, expectedMethodParam) 
                    expect(call).to.be.true
                }
            }
        })

    })
    
    afterEach(() => {
        sandbox.restore()
    })

})