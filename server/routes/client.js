import express from 'express'
import path from 'path'
import utils from '../utils'

utils.logExec(__filename);

export default function(app){
    
    app.get('/:url(|public|libs|)',function(req,res,next){
        utils.setMaxCache(res);        
        next();
    })

    
    app.use('/', express.static(app.get('public')))    
    //app.use('/public', express.static(app.get('public')))
    app.use('/libs', express.static(path.join(app.get('public'), '/bower_components')))


    return app;
}

// var express = require('express');
// var server = require('../utils')
// var path = require('path');

// var router = express.Router();
// router.get('/*', function(req, res, next){
//     if(server.config.env == 'dev'){
//         server.setNonCache(res);        
//     }else{
//         server.setMaxCache(res);                
//     }
//     next();
// });

// module.exports = express.static(__dirname);
