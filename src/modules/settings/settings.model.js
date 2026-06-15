const mongoose = require("mongoose");

const settingsSchema =
  new mongoose.Schema(
    {
      gstPercentage: {
        type: Number,
        default: 18
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);