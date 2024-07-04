import { useEffect } from "react";
import { UserApi } from "../../../../entities/User/api/UserApi"
import { useNavigate } from "react-router-dom";

export interface RequireAuthProps {

}

export const RequireAuth = (props: React.PropsWithChildren<RequireAuthProps>) => {
    const {data, isSuccess} = UserApi.useIsAuthQuery();

    useEffect(() => {
        console.log(data);
    }, [data])
    
    const nav = useNavigate()

    return (<>{isSuccess ? data ? <>{props.children}</> : nav('/') : <></>}</>);
}