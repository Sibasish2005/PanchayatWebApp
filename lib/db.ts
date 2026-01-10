import { error } from "console";
import mongoose from "mongoose";

const MONGO_URI=process.env.MONGO_URI as string;


export async function connectDB() {
    try {
        if(!MONGO_URI){
            throw new Error("MONGO_DB URI NOT DEFINED")
        }
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        throw new Error("MONGO_DB CONNECTION FAIL")
    }
}