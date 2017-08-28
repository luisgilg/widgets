import mongoose from 'mongoose';

const name = 'app'

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

var model = mongoose.model(name, schema);

export default {
    model:model,
    schema:schema,
    name:name
}