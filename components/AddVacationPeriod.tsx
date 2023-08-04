import React from "react";

function AddVacationPeriod() {
  return (
    <form className="flex   flex-col bg-gray-100  border-y">
      <div className="px-8 py-4">
        <div className="flex gap-7 items-center ">
          <div className="flex flex-col">
            <label className="label">Start Date</label>
            <input className="input_date h-8" type="date" required />
          </div>
          <div className="flex flex-col">
            <label className="label">End Date</label>
            <div className="flex ">
              <input className="input_date h-8" type="date" required />
              <button className="button ml-8 px-4 h-8" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
        <p className="text-red-500 text-xs pt-1">
          vacations is not allowed for this employee
        </p>
      </div>
    </form>
  );
}

export default AddVacationPeriod;
