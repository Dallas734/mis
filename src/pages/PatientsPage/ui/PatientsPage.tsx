import { Patient } from "../../../entities/Patient";
import { PatientApi } from "../../../entities/Patient/api/PatientApi"
import { useState } from "react";
import { QueryT } from "../../../shared/types/QueryT";
import classNames from "classnames";
import cls from './PatientsPage.module.scss';
import { Button } from "../../../shared/ui/Button";
import { TableColumn } from "../../../shared/types/TableColumn";
import { NTable } from "../../../shared/ui/Table";
import { PatientModal } from "../../../widgets/Modals/PatientModal";

export const PatientsPage = () => {
    const { data: patients } = PatientApi.useFetchAllPatientsQuery();
    const [selectedPatient, setSelectedPatient] = useState<Patient>();
    const [ deletePatient ] = PatientApi.useDeletePatientMutation();
    const [queryType, setQueryType] = useState<QueryT | undefined>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const head: TableColumn[] = [
        {index: 'lastName', name: 'Фамилия', sortMethod: "asc"},
        {index: 'firstName', name: 'Имя', sortMethod: "asc"},
        {index: 'surname', name: 'Отчество', sortMethod: "asc"},
        {index: 'gender.name', name: 'Пол', sortMethod: "asc"},
        {index: 'dateOfBirth', name: 'Дата рождения', sortMethod: "asc"},
        {index: 'address', name: 'Адрес', sortMethod: "asc"},
        {index: 'area.id', name: 'Участок', sortMethod: "asc"},
        {index: 'polis', name: 'Полис', sortMethod: "asc"},
        {index: 'workPlace', name: 'Место работы', sortMethod: "asc"}
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

      const handleCreateButton = () => {
        setQueryType('CREATE');
        setModalIsOpen(true);
      }
    
      const handleUpdateButton = () => {
        setQueryType('UPDATE');
        setModalIsOpen(true)
      }

      const handleDeleteButton = () => {
        if (selectedPatient) deletePatient(selectedPatient?.id);
        setSelectedPatient(undefined);
      }

    return (<>
    <PatientModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} patient={selectedPatient} queryType={queryType}/>
    <div className={cls.fieldsBlock}>
          <Button children="Создать" classes={createButtonClasses} onClick={handleCreateButton}/>
          <Button
            children="Изменить"
            classes={editButtonClasses}
            disabled={selectedPatient ? false : true}
            onClick={handleUpdateButton}
          />
          <Button
            children="Удалить"
            classes={deleteButtonClasses}
            disabled={selectedPatient ? false : true}
            onClick={handleDeleteButton}
          />
        </div>
      <NTable head={head} data={patients} setSelectedElement={setSelectedPatient}></NTable></>)
}