const mongoose = require("mongoose");

const statusSchema =
  new mongoose.Schema(
    {
      status: String,

      changedAt: {
        type: Date,
        default: Date.now
      },

      changedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    },
    {
      _id: false
    }
  );

const orderSchema =
  new mongoose.Schema(
    {
      orderNumber: {
        type: String,
        unique: true
      },

      customerId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
      },

      addressId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
      },

      orderSource: {
        type: String,
        enum: [
          "STORE",
          "CUSTOMER_CARE",
          "WALK_IN"
        ]
      },

      pickupDate: String,

      pickupTime: String,

      instructions: String,

      assignedDeliveryPersonId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "DeliveryPerson"
      },

      status: {
        type: String,
        default: "NEW"
      },

      statusHistory: [
        statusSchema
      ]
    },
    {
      timestamps: true
    }
  );

orderSchema.index({
  customerId: 1
});

orderSchema.index({
  status: 1
});

orderSchema.index({
  pickupDate: 1
});

module.exports = mongoose.model(
  "Order",
  orderSchema
);