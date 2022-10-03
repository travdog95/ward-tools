const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String,
    birthDate: Date,
    gender: String,
    email: String,
    phone: String,
    callings: Array,
    moveInDate: Date,
    preferredName: String,
    prefferedNameURL: String,
    memberId: Number,
    priesthoodOffice: String,
    templeRecommendExpirationDate: Date,
    templeRecommendStatus: String,
    templeRecommendType: String,
    isWillingToSpeak: { type: Boolean, default: true, required: true },
    isWillingToPray: { type: Boolean, default: true, required: true },
    contactForTithing: { type: Boolean, required: true },
    marriageDate: Date,
    address1: String,
    address2: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);
