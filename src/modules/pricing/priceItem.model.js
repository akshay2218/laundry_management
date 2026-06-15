const mongoose = require("mongoose");

const priceItemSchema =
  new mongoose.Schema(
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
      },

      category: {
        type: String,
        required: true
      },

      itemName: {
        type: String,
        required: true
      },

      price: {
        type: Number,
        required: true
      },

      isActive: {
        type: Boolean,
        default: true
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  "PriceItem",
  priceItemSchema
);