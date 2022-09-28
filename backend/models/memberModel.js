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
    memberId: Number,
    priesthoodOffice: String,
    templeRecommendExpirationDate: Date,
    templeRecommendStatus: String,
    templeRecommendType: String,
    isWillingToSpeak: Boolean,
    isWillingToPrayer: Boolean,
    marriageDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);
