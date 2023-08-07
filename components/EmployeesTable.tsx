import React from "react";
import EmployeeRecord from "./EmployeeRecord";
import TableHeader from "./TableHeader";
import { EmployeeBasicInfoWithId } from "@/app/types";

type Props = {
  handleOpenModal: (employeeClicked: EmployeeBasicInfoWithId) => void;
  employeesList: EmployeeBasicInfoWithId[];
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
