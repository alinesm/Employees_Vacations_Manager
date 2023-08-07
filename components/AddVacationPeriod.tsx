"use client";
import {
  ClickedEmployeeType,
  EmployeeVacationInfoState,
  EmployeeVacationListType,
} from "@/app/types";
import dayjs from "dayjs";
import React from "react";

type Props = {
  employeeVacationInfo: EmployeeVacationInfoState;
  setEmployeeVacationInfo: (value: EmployeeVacationInfoState) => void;
  clickedEmployee: ClickedEmployeeType;
  inputDateError: string;
  setInputDateError: (value: string) => void;
  employeeVacationList: EmployeeVacationListType;
  setReloadVacationsList: (value: boolean) => void;
};

function AddVacationPeriod({
  employeeVacationInfo,
  setEmployeeVacationInfo,
  clickedEmployee,
  inputDateError,
  setInputDateError,
  employeeVacationList,
  setReloadVacationsList,
}: Props) {
  const disableInputs =
    employeeVacationList.monthsWorked < 12 ||
    employeeVacationList.availableQtyDays < 1;

  if (employeeVacationList.monthsWorked < 12) {
    setInputDateError("You must work at least 12 months to take vacations");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value =
      e.target.name === "duration" || e.target.name === "ref_year"
        ? parseInt(e.target.value, 10)
        : e.target.value;

    setEmployeeVacationInfo({
      ...employeeVacationInfo,
      [e.target.name]: value,
    });
  }

  async function handleSubmitVacation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const startDate = dayjs(employeeVacationInfo.start_date);
    const endDate = dayjs(employeeVacationInfo.end_date);

    if (endDate.isBefore(startDate)) {
      setInputDateError("The end date must be after the start date");
      return;
    }

    const duration = endDate.diff(startDate, "day") + 1;

    if (duration < 5) {
      setInputDateError("The minimum duration of a vacation is 5 days");
      return;
    }

    if (duration > 30) {
      setInputDateError("The maximum duration of a vacation is 30 days");
      return;
    }

    const today = dayjs();

    const hiring_date = dayjs(clickedEmployee.hiring_date);
    const refYear = today.diff(hiring_date, "year");

    const newVacation = {
      ...employeeVacationInfo,
      duration,
      ref_year: refYear,
    };

    try {
      const response = await fetch("/api/vacations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newVacation,
          employee_id: clickedEmployee.id,
        }),
      });

      if (!response.ok) {
        response.text().then((text) => setInputDateError(text));
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      setReloadVacationsList(true);
      setEmployeeVacationInfo({
        start_date: "",
        end_date: "",
        duration: 0,
        ref_year: 0,
      });

      return data;
    } catch (error) {
      console.error("Failed to fetch vacations:", error);
    }
  }

  return (
    <form
      className="flex flex-col bg-gray-100  border-y"
      onSubmit={handleSubmitVacation}
    >
      <div className="px-8 py-4">
        <div className="flex gap-7 items-center ">
          <div className="flex flex-col">
            <label className="label">Start Date</label>
            <input
              className={
                disableInputs ? "input_disabled h-8" : "input_date h-8"
              }
              type="date"
              name="start_date"
              onChange={handleChange}
              disabled={disableInputs}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="label">End Date</label>
            <div className="flex ">
              <input
                className={
                  disableInputs ? "input_disabled h-8" : "input_date h-8"
                }
                type="date"
                name="end_date"
                onChange={handleChange}
                disabled={disableInputs}
                required
              />
              <button
                className={
                  disableInputs
                    ? " button_disabled ml-8 px-4 h-8"
                    : "button ml-8 px-4 h-8"
                }
                type="submit"
                disabled={disableInputs}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {employeeVacationList.availableQtyDays > 0 ? (
          <p className="text-gray-500 text-xs pt-1">
            Days available: {employeeVacationList.availableQtyDays}
          </p>
        ) : (
          <p className="text-red-500 text-xs pt-1">No days left</p>
        )}

        <p className="text-red-500 text-xs pt-1">{inputDateError}</p>
      </div>
    </form>
  );
}

export default AddVacationPeriod;
