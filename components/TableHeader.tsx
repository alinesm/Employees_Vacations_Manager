import React from "react";

function TableHeader() {
  return (
    <div className="gridTable border-b-2 pb-2 label">
      <p className="col-span-1">ID</p>
      <p className="col-span-3">Name</p>
      <p className="col-span-4">Role</p>
      <p className="col-span-3 ">Hiring Date</p>
      <p className=" col-span-1 text-white">Details</p>
    </div>
  );
}

export default TableHeader;
