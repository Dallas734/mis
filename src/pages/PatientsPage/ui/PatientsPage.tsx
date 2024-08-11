import { Patient } from "../../../entities/Patient";
import { PatientApi } from "../../../entities/Patient/api/PatientApi";
import { useEffect, useState } from "react";
import { QueryT } from "../../../shared/types/QueryT";
import classNames from "classnames";
import cls from "./PatientsPage.module.scss";
import { Button } from "../../../shared/ui/Button";
import { TableColumn } from "../../../shared/types/TableColumn";
import { NTable } from "../../../shared/ui/Table";
import { PatientModal } from "../../../widgets/Modals/PatientModal";
import toast from "react-hot-toast";
import { GenderApi } from "../../../entities/Gender/api/GenderApi";
import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { Input } from "../../../shared/ui/Input";
import { Autocomplete, TextField } from "@mui/material";
import dayjs from "dayjs";

export const PatientsPage = () => {
  const { data: patients } = PatientApi.useFetchAllPatientsQuery();
  const [curData, setCurData] = useState<Patient[] | undefined>(patients);
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [deletePatient] = PatientApi.useDeletePatientMutation();
  const [queryType, setQueryType] = useState<QueryT | undefined>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const { data: genders } = GenderApi.useFetchAllGendersQuery();
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const [genderId, setGenderId] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [areaId, setAreaId] = useState<string>();
  const [polis, setPolis] = useState<string>();
  const [workPlace, setWorkPlace] = useState<string>();
  const [clear, setClear] = useState<boolean>(false);

  useEffect(() => {
    if (
      lastName ||
      firstName ||
      surname ||
      areaId ||
      genderId ||
      address ||
      polis ||
      workPlace
    ) {
      setCurData(
        patients?.filter(
          (el) =>
            (lastName
              ? el.lastName?.toLowerCase().includes(lastName.toLowerCase())
              : true) &&
            (firstName
              ? el.firstName?.toLowerCase().includes(firstName.toLowerCase())
              : true) &&
            (surname
              ? el.surname?.toLowerCase().includes(surname.toLowerCase())
              : true) &&
            (areaId ? el.area?.id.toString() === areaId : true) &&
            (genderId ? el.gender?.id.toString() === genderId : true) &&
            (address
              ? el.address?.toLowerCase().includes(address.toLowerCase())
              : true) &&
            (polis
              ? el.polis?.toLowerCase().includes(polis.toLowerCase())
              : true) &&
            (workPlace
              ? el.workPlace?.toLowerCase().includes(workPlace.toLowerCase())
              : true)
        )
      );
    } else
      setCurData(
        patients?.map((el) => ({
          ...el,
          dateOfBirth: dayjs(el.dateOfBirth).format("DD-MM-YYYY"),
        }))
      );
  }, [
    patients,
    lastName,
    firstName,
    surname,
    areaId,
    genderId,
    address,
    polis,
    workPlace,
  ]);

  const head: TableColumn[] = [
    { index: "lastName", name: "Фамилия", sortMethod: "asc" },
    { index: "firstName", name: "Имя", sortMethod: "asc" },
    { index: "surname", name: "Отчество", sortMethod: "asc" },
    { index: "gender.name", name: "Пол", sortMethod: "asc" },
    { index: "dateOfBirth", name: "Дата рождения", sortMethod: "asc" },
    { index: "address", name: "Адрес", sortMethod: "asc" },
    { index: "area.id", name: "Участок", sortMethod: "asc" },
    { index: "polis", name: "Полис", sortMethod: "asc" },
    { index: "workPlace", name: "Место работы", sortMethod: "asc" },
  ];

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

  const clearFilterButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "clearFilterButton"
  ).split(" ");

  const handleCreateButton = () => {
    setQueryType("CREATE");
    setModalIsOpen(true);
  };

  const handleUpdateButton = () => {
    setQueryType("UPDATE");
    setModalIsOpen(true);
  };

  const handleDeleteButton = async () => {
    if (selectedPatient) {
      const { error } = await deletePatient(selectedPatient?.id);
      error ? toast.error("Ошибка!") : toast.success("Успешно!");
    }
    setSelectedPatient(undefined);
  };

  const handleClearFilterButton = () => {
    setLastName("");
    setFirstName("");
    setSurname("");
    setAreaId(undefined);
    setGenderId(undefined);
    setAddress("");
    setPolis("");
    setWorkPlace("");
    setClear(clear ? false : true);
  };

  return (
    <div className={cls.body}>
      <PatientModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        patient={selectedPatient}
        queryType={queryType}
      />
      <div className={cls.inputsBlock}>
        <div className={cls.block}>
          <div className={cls.labels}>
            <label>Фамилия: </label>
            <label>Имя: </label>
            <label>Отчество: </label>
          </div>
          <div className={cls.inputsWithLabels}>
            <Input value={lastName} onChange={setLastName} />
            <Input value={firstName} onChange={setFirstName} />
            <Input value={surname} onChange={setSurname} />
          </div>
        </div>
        <div className={cls.block}>
          <div className={cls.labels}>
            <label>Адрес: </label>
            <label>Полис: </label>
            <label>Место работы: </label>
          </div>
          <div className={cls.inputsWithLabels}>
            <Input value={address} onChange={setAddress} />
            <Input value={polis} onChange={setPolis} />
            <Input value={workPlace} onChange={setWorkPlace} />
          </div>
        </div>
        <div className={cls.block}>
          <div className={cls.inputs}>
            <Autocomplete
              options={areas ? areas : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Участок" />
              )}
              getOptionLabel={(opt) => opt.id.toString()}
              size="small"
              sx={{
                "&": {
                  //width: 200,
                },
              }}
              onChange={(e, v) => setAreaId(v?.id.toString())}
              key={`3-${clear}`}
            />
            <Autocomplete
              options={genders ? genders : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Пол" />
              )}
              getOptionLabel={(opt) => opt.name}
              size="small"
              sx={{
                "&": {
                  //width: 200
                },
              }}
              onChange={(e, v) => setGenderId(v?.id.toString())}
              key={`5-${clear}`}
            />
            <Button
              children="Очистить фильтр"
              classes={clearFilterButtonClasses}
              onClick={handleClearFilterButton}
            />
          </div>
        </div>
      </div>
      <div className={cls.fieldsBlock}>
        <Button
          children="Создать"
          classes={createButtonClasses}
          onClick={handleCreateButton}
        />
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
      <div className={cls.page}>
        <NTable
          head={head}
          data={curData}
          setSelectedElement={setSelectedPatient}
        ></NTable>
      </div>
    </div>
  );
};
