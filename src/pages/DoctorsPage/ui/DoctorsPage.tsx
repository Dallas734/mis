import { useEffect } from "react";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { NTable } from "../../../shared/ui/Table";
import { TableColumn } from "../../../shared/types/TableColumn";

export const DoctorsPage = () => {
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();

  const head: TableColumn[] = [
    {index: 'lastName', name: 'Фамилия'},
    {index: 'firstName', name: 'Имя'},
    {index: 'surname', name: 'Отчество'},
    {index: 'dateOfBirth', name: 'Дата рождения'},
    {index: 'specialization.name', name: 'Специализация'},
    {index: 'status.name', name: 'Статус'},
    {index: 'area.id', name: 'Участок'},
    {index: 'category.name', name: 'Категория'},
    {index: 'gender.name', name: 'Пол'}
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
