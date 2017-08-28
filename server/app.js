import express from 'express' 
import {config, vars} from './config'
import routes from './routes'
import components from './components'
import {createServer} from 'http'
import _ from 'lodash'
import mongoose from 'mongoose';

import utils from './utils'
utils.logExec(__filename);

mongoose.Promise = Promise;

var app = express()
var server = createServer(app)

_.forIn(vars, (_v,_k)=>app.set(_k,_v))

routes(app)
components(app)

var conn = mongoose.connect(config.mongo_uri, config.mongoose_options);

conn.once('open', () => {
  utils.logger.info('MongoDB successfully connected to "%s"', config.mongo_uri);
});


app.listen(config.port, config.ip, () => utils.logger.info('Express server listening on "%d", in "%s" mode', config.port, config.env))

export {app, server, config}
export default app