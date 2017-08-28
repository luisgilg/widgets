import fs from 'fs';
import path from 'path';
import utils from '../../utils'

import stringify from'node-stringify';

utils.logExec(__filename);

var widgets = [
    'WidgetStyles',
    'WidgetContext',
    'WidgetElement',
    'WidgetExtends',
    
        
    'WidgetLoader',    
    
    'WidgetModal',
    
    'WidgetContainer',    
    'WidgetItem',  
    'WidgetStackPanel',    
    
    'WidgetButton',    

    'WidgetZone',
    'WidgetEdit',

];

var controller = {
    getWitgets: function (req, res) {
        //utils.logger.info('getWitgets %s',JSON.stringify(req.params))
        //utils.logger.info('originalUrl %s', req.originalUrl)
        

        var filePromises = [
            new Promise((resolve, reject) => {
                var fileName = path.join(__dirname, '/gallery', '/imports.fx.html');
                fs.readFile(fileName, 'utf8', (err, data) => {
                    if (err) {
                        return resolve('<html><head></head><body>/* file not found: ' + fileName + ' */</body></html>');
                    }

                    return resolve(data);
                });
            }),
            '<link rel="import" href="' + req.originalUrl.replace('widgets.html','dynamic.html') + '" />',
            '<script type="text/javascript" src="'+ req.originalUrl.replace('widgets.html','context.js') +'"></script>'
        ].concat(widgets.map(x => {
            return new Promise((resolve, reject) => {
                var fileName = path.join(__dirname, '/gallery', '/' + x, '/index.fx.html');
                fs.readFile(fileName,'utf8', (err, data) => {
                    if (err) {
                        return resolve('<html><head></head><body>/* file not found: ' + fileName + ' */</body></html>');
                    }

                    return resolve(data);
                });
            })
        }));

        Promise.all(filePromises).then((data) => {
            res.send(data.join(''));
        });
    },
    getContextJs: function (req, res){
        var widgetButton = {
            displayTitle:"Add widget",
        };

        var wdigetManager = {
            widgetButton:widgetButton
        };


        // var widgetZone = {
        //     displayTitle:"webpart test 1",
        //     wdigetManager: wdigetManager,
        //     addButtonTitle:"Add widget",
        //     activeWidgets:[
        //         {
        //             displayTitle:"widget1",
        //             type:"widget-button"
        //         }
        //     ]
        // };

        var dummyWidgets = [
            {
                type:'widget-button',
                displayTitle:'hello world'
            }
        ];

        var widgetStackPanel = {
            type:'widget-stack-panel',
            orientation:'vertical',
            allowRemove:true,
            allowAdd:true,
            content:dummyWidgets          
        }

        var widgetZone = {            
            allowAdminEdit:true,
            allowAdminClient:true,
            content:widgetStackPanel,
        };
        var context = {
            value1:0,
            value2:"test",
            isEditing:false,
            wpZone1: widgetZone,
        };

        var setting = {
            top_extends:[],
            bottom_extends:[],
            isExtendable: true,            
        };

         var filePromises = [
            new Promise((resolve, reject) => {
                var fileName = path.join(__dirname, '/context.js');
                fs.readFile(fileName,'utf8', (err, data) => {
                    if (err) {
                        return resolve('');
                    }

                    return resolve(data);
                });
            }),           
        ];

        
        Promise.all(filePromises).then((data) => {
            var txt = data.join('\r\n')
            .replace('{j:0}',JSON.stringify(context))
            .replace('{s:0}',JSON.stringify(setting));

            res.send(txt);
        });
    },
    getDynamicHtml: function (req, res){
         res.send('');        
    },
    getWitgetsJs: function (req, res){

        var filePromises = [
            new Promise((resolve, reject) => {
                var fileName = path.join(__dirname, '/load.js');
                fs.readFile(fileName,'utf8', (err, data) => {
                    if (err) {
                        return resolve('');
                    }
                    return resolve(data);
                });
            })
        ];

        Promise.all(filePromises).then((data) => {

            var txt = data[0]
            .replace('{j:0}',req.originalUrl);

            res.send(txt);
        });

    }
};

export default controller;