import { userModel } from "../models/user.js";

export async function getAllusers(req, res) {
    try {//חסרה כאן בדיקה שאין משתמש עם פרטים זהים 
        let users = await userModel.find();

        return res.json(users);
    }
    catch (err) {
        res.status(400).json({ title: "cannot users", message: err.message })
    }
}

export function getById(req, res) { }
export function update(req, res) { }
export async function signUp(req, res) {

    let { body } = req;
    if (!body.password || !body.username || !body.email || !body.phone)
        return res.status(404).json({ title: "missing ", message: "username passworrd phone email are required" })
    try {//חסרה כאן בדיקה שאין משתמש עם פרטים זהים 
        let newUser = new userModel(body);
        await newUser.save()
        return res.json(newUser);
    }
    catch (err) {
        res.status(400).json({ title: "cannot users", message: err.message })
    }
}
export async function login(req, res) {

    let { body } = req;
    if (!body.password || !body.username)
        return res.status(404).json({ title: "missing ", message: "username passworrd  are required" })
    try {//חסרה כאן בדיקה שאין משתמש עם פרטים זהים 
        let result = await userModel.findOne({ username: body.username, password: body.password });
        if (!result)
            return res.status(404).json({ title: "no such details ", message: "login failed" })
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ title: "cannot users", message: err.message })
    }
}