import server_app from '../app/'
import utils from '../utils'
utils.logExec(__filename);
export default function (app) {
    server_app(app)
    return app;
    
    //app.use('/', express.static(path.dirname(__dirname) + '/public'));
    //app.use('/libs', express.static(path.dirname(__dirname) + '/bower_components')); //sirve

    // app.use('/', require('../public'));    
    // app.use('/libs', require('../bower_components'));

    // Insert routes below
    
    //app.use('/:appId/:pageLayout/:userId/widgets.html', require('../app'));
    // app.use('/app', require('../app'));
    // app.use('/api', require('../api'));

    // app.route('/*').get((req,res)=>{
    //     res.sendFile(app.get('root') + '/widgets.html');
    // });
    
    //// All undefined asset or api routes should return a 404
    //app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    //    .get(errors[404]);

    //// All other routes should redirect to the index.html
    // app.get('/', function (req, res) {
    //     var filename = req.params.filename || 'index.html';
    //     res.sendFile(app.get('root') + '/public/' + filename);
    // });
};