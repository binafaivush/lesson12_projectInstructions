import express from "express";
import dotenv from "dotenv";

import { connectToDB } from "./config/DB.js";
import bookRouter from "./routers/book.js";
import userRouter from "./routers/user.js";
import borrowRouter from "./routers/borrow.js";
import { logToFile } from "./middlewares/logToFile.js";
const app = express();
// connectToDB();
dotenv.config();

app.use(logToFile);
app.use(express.json());
app.get("/all",()=>{
    console.log("hello to you")
})
/*
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/borrow", borrowRouter);*/
// app.use("/api/borrow")

const port = process.env.PORT;
app.listen(port, "localhost", () => {
  console.log("app is running on port " + port);
});

//higher oreder function - hof

function a() {
  return function () {
    console.log("hello");
  };
}
a()();
