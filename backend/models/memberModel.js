const mongoose = require("mongoose");
const { SCHEMA_VERSION } = require("../config/constants");

const memberSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    suffix: { type: String, default: "" },
    birthDate: { type: Date, default: null },
    gender: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    callings: { type: Array, default: [] },
    moveInDate: { type: Date, default: null },
    preferredName: { type: String, required: true },
    prefferedNameURL: { type: String, default: "" },
    memberId: { type: Number, default: 0 },
    priesthoodOffice: { type: String, default: "" },
    templeRecommendExpirationDate: { type: Date, default: null },
    templeRecommendStatus: { type: String, default: "" },
    templeRecommendType: { type: String, default: "" },
    isWillingToSpeak: { type: Boolean, default: true },
    isWillingToPray: { type: Boolean, default: true },
    contactForTithing: { type: Boolean },
    marriageDate: { type: Date, default: null },
    address1: { type: String, default: "" },
    address2: { type: String, default: "" },
    talks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talk" }],
    prayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prayer" }],
    talkCount: { type: Number, default: 0 },
    prayerCount: { type: Number, default: 0 },
    lastPrayerDate: { type: Date, default: null },
    lastTalkDate: { type: Date, default: null },
    isServingMission: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);
