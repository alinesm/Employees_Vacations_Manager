"use client";
import AddEmployee from "./AddEmployee";
import EmployeesTable from "./EmployeesTable";
import ModalEmployeeVacations from "./ModalEmployeeVacations";
import React, { useState } from "react";

const employeesDataMock = [
  {
    id: 1,
    name: "João",
    role: "Desenvolvedor",
    hiringDate: "2021-01-01",
  },
  {
    id: 2,
    name: "Maria",
    role: "Desenvolvedora",
    hiringDate: "2021-01-01",
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
        currentYear: 1,
      },
      {
        startVacationDate: "2022-01-16",
        endVacationDate: "2022-01-31",
        duration: 15,
        currentYear: 1,
      },
      {
        startVacationDate: "2023-01-01",
        endVacationDate: "2023-01-10",
        duration: 10,
        currentYear: 2,
      },
      {
        startVacationDate: "2023-01-11",
        endVacationDate: "2023-01-31",
        duration: 20,
        currentYear: 2,
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
        currentYear: 1,
      },
      {
        startVacationDate: "2022-01-06",
        endVacationDate: "2022-01-11",
        duration: 5,
        currentYear: 1,
      },
      {
        startVacationDate: "2022-01-12",
        endVacationDate: "2022-01-22",
        duration: 10,
        currentYear: 1,
      },
      {
        startVacationDate: "2023-01-01",
        endVacationDate: "2023-01-11",
        duration: 10,
        currentYear: 2,
      },
      {
        startVacationDate: "2023-01-12",
        endVacationDate: "2023-01-17",
        duration: 5,
        currentYear: 2,
      },
      {
        startVacationDate: "2023-01-18",
        endVacationDate: "2023-01-23",
        duration: 5,
        currentYear: 2,
      },
    ],
  },
];

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <div>
      <p className="title">Register Employee</p>
      <AddEmployee />

      <p className="title">Employees List</p>
      <EmployeesTable handleOpenModal={handleOpenModal} />
      {openModal && <ModalEmployeeVacations setOpenModal={setOpenModal} />}
    </div>
  );
}

export default Dashboard;
