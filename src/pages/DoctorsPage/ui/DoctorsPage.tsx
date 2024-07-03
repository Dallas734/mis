import { useEffect } from "react";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { NTable } from "../../../shared/ui/Table";
import { LoginForm } from "../../../features/LoginForm";
import { UserApi } from "../../../entities/User/api/UserApi";

export const DoctorsPage = () => {
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();
  const {data: is} = UserApi.useIsAuthQuery();

  useEffect(() => {
    console.log(doctors);
  }, [doctors])

  return (
    <>
        <LoginForm />
      <div>Привет</div>
      <NTable></NTable>
    </>
  );
};
