import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET() {
  try {
    const [rows, fields] = await db.query("SELECT * FROM employees");
    console.log(rows);
    return new NextResponse(JSON.stringify(rows));
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, role, hiring_date } = body;

  try {
    const [rows, fields] = await db.query(
      "INSERT INTO employees (name, role, hiring_date) VALUES (?, ?, ?)",
      [name, role, hiring_date]
    );
    console.log(rows);
    return new NextResponse(JSON.stringify(rows));
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
