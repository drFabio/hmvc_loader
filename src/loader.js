'use strict'

const co = require('co')
const getFilesMap = require('./directory').getFilesMap
const getObjectMethodParamMap = require('./reflection').getObjectMethodParamMap

const defaultFactory= (loader, namespace, name, file) =>{
    const component = require(file)
    return new component()
}
const DEFAULT_CONFIG = {
    componentDir: 'components',
    dirFactoryMap:{
        'models':defaultFactory,
        'views':defaultFactory,
        'controllers':defaultFactory
    }
}

class Loader{
    constructor(filesMap,  config ){
        this._config = config || DEFAULT_CONFIG
        this._filesMap =  Object.assign({} ,filesMap)
    }
    loadComponents(){
        for(const dir in this._config.dirFactoryMap){
            const factory = this._config.dirFactoryMap[dir]
            this._loadComponent(dir, factory)
        }
    }
    _loadComponent(type,factory){
        const components = this._filesMap[type]
        for(const namespace in components ){
            for(const name in components[namespace]){
                const data = components[namespace][name]
                const file = data.file
                const component = factory(this, namespace, name, file)
                data.obj = component
            }
        }
    }
    getComponent(type,namespace,name){
        if(!this._filesMap[type]) return null
        if(!this._filesMap[type][namespace]) return null
        name = name || 'Index'
        return this._filesMap[type][namespace][name].obj
    }
    buildRoutes(addRoute){
        const controllers = this._filesMap['controllers']
        const componentDir = this._config.componentDir
        for(const namespace in controllers ){
            const baseUrl = '/'+namespace.replace(componentDir+'/','')
            for(const data of controllers[namespace]){
                let url = baseUrl
                if(data.name.toLowerCase()!=='index'){
                    url += '/'+ data.name
                }
                addRoute(url, data.obj,getObjectMethodParamMap(data.obj))
            }
        }
    }
    static getLoaderFromPath(path, config ) {
        config = config || DEFAULT_CONFIG
        return co(getFilesMap(path, config.componentDir)).then((fileMap)=>{
            return new Loader(fileMap, config)
        })
    }
}
module.exports= {
    Loader,
    defaultFactory,
    DEFAULT_CONFIG
}