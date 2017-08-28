import {
    GraphQLList,
    GraphQLID,
    GraphQLString
} from 'graphql';

import { model, type } from '../types/app';
import getProjection from '../get-projection';
import utils from '../../../utils'

utils.logger.info('type' + type)



export default {
    type: new GraphQLList(type),
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        },
    },
    resolve(root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);
        var findBy = {};
        if(params.id && params.id.length>0){
            findBy = {
                _id: {$in: params.id }
            }
        }

        return model
            .find(findBy)
            .select(projection)
            .exec();
    }
};