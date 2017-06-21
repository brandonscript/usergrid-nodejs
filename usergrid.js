/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict'

var _ = require('lodash')

var Usergrid = {
    isInitialized: false,
    isSharedInstance: true,
    UsergridAppAuth: require('./lib/appAuth'),
    UsergridAsset: require('./lib/asset'),
    UsergridAuth: require('./lib/auth'),
    UsergridClient: require('./lib/client'),
    UsergridEntity: require('./lib/entity'),
    UsergridQuery: require('./lib/query'),
    UsergridRequest: require('./lib/request'),
    UsergridResponse: require('./lib/response'),
    UsergridResponseError: require('./lib/responseError'),
    UsergridUser: require('./lib/user'),
    UsergridUserAuth: require('./lib/userAuth'),
        initSharedInstance: function() {
        var args = Array.prototype.slice.call(arguments)
        var self = this
        if (self.isInitialized) {
            console.log('Usergrid shared instance is already initialized')
            return self
        }
        var UsergridClient = require('./lib/client')
        console.log('parent', args)
        args.unshift(null)
        var client = Function.prototype.bind.apply(UsergridClient, args)
        _.assign(self, client)
        Object.setPrototypeOf(self, new client())
        self.isInitialized = true
        self.isSharedInstance = true
    }
}

Usergrid.init = Usergrid.initSharedInstance
module.exports = Usergrid