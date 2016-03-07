'use strict'
const path = require('path')
const appDir = path.resolve(__dirname, './app')+'/'
const EXPECTED_DEFAULT_MAP = {
    'models': {
        'bar/xpto': {
            'Zap': appDir+'default/bar/components/xpto/models/Zap.js'
        },
        'foo':{
            'Index': appDir+'default/foo/models/Index.js'
        }
    },
    'controllers': {
        'bar':{
            'Baz': appDir+'default/bar/controllers/Baz.js'
        },
        'foo':{
            'Index': appDir+'default/foo/controllers/Index.js'
        }             
    },
    'views': {
        'foo':{
            'Index': appDir+'default/foo/views/Index.js'
        }
    }
}
const EXPECTED_CUSTOM_MAP= {
  "C": {
    "foo": {
      "Controller": appDir+'custom/foo/C/Controller.js'
    },
    "foo/zap": {
      "Controller": appDir+'custom/foo/modules/zap/C/Controller.js'
    },
    "foo/zap/bar": {
      "Controller": appDir+'custom/foo/modules/zap/modules/bar/C/Controller.js'
    }
  },
  "M": {
    "foo": {
      "Model": appDir+'custom/foo/M/Model.js'
    },
    "foo/zap": {
      "Model": appDir+'custom/foo/modules/zap/M/Model.js'
    }
  },
  "V": {
    "foo/zap": {
      "View": appDir+'custom/foo/modules/zap/V/View.js'
    },
    "foo": {
      "View": appDir+'custom/foo/V/View.js'
    }
  }
}
module.exports= {
    EXPECTED_DEFAULT_MAP,
    EXPECTED_CUSTOM_MAP,
    DEFAULT_APP_DIR:appDir+'default/',
    CUSTOM_APP_DIR:appDir+'custom/'
}