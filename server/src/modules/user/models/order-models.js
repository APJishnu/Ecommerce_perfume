import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      status:{
        type:Boolean,
        default:false
      },
      date:{
        type:Date,
        required:false
      }
    },
  ],
});

const Order = mongoose.model("Order", orderDetailsSchema);
export default Order;


