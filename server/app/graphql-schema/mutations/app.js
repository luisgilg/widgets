import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import {input, model, type} from '../types/app';

export default {
  type: type,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(input)
    }
  },
  async resolve (root, params, options) {
    const _model = new model(params.data);
    const n_model = await _model.save();

    if (!n_model) {
      throw new Error('Error adding new blog post');
    }
    return n_model;
  }
};