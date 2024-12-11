import mongoose from "mongoose";

import { bookModel } from "../models/book.js";


export async function getAllBooks(req, res) {
    try {

        let data = await bookModel.find();
        res.json(data)
    }
    catch (err) {
        res.status(400).json({ title: "acnoot get all books", message: err.message })
    }
}

export async function getById(req, res) {
    let { id } = req;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ "title": "invalid id", message: " id is not in correct format " })
    try {

        let data = await bookModel.findById(id);
        if (!data)
            return res.status(404).json({ "title": "cannot get by id", message: " no book with such id found " })
        res.json(data)
    }
    catch (err) {
        res.status(400).json({ title: "acnoot get by id", message: err.message })
    }
}
export async function deleteById(req, res) {
    let { id } = req;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ "title": "invalid id", message: " id is not in correct format " })
    try {

        let data = await bookModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ "title": "cannot delete by id", message: " no book with such id found " })
        res.json(data)
    }
    catch (err) {
        res.status(400).json({ title: "acnoot delete book", message: err.message })
    }
}
export async function update(req, res) {
    let { id, body } = req;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ "title": "invalid id", message: " id is not in correct format " })
    if (body.name?.length <= 2)
        return res.status(400).json({ title: "acnoot update book", message: "name is too short" })
    try {

        let data = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ "title": "cannot update by id", message: " no book with such id found " })
        res.json(data)
    }
    catch (err) {
        res.status(400).json({ title: "acnoot update book", message: err.message })
    }
}
export async function add(req, res) {
    let { body } = req;
    if (!body.name || !body.numPages)
        return res.status(400).json({ title: "missing required fields", message: "name and numPages are required" })
    if (body.name.length <= 2)
        return res.status(400).json({ title: "acnoot update book", message: "name is too short" })
    try {

        let newBook = new bookModel(body);
        let data = await newBook.save();

        res.json(data)
    }
    catch (err) {
        res.status(400).json({ title: "acnoot add book", message: err.message })
    }


}