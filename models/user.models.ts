import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
    username: string,
    usertype: string,
    userId: string,
    email: string,
    mobileNo: string,
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
    },
    mobileNo: {
        type: String,
        required: true
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