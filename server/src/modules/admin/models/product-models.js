// modules/admin/models/product-models.js

import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['buy_one_get_one', 'membership_discount', 'bulk_purchase_discount', 'limited_time_discount'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
});

const productSchema = new mongoose.Schema({
  uId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  offers: [offerSchema], 
});

const Product = mongoose.model('Product', productSchema);

export default Product;