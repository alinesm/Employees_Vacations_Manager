"use client";
import React, { useEffect, useState } from "react";
import AddVacationPeriod from "./AddVacationPeriod";
import dayjs from "dayjs";
import {
  EmployeeBasicInfoWithId,
  EmployeeVacationInfoState,
  EmployeeVacationListType,
} from "@/app/types";

type Props = {
  setOpenModal: (value: boolean) => void;
  employeeVacationList: EmployeeVacationListType;
  employeeVacationInfo: EmployeeVacationInfoState;
  setEmployeeVacationInfo: (value: EmployeeVacationInfoState) => void;
  setEmployeeVacationList: (value: EmployeeVacationListType) => void;
  clickedEmployee: EmployeeBasicInfoWithId;
};

function ModalEmployeeVacations({
  setOpenModal,
  employeeVacationList,
  employeeVacationInfo,
  setEmployeeVacationInfo,
  setEmployeeVacationList,
  clickedEmployee,
}: Props) {
  const [inputDateError, setInputDateError] = useState<string>("");
  const [loadingVacationsList, setLoadingVacationsList] =
    useState<boolean>(false);
  const [reloadVacationsList, setReloadVacationsList] =
    useState<boolean>(false);

  const fetchEmployeeVacations = async () => {
    try {
      setReloadVacationsList(false);
      setLoadingVacationsList(true);

      const response = await fetch(
        `/api/vacations/employee/${clickedEmployee.id}`
      );

      if (!response.ok) {
        response.text().then((text) => setInputDateError(text));
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      setLoadingVacationsList(false);
      setEmployeeVacationList(data);
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    fetchEmployeeVacations();
  }, [reloadVacationsList]);

  useEffect(() => {
    fetchEmployeeVacations();
  }, []);

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
          clickedEmployee={clickedEmployee}
          inputDateError={inputDateError}
          setInputDateError={setInputDateError}
          employeeVacationList={employeeVacationList}
          setReloadVacationsList={setReloadVacationsList}
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
          {employeeVacationList?.vacations?.length === 0 && (
            <p className="text-gray-400 font-medium text-center text-xs pt-1">
              No vacations registered
            </p>
          )}

          {loadingVacationsList && <p>Loading...</p>}
          {!loadingVacationsList &&
            employeeVacationList?.vacations?.length > 0 &&
            employeeVacationList?.vacations?.map((vacation, index) => (
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
            ))}
        </div>
      </div>
    </div>
  );
}

export default ModalEmployeeVacations;
