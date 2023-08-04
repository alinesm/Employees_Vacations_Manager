import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

function EmployeeRecord({ handleOpenModal }) {
  return (
    <>
      <div className="gridTable  record ">
        <p className="col-span-1">1</p>
        <p className="col-span-3">João Almeida Melo</p>
        <p className="col-span-4">Desenvolvedor Web</p>
        <p className="col-span-3">2021-01-01</p>
        <div className="col-span-1 cursor-pointer" onClick={handleOpenModal}>
          <FaRegFileAlt size={20} />
        </div>
      </div>
      <div className="gridTable record ">
        <p className="col-span-1">1</p>
        <p className="col-span-3">João Almeida Melo</p>
        <p className="col-span-4">Desenvolvedor Web</p>
        <p className="col-span-3">2021-01-01</p>
        <div className="col-span-1">
          <FaRegFileAlt size={20} />
        </div>
      </div>
      <div className="gridTable  record ">
        <p className="col-span-1">1</p>
        <p className="col-span-3">João Almeida Melo</p>
        <p className="col-span-4">Desenvolvedor Web</p>
        <p className="col-span-3">2021-01-01</p>
        <div className="col-span-1">
          <FaRegFileAlt size={20} />
        </div>
      </div>
    </>
  );
}

export default EmployeeRecord;
