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
import { ROLES } from "../../../../shared/types/constants";

const AppRouter = () => {
  const { data: user } = UserApi.useIsAuthQuery();

  const containsOneRole = (
    routeRoles: ROLES[] | undefined,
    userRoles: string[] | undefined
  ): boolean => {
    for (let i = 0; i < (userRoles ? userRoles.length : 0); i++) {
      if (
        routeRoles?.find((routeRole) =>
          userRoles ? routeRole === userRoles[i] : false
        )
      )
        return true;
    }

    return false;
  };

  const renderWithWrapper = useCallback(
    (route: AppRoutesProps) => {
      const element = (
        <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
      );

      return (
        <>
          {containsOneRole(route.roles, user?.roles) ? (
            <Route key={route.path} path={route.path} element={element} />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={<div>Доступ запрещен!</div>}
            />
          )}
        </>
      );
    },
    [user]
  );

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Page />}>
        {/* <Route path='/main' element={<></>}/> */}
        {Object.values(routeConfig).slice(2).map(renderWithWrapper)}
      </Route>
    </Routes>
  );
};

export default memo(AppRouter);
