import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
    username: string,
    usertype: string,
    userId: string,
    email: string,
    mobileNo: string,
    password: string, // ✅ Add password field
    dateOfRegistration: string ,
    address: string,
    accountStatus: boolean
}

const UserDataSchema: Schema<User> = new Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
    },
    usertype: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true // ✅ Make email unique
    },
    mobileNo: {
        type: String,
        required: true
    },
    password: { // ✅ Add password field
        type: String,
        required: true,
        minlength: 6
    },
    dateOfRegistration: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    accountStatus: {
        type: Boolean,
        default: false
    }
})

const UserDataModel:Model<User> = mongoose.models.User || mongoose.model<User>("User",UserDataSchema)
export default UserDataModel;