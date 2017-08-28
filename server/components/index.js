import path from 'path'

import utils from '../utils'
utils.logExec(__filename);

export default function (app) {
    //app.route('/:url/*').get((req,res)=>res.sendFile(path.join(__dirname,'/404.html')))
    app.route('*').get((req,res)=>res.sendFile(path.join(__dirname,'/404.html')))
    return app;
};