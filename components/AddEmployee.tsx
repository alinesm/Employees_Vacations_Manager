import React from "react";
import dayjs from "dayjs";

function AddEmployee({ handleSubmit, setEmployeeBasicInfo }) {
  const handleChange = (e) => {
    setEmployeeBasicInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="flex-center  gap-5">
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Employee Name"
            required
          />
        </div>
        <div>
          <label className="label">Role</label>
          <input
            className="input"
            type="text"
            name="role"
            onChange={handleChange}
            placeholder="Employee Role"
            required
          />
        </div>
        <div>
          <label className="label">Hiring Date</label>
          <input
            className="input_date"
            type="date"
            name="hiring_date"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button className="button py-1.5 mt-2" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default AddEmployee;
