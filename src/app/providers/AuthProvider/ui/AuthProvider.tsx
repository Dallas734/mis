import { ReactNode, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../../shared/context/IsAuthContext";
import { UserApi } from "../../../../entities/User/api/UserApi";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const { data, isLoading, isFetching } = UserApi.useIsAuthQuery();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isFetching) 
        if (data)
            setIsAuth(true);
    else 
    {
        navigate('/')
        setIsAuth(false);
    }
  }, [isAuth, isLoading, isFetching, data, navigate]);

  useEffect(() => {
    if (!isAuth)
        if (data)
            navigate('/main')
  }, [isAuth, data, navigate])

  const defaultProps = useMemo(
    () => ({
      isAuth,
      setIsAuth,
    }),
    [isAuth]
  );

  return (
    <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>
  );
};
