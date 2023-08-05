"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

function AddVacationPeriod({
  employeeVacationInfo,
  setEmployeeVacationInfo,
  setEmployeeVacationList,
  clickedEmployee,
}) {
  const [inputDateError, setInputDateError] = useState("");

  function handleChange(e) {
    setEmployeeVacationInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmitVacation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const startDate = dayjs(employeeVacationInfo.start_date);
    const endDate = dayjs(employeeVacationInfo.end_date);

    if (endDate.isBefore(startDate)) {
      setInputDateError("The end date must be after the start date");
      return;
    }

    const duration = endDate.diff(startDate, "day");

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
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      setEmployeeVacationList((prev) => [...prev, newVacation]);
      console.log("data", data);
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
              className="input_date h-8"
              type="date"
              name="start_date"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="label">End Date</label>
            <div className="flex ">
              <input
                className="input_date h-8"
                type="date"
                name="end_date"
                onChange={handleChange}
                required
              />
              <button className="button ml-8 px-4 h-8" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
        <p className="text-red-500 text-xs pt-1">{inputDateError}</p>
      </div>
    </form>
  );
}

export default AddVacationPeriod;
