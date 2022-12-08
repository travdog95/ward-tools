const mongoose = require("mongoose");
const { getYear, getMonth } = require("date-fns");
const { SCHEMA_VERSION } = require("../config/constants");

const sacramentMeetingSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
    theme: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: null,
    },
    talks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talk" }],
    prayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prayer" }],
    year: {
      type: Number,
      default: function () {
        if (this.date) {
          return getYear(this.date);
        } else {
          return null;
        }
      },
    },
    month: {
      type: Number,
      default: function () {
        if (this.date) {
          return getMonth(this.date);
        } else {
          return null;
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SacramentMeeting", sacramentMeetingSchema);
