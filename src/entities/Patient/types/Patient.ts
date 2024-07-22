import { Area } from "../../Area";
import { Gender } from "../../Gender";

export interface Patient {
    id?: number,
    lastName?: string,
    firstName?: string,
    surname?: string,
    fullName?: string,
    gender?: Gender,
    dateOfBirth?: string,
    address?: string,
    area?: Area,
    polis?: string,
    workPlace?: string
}