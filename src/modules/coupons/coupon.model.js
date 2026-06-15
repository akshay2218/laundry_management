const mongoose = require("mongoose");

const couponSchema =
  new mongoose.Schema(
    {
      code: {
        type: String,
        unique: true,
        required: true
      },

      title: {
        type: String,
        required: true
      },

      description: String,

      discountType: {
        type: String,
        enum: [
          "PERCENTAGE",
          "FLAT"
        ]
      },

      discountValue: Number,

      minimumOrderValue: Number,

      maximumDiscountValue: Number,

      applicableServices: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Service"
        }
      ],

      validFrom: Date,

      validTo: Date,

      isActive: {
        type: Boolean,
        default: true
      }
    },
    {
      timestamps: true
    }
  );

couponSchema.index({
  code: 1
});

module.exports = mongoose.model(
  "Coupon",
  couponSchema
);