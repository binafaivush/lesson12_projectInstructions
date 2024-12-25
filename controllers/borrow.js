import { isValidObjectId } from "mongoose";
import { borrowModel } from "../models/borrow.js";
import { userModel } from "../models/user.js";
import { bookModel } from "../models/book.js";

export const getAllBorrow = async (req, res, next) => {
  try {
    let result = await borrowModel.find().populate("user"/*הולך לשדה הזה ומחפש איבר מתאים מהאוסף המתאים כפי שכתוב במודל*/);
    res.json(result);
  } catch (err) {
    res
      .status(400)
      .json({ title: "cannot gel al lborrows", message: err.message });
  }
};

export const getBorrowById = async (req, res, next) => {
  let { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({
      title: "object id is not valid",
      message: "not in correct ObjectId fornmat",
    });
  console.log("------" + id);
  try {
    let result = await borrowModel.findById(id);
    if (!result)
      return res
        .status(400)
        .json({ title: "cannot get borrow by id", message: "no such borrow" });
    res.json(result);
  } catch (err) {
    res
      .status(400)
      .json({ title: "cannot gel al lborrows", message: err.message });
  }
};
export const getAllBorrowsByUserId = async (req, res, next) => {
  let { userid } = req.params;
  if (!isValidObjectId(userid))
    return res
      .status(400)
      .json({
        title: "object id is not valid",
        message: "not in correct ObjectId fornmat",
      });
  try {
    let result = await borrowModel.find({ user: userid });
    res.json(result);
  } catch (err) {
    res.status(400).json({ title: "cannot get all borrows of this user", message: err.message });
  }
};

export const returnBorrow = async (req, res, next) => {
  let { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ title: "object id is not valid", message: "not in correct ObjectId fornmat" });
  try {
    let result = await borrowModel.findByIdAndUpdate(id, { isBack: true }, { new: true });
    //new:true } כדי להחזיר את האובייקט אחרי העדכון צריך לתת 
    if (!result)
      return res.status(400).json({ title: "cannot update borrow by id", message: "no such borrow" });
    res.json(result);
  } catch (err) {
    res
      .status(400)
      .json({ title: "cannot update borrows", message: err.message });
  }
};
export const addBorrow = async (req, res, next) => {
  let { body } = req;
  if (!body.user || !body.books || body.books.length == 0)
    return res.status(404).json({
      title: "missing body data",
      message: "user id ,books array are required",
    });
  try {
    let user = await userModel.findById(body.user);
    if (!user)
      return res.status(404).json({ title: "no such user", message: "user id not found" });
    let borrows = await borrowModel.find({ user: user._id, isBack: false });
    if (borrows.length)//אם נמצאו על שמו השאלות שהוא עוד לא החזיר הוא לא יכול להשאיל
      return res.status(403).json({ title: "you are not allowed borrow", message: "first return last borrow" });


    let bookids = body.books.map(item => item._id);
    let arr = await bookModel.find({ _id: { $in: bookids } });//שלפנו את כל הספרים שהוא רוצה לשלאול הוא שלח רק קוד ואנחנו שלפנו בהתאמה את כל הספר
    console.log(bookids,arr)
    if (arr.length != bookids.length)
      return res.status(404).json({ title: "one or more books are invalid", message: "check " });
    let b = await borrowModel.find({ isBack: false, "books._id": { $in: bookids } })
    if (b.length)//אחד הספרים כבר תפוס
      return res.status(403).json({ title: "you are not allowed borrow someone took this book", message: "sorry chooose another" });
    let newBorrow = new borrowModel({...body,books:arr}); //לוקח מגוך הקשה את הפרטים של ההשלא השאותה הוא הולך להוסיף
    await newBorrow.save(); //מכניסים למסד נתונים את ההשאלה החדשה
    res.json(newBorrow);
  } catch (err) {
    res.status(400).json({ title: "cannot save borrow", message: err.message });
  }
};
