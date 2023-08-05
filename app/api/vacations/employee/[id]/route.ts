import { NextResponse } from "next/server";
import db from "@/utils/db";
import dayjs from "dayjs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const [employeeInfo, fields1] = await db.query(
      "SELECT hiring_date FROM employees WHERE id = ?",
      [id]
    );

    const hiringDate = dayjs(employeeInfo[0].hiring_date);
    const today = dayjs();
    const monthsWorked = today.diff(hiringDate, "month");

    if (monthsWorked < 12) {
      return new NextResponse("Employee has not worked for 12 months yet", {
        status: 400,
      });
    }

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
