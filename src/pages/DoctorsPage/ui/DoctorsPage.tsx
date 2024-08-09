import { useEffect, useState } from "react";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { NTable } from "../../../shared/ui/Table";
import { TableColumn } from "../../../shared/types/TableColumn";
import { Doctor } from "../../../entities/Doctor";
import cls from "./DoctorsPage.module.scss";
import { Button } from "../../../shared/ui/Button";
import classNames from "classnames";
import { QueryT } from "../../../shared/types/QueryT";
import { DoctorModal } from "../../../widgets/Modals/DoctorModal";
import toast from "react-hot-toast";
import { Input } from "../../../shared/ui/Input";
import { SpecializationApi } from "../../../entities/Specialization/api/SpecializationApi";
import { Autocomplete, TextField } from "@mui/material";
import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { StatusApi } from "../../../entities/Status/api/StatusApi";
import { CategoryApi } from "../../../entities/Category/api/CategoryApi";
import { GenderApi } from "../../../entities/Gender/api/GenderApi";

export const DoctorsPage = () => {
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();
  const [curData, setCurData] = useState<Doctor[] | undefined>(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [deleteDoctor] = DoctorApi.useDeleteDoctorMutation();
  const [queryType, setQueryType] = useState<QueryT | undefined>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const { data: specs } = SpecializationApi.useFetchAllSpecializationsQuery();
  const { data: statuses } = StatusApi.useFetchAllStatusesQuery();
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const { data: categories } = CategoryApi.useFetchAllCategoriesQuery();
  const { data: genders } = GenderApi.useFetchAllGendersQuery();
  const [specId, setSpecId] = useState<string>();
  const [statusId, setStatusId] = useState<string>();
  const [areaId, setAreaId] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const [genderId, setGenderId] = useState<string>();
  const [clear, setClear] = useState<boolean>(false);

  useEffect(() => {
    if (
      lastName ||
      firstName ||
      surname ||
      specId ||
      statusId ||
      areaId ||
      categoryId ||
      genderId
    ) {
      setCurData(
        doctors?.filter(
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
            (specId ? el.specialization?.id.toString() === specId : true) &&
            (statusId ? el.status?.id.toString() === statusId : true) &&
            (areaId ? el.area?.id.toString() === areaId : true) &&
            (categoryId ? el.category?.id.toString() === categoryId : true) &&
            (genderId ? el.gender?.id.toString() === genderId : true)
        )
      );
    } else setCurData(doctors);
  }, [
    doctors,
    lastName,
    firstName,
    surname,
    specId,
    statusId,
    areaId,
    categoryId,
    genderId,
  ]);

  const head: TableColumn[] = [
    { index: "lastName", name: "Фамилия", sortMethod: "asc" },
    { index: "firstName", name: "Имя", sortMethod: "asc" },
    { index: "surname", name: "Отчество", sortMethod: "asc" },
    { index: "dateOfBirth", name: "Дата рождения", sortMethod: "asc" },
    { index: "specialization.name", name: "Специализация", sortMethod: "asc" },
    { index: "status.name", name: "Статус", sortMethod: "asc" },
    { index: "area.id", name: "Участок", sortMethod: "asc" },
    { index: "category.name", name: "Категория", sortMethod: "asc" },
    { index: "gender.name", name: "Пол", sortMethod: "asc" },
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

  const handleDeleteButton = async () => {
    if (selectedDoctor) {
      const { error } = await deleteDoctor(selectedDoctor?.id);
      error ? toast.error("Ошибка!") : toast.success("Успешно!");
    }
    setSelectedDoctor(undefined);
  };

  const handleCreateButton = () => {
    setQueryType("CREATE");
    setModalIsOpen(true);
  };

  const handleUpdateButton = () => {
    setQueryType("UPDATE");
    setModalIsOpen(true);
  };

  const handleClearFilterButton = () => {
    setLastName("");
    setFirstName("");
    setSurname("");
    setSpecId(undefined);
    setStatusId(undefined);
    setAreaId(undefined);
    setCategoryId(undefined);
    setGenderId(undefined);
    setClear(clear ? false : true);
  };

  return (
    <div className={cls.body}>
      <DoctorModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        doctor={selectedDoctor}
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
          <div className={cls.inputs}>
            <Autocomplete
              options={specs ? specs : []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Специализация"
                  sx={{
                    color: "1px solid green"
                  }}
                />
              )}
              getOptionLabel={(opt) => opt.name}
              size="small"
              fullWidth
              onChange={(e, v) => setSpecId(v?.id.toString())}
              key={`1-${clear}`}
            />
            <Autocomplete
              options={statuses ? statuses : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Статус" />
              )}
              getOptionLabel={(opt) => opt.name}
              size="small"
              sx={{
                "&": {
                  //width: 200,
                },
              }}
              onChange={(e, v) => setStatusId(v?.id.toString())}
              key={`2-${clear}`}
            />
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
          </div>
        </div>
        <div className={cls.block}>
          <div className={cls.inputs}>
            <Autocomplete
              options={categories ? categories : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Категория" />
              )}
              getOptionLabel={(opt) => opt.name}
              size="small"
              sx={{
                "&": {
                  //width: 200,
                },
              }}
              onChange={(e, v) => setCategoryId(v?.id.toString())}
              key={`4-${clear}`}
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
      <div className={cls.page}>
        <NTable
          head={head}
          data={curData}
          setSelectedElement={setSelectedDoctor}
        ></NTable>
      </div>
    </div>
  );
};
