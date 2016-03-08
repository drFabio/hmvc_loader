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
        if(!this._config.componentDir){
            this._config.componentDir = DEFAULT_CONFIG.componentDir
        }
        //Deep cloning
        this._filesMap =  JSON.parse(JSON.stringify(filesMap))
    }
    loadComponents(){
        for(const dir in this._config.dirFactoryMap){
            let factory = this._config.dirFactoryMap[dir]
            if(!factory){
                factory = this._config.dirFactoryMap['default']
                if(!factory){
                    factory = defaultFactory
                }
            }
            this._loadComponent(dir, factory)
        }
    }
    _loadComponent(type,factory){
        const components = this._filesMap[type]
        for(const namespace in components ){
            for(const name in components[namespace]){
                const file = components[namespace][name]
                const obj = factory(this, namespace, name, file)
                components[namespace][name] = {file,obj}
            }
        }
    }
    getComponent(type,namespace,name){
        if(!this._filesMap[type]) return null
        if(!this._filesMap[type][namespace]) return null
        name = name || 'Index'
        if(!this._filesMap[type][namespace][name]) return null
        return this._filesMap[type][namespace][name].obj
    }
    buildRoutes(addRoute,controllersName){
        controllersName = controllersName || 'controllers'
        const controllers = this._filesMap[controllersName]
        const componentDir = this._config.componentDir
        for(const namespace in controllers ){
            const baseUrl = '/'+namespace.replace(componentDir+'/','')
            for(const name in controllers[namespace]){
                let url = baseUrl
                const saneName = name.toLowerCase()
                if(saneName !=='index'){
                    url += '/'+ saneName
                }
                const obj = controllers[namespace][name].obj
                addRoute(url, getObjectMethodParamMap(obj), obj)
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