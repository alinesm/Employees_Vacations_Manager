import React from "react";
import dayjs from "dayjs";

function AddEmployee() {
  return (
    <form className="mb-10 border-2 items-center w-fit flex flex-col bg-white rounded-lg shadow-md px-4 py-6 ">
      <div className="flex-center  gap-5">
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Employee Name"
            required
          />
        </div>
        <div>
          <label className="label">Role</label>
          <input
            className="input"
            type="text"
            placeholder="Employee Role"
            required
          />
        </div>
        <div>
          <label className="label">Hiring Date</label>
          <input
            className="input"
            type="date"
            defaultValue={dayjs().format("YYYY-MM-DD")}
            required
          />
        </div>
      </div>
      <button className="button" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default AddEmployee;
