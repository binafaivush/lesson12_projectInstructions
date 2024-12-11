import { Schema, model, ObjectId } from "mongoose";

// const authorSchema = Schema({
//     firstName: String,
//     lastName: String,
//     phone: String,

// })
export const bookSchema = Schema({

  name: String,
  prodDate: { type: Date, default: new Date() },
  numPages: Number,
  categories: [String],
  author: {
    firstName: String,
    lastName: String,
    phone: String,
  },
  //כך המחבר עצמו גם מקבל _id
});

export const bookModel = model("book", bookSchema);
