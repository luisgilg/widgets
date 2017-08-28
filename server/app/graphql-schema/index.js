import app from './types/app'
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';
import utils from '../../utils'
utils.logExec(__filename);

const customizationOptions = {}
var app_model_tc = composeWithMongoose(app.model);

GQC.rootQuery().addFields({
  appById: app_model_tc.getResolver('findById'),
    //appByIds: app_model_tc.getResolver('findByIds'),
    //appOne: app_model_tc.getResolver('findOne'),
    //appMany: app_model_tc.getResolver('findMany'),
    //appCount: app_model_tc.getResolver('count'),
    //appConnection: app_model_tc.getResolver('connection'),
    //appPagination: app_model_tc.getResolver('pagination'),
});

//GQC.rootMutation().addFields({
  //appCreate: app_model_tc.getResolver('createOne'),
  //appUpdateById: app_model_tc.getResolver('updateById'),
  //appUpdateOne: app_model_tc.getResolver('updateOne'),
  //appUpdateMany: app_model_tc.getResolver('updateMany'),
  //appRemoveById: app_model_tc.getResolver('removeById'),
  //appRemoveOne: app_model_tc.getResolver('removeOne'),
  //appRemoveMany: app_model_tc.getResolver('removeMany'),
//});

const rootSchema = GQC.buildSchema();

export default rootSchema