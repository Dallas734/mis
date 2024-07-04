import { useContext } from "react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../entities/User/api/UserApi";
import AppRouter from "./providers/router/ui/AppRouter";
import { AuthContext } from "../shared/context/IsAuthContext";

function App() {
  const { data, isLoading } = UserApi.useIsAuthQuery();

  // // const { isAuth, setIsAuth } = useContext(AuthContext)

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (data === undefined) navigate("/login")
  //   }
  // }, [data, isLoading, navigate]);

  // const { isAuth } = useContext(AuthContext)
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, [isAuth]);

  return (
    // <div className={classNames('app', theme)}*/}>
    <Suspense fallback="">
      <AppRouter />
    </Suspense>
    // </div>
  );
}

export default App;
