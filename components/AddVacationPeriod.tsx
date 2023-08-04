import dayjs from "dayjs";
import React from "react";

function AddVacationPeriod({
  employeeVacationInfo,
  setEmployeeVacationInfo,
  setEmployeeVacationList,
  clickedEmployee,
}) {
  function handleChange(e) {
    setEmployeeVacationInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmitVacation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const startDate = dayjs(employeeVacationInfo.startVacationDate);
    const endDate = dayjs(employeeVacationInfo.endVacationDate);

    const duration = endDate.diff(startDate, "day");

    const today = dayjs();

    const hiringDate = dayjs(clickedEmployee.hiringDate);
    const refYear = today.diff(hiringDate, "year");

    const newVacation = {
      ...employeeVacationInfo,
      duration,
      refYear,
    };

    setEmployeeVacationList((prevState) => {
      return prevState.map((employee) => {
        if (employee.id === clickedEmployee.id) {
          return {
            ...employee,
            vacations: [...employee.vacations, newVacation],
          };
        }
        return employee;
      });
    });
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
              name="startVacationDate"
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
                name="endVacationDate"
                onChange={handleChange}
                required
              />
              <button className="button ml-8 px-4 h-8" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
        <p className="text-red-500 text-xs pt-1">
          vacations is not allowed for this employee
        </p>
      </div>
    </form>
  );
}

export default AddVacationPeriod;
