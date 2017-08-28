import path from 'path'
import _ from 'lodash';

import utils from '../utils'
utils.logExec(__filename);


var env = process.env.NODE_ENV || 'dev';
var norm_join = (_root, _path) => path.normalize(path.join(_root, _path))

var cwd = norm_join(__dirname,'../../')
var dist_root = norm_join(cwd,'/dist')

var dist = {
    root: dist_root,
    public:norm_join(dist_root,'/public'),
    server:norm_join(dist_root,'/server'),
}

var vars = {
    root: cwd,
    env: env,
    public: norm_join(cwd, '/client'),
    client: norm_join(cwd, '/client'),
    server: norm_join(cwd, '/server'),
}

var all = {
    port: process.env.PORT || 9000,    
    dist:dist,
    cacheMaxAge : 12*5*7*4*12*100,
    cacheMedAge : 8*100,
    debug:false,
    mongo_uri:'mongodb://localhost:27017/widgets',
    mongoose_options:{
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useMongoClient: true,
    }
};

all = _.merge(all,vars)

var _env = require('./' + env + '.js')
var config = _.merge(all,_env)

export {config, vars}
export default config