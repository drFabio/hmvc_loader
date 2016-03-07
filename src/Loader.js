'use strict'

const co = require('co')
const factories = require('./componentFactory')
const getFilesMap = require('./directory').getFilesMap
const getObjectMethodParamMap = require('./reflection').getObjectMethodParamMap

class Loader{
    constructor(filesMap, componentDir ){
        componentDir = componentDir || 'components'
        this._filesMap =  Object.assign({} ,filesMap)
        this._componentDir = componentDir
    }
    loadComponents(){
        this._loadControllers()
        this._loadModels()
    }
    _loadComponent(type,factory){
        const components = this._filesMap[type]
        for(const namespace in components ){
            for(const data of components[namespace]){
                const component = factory(this, namespace, data.name, data.file)
                data.obj = component
            }
        }
    }
    _loadControllers(){
        const factory = factories.createController
        this._loadComponent('controllers',factory)
    }
    _loadModels(){
        const factory = factories.createModel
        this._loadComponent('models',factory)
    }
    _buildRoutes(addRoute){
        const controllers = this._filesMap['controllers']
        for(const namespace in controllers ){
            const baseUrl = '/'+namespace.replace(this._componentDir+'/','')
            for(const data of controllers[namespace]){
                let url = baseUrl
                if(data.name.toLowerCase()!=='index'){
                    url += '/'+ data.name
                }
                addRoute(url, data.obj,getObjectMethodParamMap(data.obj))
            }
        }
    }
    static getLoaderFromPath(path, componentDir ) {
        componentDir = componentDir || 'components'
        return co(getFilesMap(path, componentDir)).then((fileMap)=>{
            return new Loader(fileMap, componentDir)
        })
    }
}
module.exports= Loader