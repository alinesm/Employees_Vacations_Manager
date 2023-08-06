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

    const [vacations, fields] = await db.query(
      "SELECT * FROM vacations WHERE employee_id = ?",
      [id]
    );

    const yearsWorked = Math.floor(today.diff(hiringDate, "month") / 12);
    const lastHireBirthday = hiringDate.add(yearsWorked, "year");
    const nextHireBirthday = lastHireBirthday.add(1, "year");

    const filterVacations = vacations.filter((vacation) => {
      const vacationStart = dayjs(vacation.start_date);
      const vacationEnd = dayjs(vacation.end_date);
      return (
        (vacationStart.isAfter(lastHireBirthday) ||
          vacationStart.isSame(lastHireBirthday)) &&
        (vacationEnd.isBefore(nextHireBirthday) ||
          vacationEnd.isSame(nextHireBirthday))
      );
    });

    const sumOfScheduledVacationsDays = filterVacations.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );
    const availableQtyDays = 30 - sumOfScheduledVacationsDays;

    let isAvailableToVacation = true;
    if (monthsWorked < 12 || availableQtyDays <= 0) {
      isAvailableToVacation = false;
    }

    const vacationsInfo = {
      isAvailableToVacation,
      availableQtyDays,
      vacations,
    };

    console.log("vacationsInfo", vacationsInfo);

    return new NextResponse(JSON.stringify(vacationsInfo));
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
