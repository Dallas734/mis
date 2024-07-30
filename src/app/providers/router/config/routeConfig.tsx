// import { LoginPage } from '@/pages/LoginPage';
// import { MainPage } from '@/pages/MainPage';
// import { NotFoundPage } from '@/pages/NotFoundPage';
// import { OwnersPage } from '@/pages/OwnerPage';
// import PetsPage from '@/pages/PetPage/ui/PetsPage';
// import { PetTypesPage } from '@/pages/PetTypesPage';
// import { SpecialitiesPage } from '@/pages/SpecialitiesPage';
// import { UsersPage } from '@/pages/UsersPage';
// import { VeterinariansPage } from '@/pages/VeterinariansPage';
// import { VisitPage } from '@/pages/VisitPage';
import { AddVisitsPage } from '../../../../pages/AddVisitsPage';
import { DoctorsPage } from '../../../../pages/DoctorsPage';
import { LoginPage } from '../../../../pages/LoginPage';
import { PatientsPage } from '../../../../pages/PatientsPage';
import { SchedulePage } from '../../../../pages/ScheduldePage';
import {
    AppRoutes,
    getRouteLogin,
    getRouteDoctors,
    getRoutePatients,
    getRouteAddVisit,
    getRouteSchedule,
    getRouteMain
} from '../../../../shared/const/router';
import { AppRoutesProps } from '../../../../shared/types/AppRouter';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
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
        element: <AddVisitsPage />
    },
    [AppRoutes.SCHEDULE]: {
        path: getRouteSchedule(),
        element: <SchedulePage />
    }
};
