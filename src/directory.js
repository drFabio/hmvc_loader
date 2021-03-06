'use strict'

const glob = require('glob')
const getFilesMap = function *(srcDir, componentDir ){
    componentDir = componentDir || 'components'
    const options = null 
    srcDir = srcDir.replace(/\\/g, '/')
    if(!srcDir.endsWith('/')){
        srcDir += '/'
    }
    const promise = new Promise((resolve, reject)=>{
        glob(srcDir+'**/*.js', options, (err,data)=>{
            if(err){
                return reject(err)
            }
            resolve(data)
        })
    })
    const rawFiles =  yield promise
    const appData = {}
    rawFiles.map((file)=> {
        file = file.replace(/\\/g, '/')
        const basePath = file.replace(srcDir,'')
        let lastSlashPos = basePath.lastIndexOf('/')
        let name = basePath.substr(lastSlashPos+1)
        name = name.substr(0, name.lastIndexOf('.'))
        const tail = basePath.substr(0,lastSlashPos)
        lastSlashPos = tail.lastIndexOf('/')
        const type = tail.substr(lastSlashPos+1)
        const namespace = tail.substr(0, lastSlashPos).replace(new RegExp('\/'+componentDir,'g'),'')
        if(typeof appData[type] =='undefined' ){
            appData[type]= {}    
        }
        if( typeof appData[type][namespace] =='undefined'){
            appData[type][namespace] = {}
        }
        appData[type][namespace][name] = file
    })
    return appData
}
module.exports= {
    getFilesMap
}
