import { connectDB } from "@/lib/db";
import UserDataModel from "@/models/user.models";
import UserModel from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const user = await UserModel.findOne();
        return NextResponse.json({
            success: true,
            data: user
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something went Wrong"
        })
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const { username, usertype, userId, email, mobileNo, dateOfRegistration, address, accountStatus } = await request.json();
        if (!username || !usertype || !userId || !email || !mobileNo) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }
        const user = await UserDataModel.create({
            username,
            usertype,
            userId,
            email,
            mobileNo,
            dateOfRegistration,
            address,
            accountStatus
        })
        return NextResponse.json({
            success: true,
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "user creation failed"
        },{status:404})
    }
}