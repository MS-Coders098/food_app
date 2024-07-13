const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  pname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', productSchema);
