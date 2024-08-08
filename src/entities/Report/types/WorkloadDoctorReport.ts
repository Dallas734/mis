import { Doctor } from "../../Doctor";

export interface WorkloadDoctorReport {
    doctor: Doctor,
    workload: number,
    name: string
}