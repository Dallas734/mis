import { Patient } from "../../Patient";
import { Diagnosis } from "../../Diagnosis";
import { Procedure } from "../../Procedure";
import { Doctor } from "../../Doctor";
import { VisitStatus } from "../../VisitStatus";

export interface Visit {
    id: number,
    patient: Patient,
    diagnosis: Diagnosis,
    recipe: string,
    procedure: Procedure,
    dateT: string,
    timeT: string,
    doctor: Doctor,
    visitStatus: VisitStatus
}