"use client";
import {
  EmployeeBasicInfoWithId,
  EmployeeBasicInfoState,
  EmployeeVacationInfoState,
  EmployeeVacationListType,
} from "@/app/types";
import AddEmployee from "./AddEmployee";
import EmployeesTable from "./EmployeesTable";
import ModalEmployeeVacations from "./ModalEmployeeVacations";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [employeeBasicInfo, setEmployeeBasicInfo] =
    useState<EmployeeBasicInfoState>({
      name: "",
      role: "",
      hiring_date: "",
    });
  const [loadingEmployeeList, setLoadingEmployeeList] =
    useState<boolean>(false);
  const [reloadEmployeeList, setReloadEmployeeList] = useState<boolean>(false);
  const [employeesList, setEmployeesList] = useState<EmployeeBasicInfoWithId[]>(
    []
  );
  const [clickedEmployee, setClickedEmployee] =
    useState<EmployeeBasicInfoWithId>({
      id: "",
      name: "",
      role: "",
      hiring_date: "",
    });
  const [employeeVacationList, setEmployeeVacationList] =
    useState<EmployeeVacationListType>({
      availableQtyDays: 0,
      monthsWorked: 0,
      vacations: [],
    });
  const [employeeVacationInfo, setEmployeeVacationInfo] =
    useState<EmployeeVacationInfoState>({
      start_date: "",
      end_date: "",
      duration: 0,
      ref_year: 0,
    });

  function handleOpenModal(employeeClicked: EmployeeBasicInfoWithId) {
    setOpenModal(true);
    setClickedEmployee(employeeClicked);
  }

  async function handleCreateEmployee(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeBasicInfo),
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();
      setReloadEmployeeList(true);
      setEmployeeBasicInfo({
        name: "",
        role: "",
        hiring_date: "",
      });
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }

  async function fetchEmployees() {
    try {
      setLoadingEmployeeList(true);
      setReloadEmployeeList(false);

      const response = await fetch("/api/employees");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setEmployeesList(data);
      setLoadingEmployeeList(false);

      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  }

  useEffect(() => {
    if (reloadEmployeeList) {
      fetchEmployees();
    }
  }, [reloadEmployeeList]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <p className="title">Register Employee</p>
      <AddEmployee
        handleSubmit={handleCreateEmployee}
        setEmployeeBasicInfo={setEmployeeBasicInfo}
        employeeBasicInfo={employeeBasicInfo}
      />

      <p className="title">Employees List</p>
      {loadingEmployeeList && <p>Loading...</p>}
      {!loadingEmployeeList && employeesList.length > 0 && (
        <EmployeesTable
          handleOpenModal={handleOpenModal}
          employeesList={employeesList}
        />
      )}

      {openModal && (
        <ModalEmployeeVacations
          setOpenModal={setOpenModal}
          employeeVacationList={employeeVacationList}
          setEmployeeVacationList={setEmployeeVacationList}
          employeeVacationInfo={employeeVacationInfo}
          setEmployeeVacationInfo={setEmployeeVacationInfo}
          clickedEmployee={clickedEmployee}
        />
      )}
    </div>
  );
}

export default Dashboard;
