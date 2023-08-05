import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM vacations WHERE employee_id = ?",
      [id]
    );
    console.log(rows);
    return new NextResponse(JSON.stringify(rows));
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
