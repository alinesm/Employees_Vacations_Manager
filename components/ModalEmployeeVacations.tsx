"use client";
import React, { useEffect, useState } from "react";
import AddVacationPeriod from "./AddVacationPeriod";
import dayjs from "dayjs";

function ModalEmployeeVacations({
  setOpenModal,
  employeeVacationList,
  employeeVacationInfo,
  setEmployeeVacationInfo,
  setEmployeeVacationList,
  clickedEmployee,
}) {
  const [inputDateError, setInputDateError] = useState("");

  const fetchEmployeeVacations = async () => {
    try {
      const response = await fetch(
        `/api/vacations/employee/${clickedEmployee.id}`
      );
      if (!response.ok) {
        setEmployeeVacationList([]);
        setInputDateError("Employee has not worked for 12 months yet");

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data vacation list", data);
      setEmployeeVacationList(data);
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    fetchEmployeeVacations();
  }, [setOpenModal]);

  console.log("employeeVacationList", employeeVacationList);
  return (
    <div className="bg-modal">
      <div className="modal-container pb-10">
        <button
          className="absolute top-0 right-0 p-2 text-lg font-bold text-gray-500 hover:text-white hover:bg-gray-400"
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
        <h1 className="text-[#484dff] mb-2 mt-4 px-8 tracking-widest uppercase font-semibold text-sm">
          ADD Vacation
        </h1>
        <AddVacationPeriod
          employeeVacationInfo={employeeVacationInfo}
          setEmployeeVacationInfo={setEmployeeVacationInfo}
          setEmployeeVacationList={setEmployeeVacationList}
          // daysAvailable={employeeVacationList?.availableQtyDays}
          clickedEmployee={clickedEmployee}
          inputDateError={inputDateError}
          setInputDateError={setInputDateError}
        />
        <h1 className="text-[#484dff] mb-2 mt-4 px-8 tracking-widest uppercase font-semibold text-sm">
          {clickedEmployee.name} Vacation's List
        </h1>
        <div className="px-8 mt-3">
          <div className="grid grid-cols-6 gap-3 border-b-2 pb-2 label ">
            <p className="col-span-2">Start Date</p>
            <p className="col-span-2">End Date</p>
            <p className="col-span-1">Duration</p>
            <p className="col-span-1">Ref Year</p>
          </div>

          {employeeVacationList.length > 0 ? (
            employeeVacationList?.map((vacation, index) => (
              <div className="record grid grid-cols-6 gap-3" key={index}>
                <p className="col-span-2">
                  {dayjs(vacation.start_date).format("YYYY-MM-DD")}
                </p>
                <p className="col-span-2">
                  {dayjs(vacation.end_date).format("YYYY-MM-DD")}
                </p>
                <p className="col-span-1">{vacation.duration}</p>
                <p className="col-span-1">{vacation.ref_year}</p>
              </div>
            ))
          ) : (
            <p>No vacations registered yet</p>
          )}

          {/* {employeeVacationList?.vacations?.map((vacation, index) => ( */}
        </div>
      </div>
    </div>
  );
}

export default ModalEmployeeVacations;
