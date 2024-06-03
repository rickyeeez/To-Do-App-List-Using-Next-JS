import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const tasks = await prisma.tasks.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(id);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        data: process.env.NEXT_PUBLIC_DB_USER,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { urgency } = await request.json();

    const updateData: { [key: string]: string } = {};

    if (urgency) updateData.urgency = urgency;

    const updatedTask = await prisma.tasks.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      messages: "Task Updated Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        messages: error,
      },
      { status: 500 }
    );
  }
}
