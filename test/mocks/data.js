'use strict'
const path = require('path')
const appDir = path.resolve(__dirname, './app')+'/'
const EXPECTED_DEFAULT_MAP = {
    'models': {
        'bar/xpto': {
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
const EXPECTED_CUSTOM_MAP= {
  "C": {
    "foo": {
      "Controller": {
        "file": "/etc/libs/hmvc_loader/test/mocks/app/custom/modules/foo/C/Controller.js"
      }
    },
    "foo/zap": {
      "Controller": {
        "file": "/etc/libs/hmvc_loader/test/mocks/app/custom/modules/foo/modules/zap/C/Controller.js"
      }
    },
    "foo/zap/bar": {
      "Controller": {
        "file": "/etc/libs/hmvc_loader/test/mocks/app/custom/modules/foo/modules/zap/modules/bar/C/Controller.js"
      }
    }
  },
  "M": {
    "foo": {
      "Model": {
        "file": "/etc/libs/hmvc_loader/test/mocks/app/custom/modules/foo/M/Model.js"
      }
    },
    "foo/zap": {
      "Model": {
        "file": "/etc/libs/hmvc_loader/test/mocks/app/custom/modules/foo/modules/zap/M/Model.js"
      }
    }
  },
  "V": {
    "foo/zap": {
      "View": {
        "file": "/etc/libs/hmvc_loader/test/mocks/app/custom/modules/foo/modules/zap/V/View.js"
      }
    },
    "foo": {
      "View": {
        "file": "/etc/libs/hmvc_loader/test/mocks/app/custom/modules/foo/V/View.js"
      }
    }
  }
}
module.exports= {
    EXPECTED_DEFAULT_MAP,
    EXPECTED_CUSTOM_MAP,
    DEFAULT_APP_DIR:appDir+'default/',
    CUSTOM_APP_DIR:appDir+'custom/'
}