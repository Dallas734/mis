export enum AppRoutes {
  LOGIN = "login",
  REGISTER = "register",
  MAIN = "main",
  DOCTORS = "doctors",
  SCHEDULE = "schedule",
  PATIENTS = "patients",
  ADD_VISIT = "add_visit",
  PATIENT_CARD = "patientCard",
  DOCTOR_TALONS = "doctorTalons",
  WORKLOAD_AREA_REPORT = "workloadAreaReport",
  WORKLOAD_DOCTOR_REPORT = "workloadDoctorReport",
  WORKLOAD_DIAGNOSIS_REPORT = "workloadDiagnosisReport"
}

export const getRouteLogin = () => "/login";
export const getRouteRegister = () => "/register";
export const getRouteMain = () => "/main";
export const getRouteDoctors = () => "/doctors";
export const getRouteSchedule = () => "/schedule";
export const getRoutePatients = () => "/patients";
export const getRouteAddVisit = () => "/add_visit";
export const getRoutePatientCard = () => "/patientCard";
export const getRouteDoctorTalons = () => "/doctorTalons";
export const getRouteWorkloadAreaReport = () => "/workloadAreaReport";
export const getRouteworkloadDoctorReport  = () => "/workloadDoctorReport";
export const getRouteWorkloadDiagnosisReport = () => "/workloadDiagnosisReport"
