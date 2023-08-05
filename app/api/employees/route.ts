import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET() {
  try {
    const [rows, fields] = await db.query("SELECT * FROM employees");
    console.log(rows);
    return new NextResponse(rows, { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
