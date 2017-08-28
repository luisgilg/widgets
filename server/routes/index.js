import server from './server'
import client from './client'
import utils from '../utils'
utils.logExec(__filename);

export default function (app) {
    server(app)
    client(app)
    return app;
};