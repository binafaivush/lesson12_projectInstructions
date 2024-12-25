import { connect } from "mongoose";



export async function connectToDB() {
    try {


        let connection = await connect(process.env.DB_URI||"mongodb+srv://bina:214874802@cluster0.r3dsn.mongodb.net/myLibrary?retryWrites=true&w=majority&appName=Cluster0")
        console.log("mongo db connected" + connection.Connection)
    }
    catch (err) {
        console.log("cannot connect MongoDb" + err.message)
        process.exit(1)
    }
}