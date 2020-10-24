const mongoose = require('mongoose');

const FilmsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  release: {
    type: Number,
    require: true,
  },
  format: {
    type: String,
    require: true,
  },
  stars: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model('films', FilmsSchema);
