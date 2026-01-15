import { connectDB } from "@/lib/db";
import Application from "@/models/application.models";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Context = {
    params: Promise<{ id: string }>
}

export async function DELETE(
  request: Request,
  context: Context
): Promise<NextResponse> {
  try {
    await connectDB();

    const { id } = await context.params;

    const deleted = await Application.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Deleted successfully", data: deleted },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }

  // ✅ fallback return (TS fix)
  return NextResponse.json(
    { success: false, message: "Unexpected error" },
    { status: 500 }
  );
}

export async function PUT(request: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();

    const updated = await Application.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Updated successfully", data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.log("PUT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
