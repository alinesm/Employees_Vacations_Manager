import db from "@/utils/db";

async function getEmployeeInfo(id) {
  const [employeeInfo, fields] = await db.query(
    "SELECT hiring_date FROM employees WHERE id = ?",
    [id]
  );
  return employeeInfo;
}

async function getVacations(id) {
  const [vacations, fields] = await db.query(
    "SELECT * FROM vacations WHERE employee_id = ?",
    [id]
  );
  return vacations;
}

async function createVacation(
  employee_id,
  start_date,
  end_date,
  duration,
  ref_year
) {
  const [rows, fields3] = await db.query(
    "INSERT INTO vacations (employee_id, start_date, end_date, duration, ref_year) VALUES (?, ?, ?, ?, ?)",
    [employee_id, start_date, end_date, duration, ref_year]
  );
  return rows;
}

const repository = {
  getEmployeeInfo,
  createVacation,
  getVacations,
};

export default repository;
