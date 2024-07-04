import { memo, Suspense, useCallback, useContext } from "react";
import { AppRoutesProps } from "../../../../shared/types/AppRouter";
import { PageLoader } from "../../../../widgets/PageLoader";
import { Route, Routes } from "react-router-dom";
import { Page } from "../../../../widgets/Page";
import { routeConfig } from "../config/routeConfig";
import { LoginPage } from "../../../../pages/LoginPage";
import { NotFoundPage } from "../../../../pages/NotFoundPage";
import { AuthContext } from "../../../../shared/context/IsAuthContext";

const AppRouter = () => {
    // const {data, isLoading, isFetching} = UserApi.useIsAuthQuery();
    const { isAuth } = useContext(AuthContext)

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={isAuth? element : <></>}
            />
        );
    }, [isAuth]);

    return <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path='*' element={<NotFoundPage />}/>
        <Route path='/' element={<Page/>}>
            <Route path='/main' element={<></>}/>
            {Object.values(routeConfig).slice(2).map(renderWithWrapper)}
        </Route>
    </Routes>;
};

export default memo(AppRouter);