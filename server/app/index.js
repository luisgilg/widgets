import utils from '../utils'
import express from 'express'
import api from './api'
import widgets from './widgets'
import schema from './graphql-schema'
import graphqlHTTP from 'express-graphql';

utils.logExec(__filename);

export default function(app){
        
    app.use('/app/api', api);
    app.use('/app/widgets', widgets);

    app.use('/app/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    return app;
}