import { memo, Suspense, useCallback } from "react";
import { AppRoutesProps } from "../../../../shared/types/AppRouter";
import { PageLoader } from "../../../../widgets/PageLoader";
import { Route, Routes } from "react-router-dom";
import { Page } from "../../../../widgets/Page";
import { routeConfig } from "../config/routeConfig";
import { LoginPage } from "../../../../pages/LoginPage";
import { NotFoundPage } from "../../../../pages/NotFoundPage";
import { RegisterPage } from "../../../../pages/RegisterPage";
import { UserApi } from "../../../../entities/User/api/UserApi";

const AppRouter = () => {
    // const {data, isLoading, isFetching} = UserApi.useIsAuthQuery();
    const {data: user} = UserApi.useIsAuthQuery(); 

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={user? element : <></>}
            />
        );
    }, [user]);

    return <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='*' element={<NotFoundPage />}/>
        <Route path='/' element={<Page/>}>
            <Route path='/main' element={<></>}/>
            {Object.values(routeConfig).slice(3).map(renderWithWrapper)}
        </Route>
    </Routes>;
};

export default memo(AppRouter);