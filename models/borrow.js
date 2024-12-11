import { Schema, model, ObjectId } from "mongoose";
import { bookModel, bookSchema } from "./book.js";

// const smallUserDetails=Schema({
//     firstName:String,
//     lastName:String
// })

const borrowSchema = Schema({
  date: {
    type: Date,
    default: new Date(),
  },

  user: {
    type: ObjectId,
    ref: "user",
  },
//   userDetails: { _id: ObjectId, firstName: String, lastName: String },
  books: [bookSchema],
  isBack: { type: Boolean, default: false },
});

export const borrowModel = model("borrow", borrowSchema);
