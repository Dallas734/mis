import { Day } from "../../Day";
import { Doctor } from "../../Doctor";

export interface Schedule {
    id: number;
    day: Day;
    doctor: Doctor;
    beginTime: string;
    endTime: string;
}