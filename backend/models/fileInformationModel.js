const mongoose = require("mongoose");
const { SCHEMA_VERSION } = require("../config/constants");

const fileInformationSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
    filename: {
      type: String,
      default: "",
      required: true,
    },
    destination: {
      type: String,
      default: "",
      required: true,
    },
    encoding: { type: String, default: "" },
    mimetype: { type: String, default: "" },
    originalname: { type: String, default: "" },
    size: { type: Number, default: 0 },
    uploadDate: { type: Date, default: new Date() },
    importDate: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileInformationSchema);
