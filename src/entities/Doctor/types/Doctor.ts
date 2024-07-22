import { Area } from "../../Area";
import { Category } from "../../Category";
import { Gender } from "../../Gender";
import { Specialization } from "../../Specialization";
import { Status } from "../../Status";

export interface Doctor {
    id?: number,
    lastName?: string,
    firstName?: string,
    surname?: string,
    fullName?: string,
    dateOfBirth?: string,
    specialization?: Specialization,
    status?: Status,
    area?: Area,
    category?: Category,
    gender?: Gender
}