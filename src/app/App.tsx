import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../entities/User/api/UserApi";
import AppRouter from "./providers/router/ui/AppRouter";

function App() {
  const { data, isLoading } = UserApi.useIsAuthQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (data === undefined) navigate("/login");
      else navigate('/main')
    }
  }, [data, isLoading, navigate]);

  return (
    // <div className={classNames('app', theme)}*/}>
    <Suspense fallback="">
      <AppRouter />
    </Suspense>
    // </div>
  );
}

export default App;
