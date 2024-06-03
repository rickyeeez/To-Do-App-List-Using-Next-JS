import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  try {
    const tasks = await prisma.tasks.findMany({
      orderBy: {
        time: "asc",
      },
    });
    const distinctDates = Array.from(
      new Set(
        tasks.map((task) => {
          if (task.time) {
            return new Date(task.time).toISOString().split("T")[0];
          } else {
            return "N/A";
          }
        })
      )
    );
    const dataByDate: { [key: string]: any[] } = {};

    for (const date of distinctDates) {
      const dateObj = new Date(date);
      const tasksForDate = await prisma.tasks.findMany({
        where: {
          time: {
            gte: new Date(
              dateObj.getFullYear(),
              dateObj.getMonth(),
              dateObj.getDate()
            ),
            lt: new Date(
              dateObj.getFullYear(),
              dateObj.getMonth(),
              dateObj.getDate() + 1
            ),
          },
        },
        orderBy: { time: "asc" },
      });

      dataByDate[date] = tasksForDate;
    }

    return NextResponse.json({
      success: true,
      data: dataByDate,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, time, urgency } = await request.json();
    const newTask = await prisma.tasks.create({
      data: {
        name,
        time,
        urgency,
      },
    });
    return NextResponse.json({
      success: true,
      messages: "Task Created Successfully",
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
