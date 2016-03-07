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
                _iShouldNotShowIAmProtected(xpto){
                }
            }
            const obj = new MyClass()
            const methodParams = getObjectMethodParamMap(obj)
            expect(methodParams).to.deep.equal({'foo':['bar','baz']})
        })
    })
})