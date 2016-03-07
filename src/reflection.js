'use strict'

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g

const getParamNames = (func) => {
    const fnStr = func.toString().replace(STRIP_COMMENTS, '')
    let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
    if(result === null)
        result = []
    return result
}

const getObjectMethodParamMap = (componentObj) => {
    const prototype = Object.getPrototypeOf(componentObj)
    const methods = Object.getOwnPropertyNames(prototype)
    const methodParamMap = {}
    for(const method of methods){
        if(!componentObj[method] instanceof Function || method === 'constructor' || method.startsWith('_')) continue
        methodParamMap[method] = getParamNames(componentObj[method])
    }
    return methodParamMap
}
module.exports= {
    getParamNames,
    getObjectMethodParamMap
}