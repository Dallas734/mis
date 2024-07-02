import { useEffect } from "react";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { NTable } from "../../../shared/ui/Table";
import { LoginForm } from "../../../features/LoginForm";

export const DoctorsPage = () => {
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();

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
