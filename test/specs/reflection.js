'use strict'
/*eslint no-unused-vars: 0*/
const chai = require('chai')
const expect = chai.expect
describe('Reflection',()=>{
    const getObjectMethodParamMap = require('../../src/reflection').getObjectMethodParamMap
    const getParamNames = require('../../src/reflection').getParamNames

    describe('getParamNames',()=>{
        it('Returns the parameters of a function ',() =>{
            const fn = (foo,bar,baz)=>{}
            expect(getParamNames(fn)).to.deep.equal(['foo','bar','baz'])
        })
    })
    describe('getObjectMethodParamMap',()=>{
        it('Get the data from a object derived from an ES6 class ',() =>{
            class MyClass{
                foo(bar, baz){
                }
                * ploc(plim){

                }
                _iShouldNotShowIAmProtected(xpto){
                }
                get propertiesDoNotShowAlso(){

                }
            }
            const obj = new MyClass()
            const methodParams = getObjectMethodParamMap(obj)
            expect(methodParams).to.deep.equal({'foo':['bar','baz'],'ploc':['plim']})
        })
        it('Get the data from a parent object derived from an ES6 class ',() =>{
            class ParentClass{
                zap(zip){

                }
                _iShouldNotShowIAmAlsoProtected(xpto){
                }
                xpto(otpx){

                }
            }
            class MyClass extends ParentClass{
                foo(bar, baz){
                }
                _iShouldNotShowIAmProtected(xpto){
                }
                xpto(anotherParam){
                    
                }
            }
            const obj = new MyClass()
            const methodParams = getObjectMethodParamMap(obj)
            const expected = {
                'foo':['bar','baz'],
                'xpto':['anotherParam'],
                'zap':['zip']
            }
            expect(methodParams).to.deep.equal(expected)
        })
        it('Get the data from a object derived from a function class ',() =>{
            function MyClass(){
                this.zip = (zap) =>{

                }
            }
            MyClass.prototype.foo = (bar, baz) => {}
            MyClass.prototype._iShouldNotShowIAmProtected = (bar, baz) => {}
            const obj = new MyClass()
            const methodParams = getObjectMethodParamMap(obj)
            expect(methodParams).to.deep.equal({'foo':['bar','baz'],'zip':['zap']})
        })
    })
})