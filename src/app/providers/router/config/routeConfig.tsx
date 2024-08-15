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
import { ROLES } from '../../../../shared/types/constants';

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
        element: <></>,
        roles: [ROLES.REGISTRATOR, ROLES.DOCTOR]
    },
    [AppRoutes.DOCTORS]: {
        path: getRouteDoctors(),
        element: <DoctorsPage />,
        roles: [ROLES.REGISTRATOR]
    },
    [AppRoutes.PATIENTS]: {
        path: getRoutePatients(),
        element: <PatientsPage />,
        roles: [ROLES.REGISTRATOR]
    },
    [AppRoutes.ADD_VISIT]: {
        path: getRouteAddVisit(),
        element: <AddVisitsPage  />,
        roles: [ROLES.REGISTRATOR]
    },
    [AppRoutes.SCHEDULE]: {
        path: getRouteSchedule(),
        element: <SchedulePage />,
        roles: [ROLES.REGISTRATOR]
    },
    [AppRoutes.PATIENT_CARD]: {
        path: getRoutePatientCard(),
        element: <PatientCardPage />,
        roles: [ROLES.DOCTOR]
    },
    [AppRoutes.DOCTOR_TALONS]: {
        path: getRouteDoctorTalons(),
        element: <DoctorTalonsPage />,
        roles: [ROLES.DOCTOR]
    },
    [AppRoutes.WORKLOAD_AREA_REPORT]: {
        path: getRouteWorkloadAreaReport(),
        element: <WorkloadAreaReportPage />,
        roles: [ROLES.REGISTRATOR]
    },
    [AppRoutes.WORKLOAD_DOCTOR_REPORT]: {
        path: getRouteworkloadDoctorReport(),
        element: <WorkloadDoctorReportPage />,
        roles: [ROLES.REGISTRATOR]
    },
    [AppRoutes.WORKLOAD_DIAGNOSIS_REPORT]: {
        path: getRouteWorkloadDiagnosisReport(),
        element: <WorkloadDiagnosisReportPage />,
        roles: [ROLES.DOCTOR]
    }
};
