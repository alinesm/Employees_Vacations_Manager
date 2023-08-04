import React from "react";
import EmployeeRecord from "./EmployeeRecord";
import TableHeader from "./TableHeader";

function EmployeesTable({ handleOpenModal }) {
  return (
    <div className="box">
      <TableHeader />
      <EmployeeRecord handleOpenModal={handleOpenModal} />
    </div>
  );
}

export default EmployeesTable;
