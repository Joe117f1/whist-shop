import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderDate: { type: Number, required: true },
  total: { type: Number, required: true },
  orderItems: [
    {
      product: { type: Object, required: true },
    }
  ],
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);