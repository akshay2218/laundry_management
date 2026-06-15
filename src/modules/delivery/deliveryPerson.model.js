const mongoose = require("mongoose");

const deliveryPersonSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },

      phone: String,

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
  "DeliveryPerson",
  deliveryPersonSchema
);