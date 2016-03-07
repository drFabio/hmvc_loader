# hmvc_loader
A non opnionated HMVC loader for node.
It traverses the folders indexing JS files trhough an MVC logic

# Usage

Giving a structure like:

- root
    - componentName1
        - controllers
            - A.js
        - models
            B.js
        - views
            C.js
        - components
            - componentName2
                - controllers
                    - D.js

It loads the namespace on a sensible way, can be used to build urls or simply acess components by 
## Factory initialization
```es6
    const Loader = require('hmvc_loader').Loader
    const path = 'myPath/root'
    const myLoader = Loader.getLoaderFromPath(path)
```
## Map initialization
```es6
    const Loader = require('hmvc_loader').Loader
    const componentMap = {'controllers':{'TheNameSpaceThatIWant':{'SomeElem€ntname':'file.js'}}}
    const myLoader = new Loader(componentMap)
```
## Component loading
```es6
    //Acessing A 
    const aInstance = myLoader.getComponent('controllers','componentName1','A')
    //Acessing D
    const dInstance = myLoader.getComponent('controllers','componentName1/componentName2','D')
    //Notice how the components was sliced
```
## URl handling 
The motivation for this library is to make the components acessible within itself and to make urls based on the controllers
Withing each controller you may expect an url on the form of 
        
        namespace/controllerName 

And a map on the form of 

    {method:[param1,param2]}

so you can call it like this

```es6
    
    const urlBuilder = (url,methods,obj){
    }
    myLoader.buildRoutes(urlBuilder)
```

## Making your own structur and creation
 The factory function has the follow structure
 ```es6
    const factory = (loader, namespace, name, file) => {
        return new require(file)(someMongooseInstance, loader, namespace)
    }
```


