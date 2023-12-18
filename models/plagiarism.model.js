const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  link: String,
  count: Number,
  percent: Number
});

let plagiarismSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    sources: {
      type: [subSchema],
      required: true
    },
    plagPercent: {
      type: Number,
      required: true
    },
    matric: {
      type: String,
      required: true
    },
    user: {
      type: {},
      required: true
    }
  },
  {
    timestamps: true,
  }
);

plagiarismSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

plagiarismSchema.set("toJSON", {
  virtuals: true,
});


const Plagiarism = mongoose.model("plagiarism", plagiarismSchema);

module.exports = Plagiarism;