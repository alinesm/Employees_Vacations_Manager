import { EmployeeBasicInfoState } from "@/app/types";
import React from "react";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setEmployeeBasicInfo: (value: any) => void;
  employeeBasicInfo: EmployeeBasicInfoState;
};

function AddEmployee({
  handleSubmit,
  setEmployeeBasicInfo,
  employeeBasicInfo,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeBasicInfo((prev: EmployeeBasicInfoState) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="box items-center " onSubmit={handleSubmit}>
      <div className="flex-center  gap-5">
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            value={employeeBasicInfo.name}
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
            value={employeeBasicInfo.role}
            onChange={handleChange}
            placeholder="Employee Role"
            required
          />
        </div>
        <div>
          <label className="label">Hiring Date</label>
          <input
            className="input_hiring_date"
            type="date"
            name="hiring_date"
            value={employeeBasicInfo.hiring_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button className="button w-20 py-1.5 mt-2" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default AddEmployee;
