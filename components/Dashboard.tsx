"use client";
import AddEmployee from "./AddEmployee";
import EmployeesTable from "./EmployeesTable";
import ModalEmployeeVacations from "./ModalEmployeeVacations";
import React, { useEffect, useState } from "react";

const employeesDataMock = [
  {
    id: 1,
    name: "João",
    role: "Desenvolvedor",
    hiring_date: "2021-01-01",
  },
  {
    id: 2,
    name: "Maria",
    role: "Desenvolvedora",
    hiring_date: "2021-01-01",
  },
];

const vacationsMock = [
  {
    id: 1,
    employeeId: 1,
    vacations: [
      {
        startVacationDate: "2022-01-01",
        endVacationDate: "2022-01-15",
        duration: 15,
        refYear: 1,
      },
      {
        startVacationDate: "2022-01-16",
        endVacationDate: "2022-01-31",
        duration: 15,
        refYear: 1,
      },
      {
        startVacationDate: "2023-01-01",
        endVacationDate: "2023-01-10",
        duration: 10,
        refYear: 2,
      },
      {
        startVacationDate: "2023-01-11",
        endVacationDate: "2023-01-31",
        duration: 20,
        refYear: 2,
      },
    ],
  },
  {
    id: 2,
    employeeId: 2,
    vacations: [
      {
        startVacationDate: "2022-01-01",
        endVacationDate: "2022-01-05",
        duration: 5,
        refYear: 1,
      },
      {
        startVacationDate: "2022-01-06",
        endVacationDate: "2022-01-11",
        duration: 5,
        refYear: 1,
      },
      {
        startVacationDate: "2022-01-12",
        endVacationDate: "2022-01-22",
        duration: 10,
        refYear: 1,
      },
      {
        startVacationDate: "2023-01-01",
        endVacationDate: "2023-01-11",
        duration: 10,
        refYear: 2,
      },
      {
        startVacationDate: "2023-01-12",
        endVacationDate: "2023-01-17",
        duration: 5,
        refYear: 2,
      },
      {
        startVacationDate: "2023-01-18",
        endVacationDate: "2023-01-23",
        duration: 5,
        refYear: 2,
      },
    ],
  },
];

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
    startVacationDate: "",
    endVacationDate: "",
    duration: "",
    refYear: "",
  });

  function handleOpenModal(employeeData) {
    setOpenModal(true);

    const filterEmployeeVacations = vacationsMock.filter(
      (vacation) => vacation.employeeId === employeeData.id
    );
    setClickedEmployee(employeeData);

    setEmployeeVacationList(filterEmployeeVacations);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeBasicInfo),
    });
    const data = await response.json();
    console.log("data", data);

    setEmployeesList((prev) => [...prev, data]);
  }

  async function fetchEmployees() {
    try {
      const response = await fetch("/api/employees");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEmployeesList(data);
      console.log("data", data);
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  console.log("employees", employeesList);

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
