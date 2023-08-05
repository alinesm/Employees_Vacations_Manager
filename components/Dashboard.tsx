"use client";
import AddEmployee from "./AddEmployee";
import EmployeesTable from "./EmployeesTable";
import ModalEmployeeVacations from "./ModalEmployeeVacations";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [employeeBasicInfo, setEmployeeBasicInfo] = useState({
    name: "",
    role: "",
    hiring_date: "",
  });
  const [employeesList, setEmployeesList] = useState([]);
  const [clickedEmployee, setClickedEmployee] = useState({});
  const [employeeVacationList, setEmployeeVacationList] = useState([]);
  const [employeeVacationInfo, setEmployeeVacationInfo] = useState({
    start_date: "",
    end_date: "",
    duration: "",
    ref_year: "",
  });

  function handleOpenModal(employeeClicked) {
    setOpenModal(true);
    setClickedEmployee(employeeClicked);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      // setEmployeesList((prev) => [...prev, employeeBasicInfo]);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }

  async function fetchEmployees() {
    try {
      const response = await fetch("/api/employees");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEmployeesList(data);
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <p className="title">Register Employee</p>
      <AddEmployee
        handleSubmit={handleSubmit}
        setEmployeeBasicInfo={setEmployeeBasicInfo}
      />

      <p className="title">Employees List</p>
      <EmployeesTable
        handleOpenModal={handleOpenModal}
        employeesList={employeesList}
      />

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
