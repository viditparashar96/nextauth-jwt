import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/nextauthwithjwt")
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("mogodb connected successfully")
        })
        connection.on('error', (err) => {
            console.log(`error is coming ${err}`)
            process.exit()
        })
    } catch (error) {

    }
}