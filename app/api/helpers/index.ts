import dayjs from "dayjs";

export const generateParsedDates = (employeeInfo) => {
  const hiringDate = dayjs(employeeInfo[0].hiring_date);
  const today = dayjs();
  const yearsWorked = Math.floor(today.diff(hiringDate, "month") / 12);
  const lastHireBirthday = hiringDate.add(yearsWorked, "year");
  const nextHireBirthday = lastHireBirthday.add(1, "year");
  const monthsWorked = today.diff(hiringDate, "month");

  return {
    lastHireBirthday,
    nextHireBirthday,
    monthsWorked,
  };
};

export const isSelectedPeriodValid = (
  vacationStart,
  vacationEnd,
  employeeInfo
) => {
  const hiringDate = dayjs(employeeInfo[0].hiring_date);
  const today = dayjs();
  const yearsWorked = Math.floor(today.diff(hiringDate, "month") / 12);
  const lastHireBirthday = hiringDate.add(yearsWorked, "year");
  const nextHireBirthday = lastHireBirthday.add(1, "year");
  return (
    (vacationStart.isAfter(lastHireBirthday) ||
      vacationStart.isSame(lastHireBirthday)) &&
    (vacationEnd.isBefore(nextHireBirthday) ||
      vacationEnd.isSame(nextHireBirthday))
  );
};

function isBetween(date, dateStart, dateEnd) {
  return date.isAfter(dateStart) && date.isBefore(dateEnd);
}

export function checkOverlaps(filteredVacations, start_date, end_date) {
  return filteredVacations.some((vacation) => {
    const vacationStart = dayjs(vacation.start_date);
    const vacationEnd = dayjs(vacation.end_date);
    return (
      isBetween(dayjs(start_date), vacationStart, vacationEnd) ||
      isBetween(dayjs(end_date), vacationStart, vacationEnd) ||
      (dayjs(start_date).isBefore(vacationStart) &&
        dayjs(end_date).isAfter(vacationEnd))
    );
  });
}
