import { NextResponse } from "next/server";
import dayjs from "dayjs";
import repository from "@/app/api/repositories";
import { generateParsedDates } from "@/app/api/helpers";
import { EmployeeVacationInfoState } from "@/app/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const employeeInfo = await repository.getEmployeeInfo(Number(id));

    const { lastHireBirthday, nextHireBirthday, monthsWorked } =
      generateParsedDates(employeeInfo);

    const vacations = await repository.getVacations(Number(id));

    const filterVacations = vacations.filter(
      (vacation: EmployeeVacationInfoState) => {
        const vacationStart = dayjs(vacation.start_date);
        const vacationEnd = dayjs(vacation.end_date);
        return (
          (vacationStart.isAfter(lastHireBirthday) ||
            vacationStart.isSame(lastHireBirthday)) &&
          (vacationEnd.isBefore(nextHireBirthday) ||
            vacationEnd.isSame(nextHireBirthday))
        );
      }
    );

    const sumOfScheduledVacationsDays = filterVacations.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );
    const availableQtyDays = 30 - sumOfScheduledVacationsDays;

    const vacationsInfo = {
      monthsWorked,
      availableQtyDays,
      vacations,
    };

    return new NextResponse(JSON.stringify(vacationsInfo));
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
