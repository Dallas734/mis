import { useEffect } from "react";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { NTable } from "../../../shared/ui/Table";
import { TableColumn } from "../../../shared/types/TableColumn";

export const DoctorsPage = () => {
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();

  const head: TableColumn[] = [
    {index: 'lastName', name: 'Фамилия', sortMethod: "asc"},
    {index: 'firstName', name: 'Имя', sortMethod: "asc"},
    {index: 'surname', name: 'Отчество', sortMethod: "asc"},
    {index: 'dateOfBirth', name: 'Дата рождения', sortMethod: "asc"},
    {index: 'specialization.name', name: 'Специализация', sortMethod: "asc"},
    {index: 'status.name', name: 'Статус', sortMethod: "asc"},
    {index: 'area.id', name: 'Участок', sortMethod: "asc"},
    {index: 'category.name', name: 'Категория', sortMethod: "asc"},
    {index: 'gender.name', name: 'Пол', sortMethod: "asc"}
  ]

  useEffect(() => {
    console.log(doctors);
  }, [doctors])

  return (
    <>
      <NTable head={head} data={doctors}></NTable>
    </>
  );
};
