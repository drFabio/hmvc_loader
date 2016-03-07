'use strict'
const path = require('path')
const chai = require('chai')
const expect = chai.expect
const loaderLib =  require('../../src/loader')
const Loader = loaderLib.Loader
const mockData = require('../mocks/data')
const sinon = require('sinon')
describe('Loader',()=>{
    let sandbox;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
    });

    describe('Loader',()=>{
        it('Loads with the default parameter',function * (){
            sandbox.stub(loaderLib, 'defaultFactory')
            const loadData = mockData.EXPECTED_DEFAULT_MAP
            const myLoader = new Loader(loadData)
            for(let type in  myLoader._config.dirFactoryMap){
                sandbox.spy(myLoader._config.dirFactoryMap, type)
            }
            sandbox.spy(myLoader,'_loadComponent')
            myLoader.loadComponents()
            for(let type in loadData){
                for(let namespace in loadData[type]){
                    for(let name in loadData[type][namespace]){
                        const file = loadData[type][namespace][name].file
                        const factory = myLoader._config.dirFactoryMap[type]
                        const call = factory.calledWithExactly(myLoader, namespace, name, file) 
                        expect(call).to.be.true
                    }
                }
            }
        })
        it('Loads invoking custom factories')
    })
    describe('Url builder',()=>{
        it('Build the route using the namespaces')
    })
    
    afterEach(function() {
        sandbox.restore();
    });

})