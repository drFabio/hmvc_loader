'use strict'
const path = require('path')
const appDir = path.resolve(__dirname, './app')+'/'
const EXPECTED_DEFAULT_MAP = {
    'models': {
        'bar/components/xpto': {
            'Zap':{
                'file': appDir+'default/components/bar/components/xpto/models/Zap.js'
            }
        },
        'foo':{
            'Index':{
                'file': appDir+'default/components/foo/models/Index.js'
            }
        }
    },
    'controllers': {
        'bar':{
            'Baz':{
                'file': appDir+'default/components/bar/controllers/Baz.js'
            }
        },
        'foo':{
            'Index':{
                'file': appDir+'default/components/foo/controllers/Index.js'
            }
        }             
    },
    'views': {
        'foo':{
            'Index':{
                'file': appDir+'default/components/foo/views/Index.js'
            }
        }
    }
}
module.exports= {
    EXPECTED_DEFAULT_MAP,
    DEFAULT_APP_DIR:appDir+'default/'
}