
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

const invoiceSchema =
  new mongoose.Schema(
    {
      invoiceNumber: {
        type: String,
        unique: true
      },

      orderId: {
        type:
          mongoose.Schema.Types.ObjectId,
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

      finalAmount: Number,

      couponCode: String,

      deliveryCharge: Number,

      expressCharge: Number,

      generatedAt: Date
    },
    {
      timestamps: true
    }
  );

invoiceSchema.index({
  invoiceNumber: 1
});

module.exports = mongoose.model(
  "Invoice",
  invoiceSchema
);