import React from "react";
import EmployeeRecord from "./EmployeeRecord";
import TableHeader from "./TableHeader";

function EmployeesTable({ handleOpenModal, employeesList }) {
  return (
    <div className="box">
      <TableHeader />
      {employeesList.map((info) => (
        <EmployeeRecord
          info={info}
          key={info.name}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </div>
  );
}

export default EmployeesTable;
