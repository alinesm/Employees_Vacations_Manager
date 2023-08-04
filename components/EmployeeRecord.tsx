import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

function EmployeeRecord({ handleOpenModal, info }) {
  return (
    <div className="gridTable  record ">
      <p className="col-span-1">{info.id}</p>
      <p className="col-span-3">{info.name}</p>
      <p className="col-span-4">{info.role}</p>
      <p className="col-span-3">{info.hiringDate}</p>
      <div className="col-span-1 cursor-pointer" onClick={handleOpenModal}>
        <FaRegFileAlt size={20} />
      </div>
    </div>
  );
}

export default EmployeeRecord;
