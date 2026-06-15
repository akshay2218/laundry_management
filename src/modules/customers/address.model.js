const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    houseNo: String,

    apartment: String,

    landmark: String,

    pinCode: String,

    contactPerson: String,

    contactNumber: String,

    addressType: {
      type: String,
      enum: [
        "HOME",
        "WORK",
        "FAMILY",
        "HOTEL",
        "OTHER"
      ],
      default: "HOME"
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Address",
  addressSchema
);