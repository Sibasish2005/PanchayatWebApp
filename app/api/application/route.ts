import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/application.models";

export async function GET() {
  try {
    await connectDB();

    const applications = await Application.find({})
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      service,
      name,
      mobileNo,
      address,
      documentType,
    //   documentUrl, // Cloudinary URL (later)
    } = body;

    //  Backend validation (important)
    if (
      !service ||
      !name ||
      !mobileNo ||
      !address ||
      !documentType
    //    ||
    //   !documentUrl
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (mobileNo.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Invalid mobile number" },
        { status: 400 }
      );
    }

    const application = await Application.create({
      service,
      name,
      mobileNo,
      address,
      documentType,
    //   documentUrl,
    });

    return NextResponse.json(
      {
        success: true,
        data: application,
        message: "Application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application POST error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
