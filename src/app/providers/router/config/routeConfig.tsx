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
import { DoctorsPage } from '../../../../pages/DoctorsPage';
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
        element: <></>,
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
        element: <></>
    },
    [AppRoutes.ADD_VISIT]: {
        path: getRouteAddVisit(),
        element: <></>
    },
    [AppRoutes.SCHEDULE]: {
        path: getRouteSchedule(),
        element: <></>
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <></>
    }
    // //main и login всегда должны быть первыми!
    // [AppRoutes.PETS]: {
    //     path: getRoutePets(),
    //     element: <PetsPage />
    // },
    // [AppRoutes.OWNERS]: {
    //     path: getRouteOwners(),
    //     element: <OwnersPage/>
    // },
    // [AppRoutes.VETERINARIANS]: {
    //     path: getRouteVeterinarians(),
    //     element: <VeterinariansPage />
    // },
    // [AppRoutes.SPECIALITIES]: {
    //     path: getRouteSpecialities(),
    //     element: <SpecialitiesPage />
    // },
    // [AppRoutes.PET_TYPES]: {
    //     path: getRoutePetTypes(),
    //     element: <PetTypesPage />
    // },
    // [AppRoutes.USERS]: {
    //     path: getRouteUsers(),
    //     element: <UsersPage />
    // },
    // [AppRoutes.VISIT]: {
    //     path: getRouteVisit(),
    //     element: <VisitPage />
    // },

    // //эта странца всегда должна быть последней!
    // [AppRoutes.NOT_FOUND]: {
    //     path: '*',
    //     element: <NotFoundPage />,
    // },
};
