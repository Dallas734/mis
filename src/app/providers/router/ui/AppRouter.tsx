import { memo, Suspense, useCallback } from "react";
import { AppRoutesProps } from "../../../../shared/types/AppRouter";
import { PageLoader } from "../../../../widgets/PageLoader";
import { Route, Routes } from "react-router-dom";
import { Page } from "../../../../widgets/Page";
import { routeConfig } from "../config/routeConfig";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return <Routes>
        <Route index path='/login' element={<div>Привет</div>}/>
        <Route path='/' element={<Page/>}>
            {/* <Route index element={<MainPage/>}/> */}
            {Object.values(routeConfig).slice(1).map(renderWithWrapper)}
        </Route>
    </Routes>;
};

export default memo(AppRouter);