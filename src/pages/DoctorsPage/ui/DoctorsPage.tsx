import { useEffect } from "react";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { NTable } from "../../../shared/ui/Table";

export const DoctorsPage = () => {
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();

  useEffect(() => {
    console.log(doctors);
  }, [doctors])

  return (
    <>
      <div>Привет</div>
      <NTable></NTable>
    </>
  );
};
