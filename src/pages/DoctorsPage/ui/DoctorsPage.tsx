import { useEffect, useState } from "react";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { NTable } from "../../../shared/ui/Table";
import { TableColumn } from "../../../shared/types/TableColumn";
import { Doctor } from "../../../entities/Doctor";
import cls from './DoctorsPage.module.scss'
import { Button } from "../../../shared/ui/Button";
import classNames from "classnames";
import { QueryT } from "../../../shared/types/QueryT";
import { DoctorModal } from "../../../widgets/Modals/DoctorModal";

export const DoctorsPage = () => {
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [ deleteDoctor ] = DoctorApi.useDeleteDoctorMutation();
  const [queryType, setQueryType] = useState<QueryT | undefined>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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

  const createButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "createButton"
  ).split(" ");

  const editButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "editButton"
  ).split(" ");

  const deleteButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "deleteButton"
  ).split(" ");

  const handleDeleteButton = () => {
    if (selectedDoctor) deleteDoctor(selectedDoctor?.id);
    setSelectedDoctor(undefined);
  };

//   const handleClearFilterButton = () => {
//     setId("");
//     setSelectedTypeId("");
//     setSelectedOwnerId("");
//     setSelectedBirthday(1995);
//   };

  const handleCreateButton = () => {
    setQueryType('CREATE');
    setModalIsOpen(true);
  }

  const handleUpdateButton = () => {
    setQueryType('UPDATE');
    setModalIsOpen(true)
  }

  return (
    <>
    <DoctorModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} doctor={selectedDoctor} queryType={queryType}/>
    <div className={cls.fieldsBlock}>
          <Button children="Создать" classes={createButtonClasses} onClick={handleCreateButton}/>
          <Button
            children="Изменить"
            classes={editButtonClasses}
            disabled={selectedDoctor ? false : true}
            onClick={handleUpdateButton}
          />
          <Button
            children="Удалить"
            classes={deleteButtonClasses}
            disabled={selectedDoctor ? false : true}
            onClick={handleDeleteButton}
          />
        </div>
      <NTable head={head} data={doctors} setSelectedElement={setSelectedDoctor}></NTable>
    </>
  );
};
