import config from './config'
import _ from 'lodash'
import winston from 'winston'

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

function setMaxCache(res){
    res.setHeader('Cache-Control','public, max-age=' + config.cacheMaxAge);
}

function setMedCache(res){
    res.setHeader('Cache-Control','public, max-age=' + config.cacheMedAge);
}

function setNonCache(res){    
    res.setHeader('Cache-Control','public, max-age=0');
    res.setHeader('Expires', new Date(Date.now() + 0).toUTCString());
    res.setHeader('Last-Modified', new Date(Date.now() + -1).toUTCString());
}

function logExec(file){
  logger.info('The file "%s" was exec', file);
}

export default {
    setMaxCache:setMaxCache, 
    setNonCache:setNonCache,
    setMedCache:setMedCache,
    config:config,
    logger: logger,
    logExec:logExec
}