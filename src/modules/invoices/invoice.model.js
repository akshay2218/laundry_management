
const mongoose = require("mongoose");

const itemSchema =
  new mongoose.Schema(
    {
      serviceName: String,

      itemName: String,

      quantity: Number,

      weight: Number,

      rate: Number,

      amount: Number
    },
    {
      _id: false
    }
  );

  const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
      type: String,
      unique: true
    },
    customerId: {
      type: String,
      ref: "Customer"
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    },
  
    isFinalized: {
      type: Boolean,
      default: false
    },
  
    items: [itemSchema],
  
    subtotal: Number,
    discount: Number,
    taxableAmount: Number,
  
    gstAmount: Number,
    sgstAmount: Number,
    cgstAmount: Number,
  
    finalAmount: Number,
  
    couponCode: String,
  
    deliveryCharge: Number,
    expressCharge: Number,
  
    deliveryDate: String,
    deliveryTime: String,
  
    challanNumber: String,
    customerGST: String,
  
    comments: String,
  
    generatedAt: Date
  }, {
    timestamps: true
  });

invoiceSchema.index({
  invoiceNumber: 1
});

module.exports = mongoose.model(
  "Invoice",
  invoiceSchema
);