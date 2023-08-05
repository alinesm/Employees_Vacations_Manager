import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { employee_id, start_date, end_date, duration, ref_year } = body;

  try {
    const [rows, fields] = await db.query(
      "INSERT INTO vacations (employee_id, start_date, end_date, duration, ref_year) VALUES (?, ?, ?, ?, ?)",
      [employee_id, start_date, end_date, duration, ref_year]
    );
    console.log(rows);
    return new NextResponse(JSON.stringify(rows));
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
