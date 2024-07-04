import { useEffect } from "react";
import { UserApi } from "../../../../entities/User/api/UserApi"
import { useNavigate } from "react-router-dom";

export interface RequireAuthProps {
    role?: string
}

export const RequireAuth = (props: React.PropsWithChildren<RequireAuthProps>) => {
    const {data, isSuccess} = UserApi.useIsAuthQuery();

    useEffect(() => {
        console.log(data);
    }, [data])
    
    const nav = useNavigate()
    
    // data && role === data.role ...

    return (<>{isSuccess ? data ? <>{props.children}</> : nav('/') : <></>}</>);
}