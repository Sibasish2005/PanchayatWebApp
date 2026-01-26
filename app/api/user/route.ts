import { connectDB } from "@/lib/db";
import UserDataModel from "@/models/user.models";
import UserModel from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
    try {
        // Get the logged-in user's session
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        
        // Find user by email from session
        const user = await UserModel.findOne({ 
            email: session.user.email 
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Return user data without password
        const userData = {
            _id: user._id,
            username: user.username,
            usertype: user.usertype,
            userId: user.userId,
            email: user.email,
            mobileNo: user.mobileNo,
            dateOfRegistration: user.dateOfRegistration,
            address: user.address || "",
            accountStatus: user.accountStatus
        };

        return NextResponse.json({
            success: true,
            data: userData
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const { username, usertype, userId, email, mobileNo, password, dateOfRegistration, address, accountStatus } = await request.json();
        if (!username || !usertype || !userId || !email || !mobileNo || !password) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Hash password on server side (more secure)
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserDataModel.create({
            username,
            usertype,
            userId,
            email,
            mobileNo,
            password: hashedPassword, // Store hashed password
            dateOfRegistration,
            address,
            accountStatus
        })
        return NextResponse.json({
            success: true,
            message: "User created successfully"
        }, { status: 200 })


    } catch (error: any) {
        // Handle duplicate key error
        if (error.code === 11000) {
            return NextResponse.json({
                success: false,
                message: "Email or User ID already exists"
            }, { status: 400 })
        }
        return NextResponse.json({
            success: false,
            message: error.message || "user creation failed"
        }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        // Get the logged-in user's session
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        
        const { address } = await request.json();

        // Update user's address
        const user = await UserModel.findOneAndUpdate(
            { email: session.user.email },
            { address: address || "" },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Return updated user data without password
        const userData = {
            _id: user._id,
            username: user.username,
            usertype: user.usertype,
            userId: user.userId,
            email: user.email,
            mobileNo: user.mobileNo,
            dateOfRegistration: user.dateOfRegistration,
            address: user.address || "",
            accountStatus: user.accountStatus
        };

        return NextResponse.json({
            success: true,
            message: "Address updated successfully",
            data: userData
        });
    } catch (error: any) {
        console.error("Error updating address:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to update address" },
            { status: 500 }
        );
    }
}