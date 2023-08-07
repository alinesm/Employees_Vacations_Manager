export type EmployeeBasicInfoState = {
  name: string;
  role: string;
  hiring_date: string;
};

export type EmployeeVacationInfoState = {
  start_date: string;
  end_date: string;
  duration: number;
  ref_year: number;
};

export type EmployeeBasicInfoWithId = {
  id: string | number;
  name: string;
  role: string;
  hiring_date: string;
};

export type EmployeeVacationListType = {
  availableQtyDays: number;
  monthsWorked: number;
  vacations: EmployeeVacationInfoState[];
};
