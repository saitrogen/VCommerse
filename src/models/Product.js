const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be at least 0']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'groceries',
      'electronics',
      'clothing',
      'home',
      'other'
    ]
  },
  images: {
    type: [String],
    validate: [arrayLimit, 'You can upload up to 5 images']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Product', ProductSchema);