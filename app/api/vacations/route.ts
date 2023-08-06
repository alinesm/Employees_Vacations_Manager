import { NextResponse } from "next/server";
import dayjs from "dayjs";
import repository from "../repositories";
import {
  checkOverlaps,
  generateParsedDates,
  isSelectedPeriodValid,
} from "../helpers";

const MAX_DAYS = 30;
const MIN_VACATION_DURATION = 5;

export async function POST(request: Request) {
  const body = await request.json();
  const { employee_id, start_date, end_date, ref_year } = body;

  try {
    const employeeInfo = await repository.getEmployeeInfo(employee_id);

    if (employeeInfo.length === 0) {
      return new NextResponse("Employee not found", { status: 404 });
    }

    const { lastHireBirthday, nextHireBirthday, monthsWorked } =
      generateParsedDates(employeeInfo);

    if (monthsWorked < 12) {
      return new NextResponse(
        "Employee must work at least 12 months before taking a vacation",
        { status: 400 }
      );
    }

    const checkIfEndDateIsBeforeStartDate = dayjs(end_date).isBefore(
      dayjs(start_date)
    );
    if (checkIfEndDateIsBeforeStartDate) {
      return new NextResponse(
        "Invalid period. End date must be after start date",
        {
          status: 400,
        }
      );
    }

    const vacations = await repository.getVacations(employee_id);

    const duration = dayjs(end_date).diff(dayjs(start_date), "day") + 1;

    if (
      !isSelectedPeriodValid(dayjs(start_date), dayjs(end_date), employeeInfo)
    ) {
      return new NextResponse(
        `Invalid period. Vacation period must be between ${dayjs(
          lastHireBirthday
        ).format("YYYY-MM-DD")} and ${dayjs(nextHireBirthday).format(
          "YYYY-MM-DD"
        )}`,
        {
          status: 400,
        }
      );
    }

    const filteredVacations = vacations.filter((vacation) => {
      const vacationStart = dayjs(vacation.start_date);
      const vacationEnd = dayjs(vacation.end_date);
      return isSelectedPeriodValid(vacationStart, vacationEnd, employeeInfo);
    });

    const overlaps = checkOverlaps(
      filteredVacations,
      dayjs(start_date),
      dayjs(end_date)
    );
    if (overlaps) {
      return new NextResponse("Invalid period. Overlaps with other period", {
        status: 400,
      });
    }

    const scheduledDaysCount = filteredVacations.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );

    const availableDaysCount = MAX_DAYS - scheduledDaysCount;

    const currentPeriod = filteredVacations.length + 1;

    if (duration > MAX_DAYS) {
      return new NextResponse(`Invalid duration. Maximum of ${MAX_DAYS} days`, {
        status: 400,
      });
    }

    if (duration < MIN_VACATION_DURATION) {
      return new NextResponse("Invalid duration. Minimum of 5 days", {
        status: 400,
      });
    }

    if (availableDaysCount <= 0) {
      return new NextResponse("No available days left", { status: 400 });
    }

    if (duration > availableDaysCount) {
      return new NextResponse("Not enough days available", { status: 400 });
    }

    if (
      currentPeriod === 1 &&
      duration > MAX_DAYS - MIN_VACATION_DURATION &&
      duration < MAX_DAYS
    ) {
      return new NextResponse(
        `Invalid duration. Your first vacation needs to be: at least ${MIN_VACATION_DURATION} days or up to ${
          MAX_DAYS - MIN_VACATION_DURATION
        } or equal to ${MAX_DAYS} days`,
        {
          status: 400,
        }
      );
    }

    if (currentPeriod === 2) {
      const projectedThirdPeriodDuration = availableDaysCount - duration;

      if (
        duration !== availableDaysCount &&
        projectedThirdPeriodDuration < MIN_VACATION_DURATION
      ) {
        return new NextResponse(
          `Invalid duration. You can't have a second vacation period of ${duration} days and a third period of ${projectedThirdPeriodDuration} days. The third period must be at least ${MIN_VACATION_DURATION} days`,
          {
            status: 400,
          }
        );
      }

      if (
        filteredVacations[0].duration < 14 &&
        duration < 14 &&
        projectedThirdPeriodDuration < 14
      ) {
        return new NextResponse(
          "Invalid duration. You must have at least one period of 14 days (out of three periods)",
          {
            status: 400,
          }
        );
      }
    }

    if (currentPeriod === 3 && duration !== availableDaysCount) {
      return new NextResponse(
        `Invalid duration. Only one period left to schedule. Duration must be equal to ${availableDaysCount} which is the number of days left`,
        {
          status: 400,
        }
      );
    }

    const createdVacation = await repository.createVacation(
      employee_id,
      start_date,
      end_date,
      duration,
      ref_year
    );
    if (!createdVacation)
      return new NextResponse("Error: vacation not created", { status: 500 });

    return new NextResponse(JSON.stringify(createdVacation), { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
