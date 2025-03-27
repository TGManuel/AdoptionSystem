import { Schema, model } from "mongoose";

const DateSchema = Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

DateSchema.methods.toJSON = function () {
  const { _id, ...date } = this.toObject();
  date.uid = _id;
  return date;
};

export default model("DateModel", DateSchema);