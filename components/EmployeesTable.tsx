import React from "react";
import EmployeeRecord from "./EmployeeRecord";
import TableHeader from "./TableHeader";

function EmployeesTable() {
  return (
    <div className="box">
      <TableHeader />
      <EmployeeRecord />
    </div>
  );
}

export default EmployeesTable;
