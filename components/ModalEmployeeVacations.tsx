"use client";
import React from "react";
import AddVacationPeriod from "./AddVacationPeriod";

function ModalEmployeeVacations({
  setOpenModal,
  employeeVacationList,
  employeeVacationInfo,
  setEmployeeVacationInfo,
  setEmployeeVacationList,
  clickedEmployee,
}) {
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
          clickedEmployee={clickedEmployee}
        />
        <h1 className="text-[#484dff] mb-2 mt-4 px-8 tracking-widest uppercase font-semibold text-sm">
          Jonh Vacation's List
        </h1>
        <div className="px-8 mt-3">
          <div className="grid grid-cols-6 gap-3 border-b-2 pb-2 label ">
            <p className="col-span-2">Start Date</p>
            <p className="col-span-2">End Date</p>
            <p className="col-span-1">Duration</p>
            <p className="col-span-1">Ref Year</p>
          </div>

          {employeeVacationList?.map((vacationInfo) => (
            <div className="">
              {vacationInfo?.vacations?.map((vacation, index) => (
                <div className="record grid grid-cols-6 gap-3" key={index}>
                  <p className="col-span-2">{vacation.startVacationDate}</p>
                  <p className="col-span-2">{vacation.endVacationDate}</p>
                  <p className="col-span-1">{vacation.duration}</p>
                  <p className="col-span-1">{vacation.refYear}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalEmployeeVacations;
