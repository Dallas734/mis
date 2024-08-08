import { AddVisitsPage } from '../../../../pages/AddVisitsPage';
import { DoctorsPage } from '../../../../pages/DoctorsPage';
import { DoctorTalonsPage } from '../../../../pages/DoctorTalonsPage';
import { LoginPage } from '../../../../pages/LoginPage';
import { PatientCardPage } from '../../../../pages/PatientCardPage';
import { PatientsPage } from '../../../../pages/PatientsPage';
import { RegisterPage } from '../../../../pages/RegisterPage';
import { SchedulePage } from '../../../../pages/ScheduldePage';
import WorkloadAreaReportPage from '../../../../pages/WorkloadAreaReportPage';
import { WorkloadDiagnosisReportPage } from '../../../../pages/WorkloadDiagnosisReportPage';
import { WorkloadDoctorReportPage } from '../../../../pages/WorkloadDoctorReportPage';
import {
    AppRoutes,
    getRouteLogin,
    getRouteRegister,
    getRouteDoctors,
    getRoutePatients,
    getRouteAddVisit,
    getRouteSchedule,
    getRouteMain,
    getRoutePatientCard,
    getRouteDoctorTalons,
    getRouteWorkloadAreaReport,
    getRouteworkloadDoctorReport,
    getRouteWorkloadDiagnosisReport
} from '../../../../shared/const/router';
import { AppRoutesProps } from '../../../../shared/types/AppRouter';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.REGISTER]: {
        path: getRouteRegister(),
        element: <RegisterPage />
    },
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <></>
    },
    [AppRoutes.DOCTORS]: {
        path: getRouteDoctors(),
        element: <DoctorsPage />
    },
    [AppRoutes.PATIENTS]: {
        path: getRoutePatients(),
        element: <PatientsPage />
    },
    [AppRoutes.ADD_VISIT]: {
        path: getRouteAddVisit(),
        element: <AddVisitsPage  />
    },
    [AppRoutes.SCHEDULE]: {
        path: getRouteSchedule(),
        element: <SchedulePage />
    },
    [AppRoutes.PATIENT_CARD]: {
        path: getRoutePatientCard(),
        element: <PatientCardPage />
    },
    [AppRoutes.DOCTOR_TALONS]: {
        path: getRouteDoctorTalons(),
        element: <DoctorTalonsPage />
    },
    [AppRoutes.WORKLOAD_AREA_REPORT]: {
        path: getRouteWorkloadAreaReport(),
        element: <WorkloadAreaReportPage />
    },
    [AppRoutes.WORKLOAD_DOCTOR_REPORT]: {
        path: getRouteworkloadDoctorReport(),
        element: <WorkloadDoctorReportPage />
    },
    [AppRoutes.WORKLOAD_DIAGNOSIS_REPORT]: {
        path: getRouteWorkloadDiagnosisReport(),
        element: <WorkloadDiagnosisReportPage />
    }
};
