import React from "react";
import EmployeeRecord from "./EmployeeRecord";
import TableHeader from "./TableHeader";
import { ClickedEmployeeType } from "@/app/types";

type Props = {
  handleOpenModal: (employeeClicked: ClickedEmployeeType) => void;
  employeesList: ClickedEmployeeType[];
};

function EmployeesTable({ handleOpenModal, employeesList }: Props) {
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
