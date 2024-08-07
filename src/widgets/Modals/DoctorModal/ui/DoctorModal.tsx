import { Doctor } from "../../../../entities/Doctor";
import { QueryT } from "../../../../shared/types/QueryT";
import { Input } from "../../../../shared/ui/Input";
import cls from "./DoctorModal.module.scss";
import { useState, useEffect } from "react";
import { Select } from "../../../../shared/ui/Select";
import { SpecializationApi } from "../../../../entities/Specialization/api/SpecializationApi";
import { StatusApi } from "../../../../entities/Status/api/StatusApi";
import { AreaApi } from "../../../../entities/Area/api/AreaApi";
import { CategoryApi } from "../../../../entities/Category/api/CategoryApi";
import { GenderApi } from "../../../../entities/Gender/api/GenderApi";
import { Button } from "../../../../shared/ui/Button";
import classNames from "classnames";
import { Modal } from "../../../../features/Modal";
import { DoctorApi } from "../../../../entities/Doctor/api/DoctorApi";
import { SPECS } from "../../../../shared/types/constants";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  doctor?: Doctor | undefined;
  queryType: QueryT | undefined;
}

export const DoctorModal = (props: ModalProps) => {
  const { isOpen, setIsOpen, doctor, queryType } = props;
  const [lastName, setLastName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [specializationId, setSpecializationId] = useState<string>();
  const [statusId, setStatusId] = useState<string>();
  const [areaId, setAreaId] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const [genderId, setGenderId] = useState<string>();
  const { data: specializations } =
    SpecializationApi.useFetchAllSpecializationsQuery();
  const { data: statuses } = StatusApi.useFetchAllStatusesQuery();
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const { data: categories } = CategoryApi.useFetchAllCategoriesQuery();
  const { data: genders } = GenderApi.useFetchAllGendersQuery();
  const [createDoctor] = DoctorApi.useCreateDoctorMutation();
  const [updateDoctor] = DoctorApi.useUpdateDoctorMutation();

  const classes = classNames("doctorModal").split(" ");

  const okButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "okButton"
  ).split(" ");
  const closeButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "closeModalBtn"
  ).split(" ");

  const clearFields = () => {
    setLastName("");
    setFirstName("");
    setSurname("");
    setDateOfBirth("");
    setSpecializationId("");
    setStatusId("");
    setAreaId("");
    setCategoryId("");
    setGenderId("");
  };

  useEffect(() => {
    if (queryType === "UPDATE") {
      setLastName(doctor?.lastName);
      setFirstName(doctor?.firstName);
      setSurname(doctor?.surname);
      setDateOfBirth(doctor?.dateOfBirth);
      setSpecializationId(doctor?.specialization?.id.toString());
      setStatusId(doctor?.status?.id.toString());
      setAreaId(doctor?.area?.id.toString());
      setCategoryId(doctor?.category?.id.toString());
      setGenderId(doctor?.gender?.id.toString());
    } else if (queryType === "CREATE") {
      clearFields();
    }
  }, [doctor, queryType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (queryType) {
      case "CREATE":
        const newDoctor: Doctor = {
          lastName,
          firstName,
          surname,
          dateOfBirth,
          status: statuses?.find((s) => s.id === Number(statusId)),
          area: areas?.find((a) => a.id === Number(areaId)),
          category: categories?.find((c) => c.id === Number(categoryId)),
          gender: genders?.find((g) => g.id === Number(genderId)),
          specialization: specializations?.find(
            (s) => s.id === Number(specializationId)
          ),
        };
        const { error } = await createDoctor(newDoctor);
        error ? toast.error("Ошибка!") : toast.success("Успешно!");

        clearFields();
        break;
      case "UPDATE":
        const updatedDoctor: Doctor = {
          id: doctor?.id,
          lastName,
          firstName,
          surname,
          dateOfBirth,
          status: statuses?.find((s) => s.id === Number(statusId)),
          area: areas?.find((a) => a.id === Number(areaId)),
          category: categories?.find((c) => c.id === Number(categoryId)),
          gender: genders?.find((g) => g.id === Number(genderId)),
          specialization: specializations?.find(
            (s) => s.id === Number(specializationId)
          ),
        };
        const { error: upError } = await updateDoctor(updatedDoctor);
        upError ? toast.error("Ошибка!") : toast.success("Успешно!");
        break;
    }
    setIsOpen(false);
  };

  const closeModal = () => setIsOpen(false);

  const selectClasses = classNames("modalSelect").split(" ");

  const ModalContent = (
    <div className={cls.modal}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={cls.main}>
          <div className={cls.labels}>
            <label>Фамилия</label>
            <label>Имя</label>
            <label>Отчество</label>
            <label>Дата рождения</label>
            <label>Специализация</label>
            <label>Участок</label>
            <label>Статус</label>
            <label>Категория</label>
            <label>Пол</label>
          </div>
          <div className={cls.inputs}>
            <Input onChange={setLastName} value={lastName} required />
            <Input onChange={setFirstName} value={firstName} required />
            <Input onChange={setSurname} value={surname} required />
            <Input
              type="date"
              onChange={setDateOfBirth}
              value={dateOfBirth}
              required
            />
            <Select
              data={specializations}
              selectValue={"id"}
              selectLabel={"name"}
              value={specializationId}
              onChange={(e) => {
                setSpecializationId(e);
                setAreaId("");
              }}
              classes={selectClasses}
              required
            />
            <Select
              data={areas}
              selectValue={"id"}
              selectLabel={"id"}
              value={areaId}
              onChange={setAreaId}
              classes={selectClasses}
              disabled={
                specializationId === SPECS.AREA_DOCTOR_ID ? false : true
              }
              required
            />
            <Select
              data={statuses}
              selectValue={"id"}
              selectLabel={"name"}
              value={statusId}
              onChange={setStatusId}
              classes={selectClasses}
              required
            />
            <Select
              data={categories}
              selectValue={"id"}
              selectLabel={"name"}
              value={categoryId}
              onChange={setCategoryId}
              classes={selectClasses}
              required
            />
            <Select
              data={genders}
              selectValue={"id"}
              selectLabel={"name"}
              value={genderId}
              onChange={setGenderId}
              classes={selectClasses}
              required
            />
          </div>
        </div>
        <div className={cls.buttons}>
          <Button children={"OK"} classes={okButtonClasses} type="submit" />
          <Button
            children={"Закрыть"}
            onClick={closeModal}
            classes={closeButtonClasses}
          />
        </div>
      </form>
    </div>
  );

  return (
    <Modal isOpen={isOpen} title="Врач" onClose={closeModal} classes={classes}>
      {ModalContent}
    </Modal>
  );
};
