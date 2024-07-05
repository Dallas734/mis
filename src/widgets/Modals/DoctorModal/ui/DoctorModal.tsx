import { Doctor } from "../../../../entities/Doctor";
import { Specialization } from "../../../../entities/Specialization";
import { Status } from "../../../../entities/Status";
import { Area } from "../../../../entities/Area";
import { QueryT } from "../../../../shared/types/QueryT";
import { Input } from "../../../../shared/ui/Input";
import cls from "./DoctorModal.module.scss";
import { useState, useEffect } from "react";
import { Category } from "../../../../entities/Category";
import { Gender } from "../../../../entities/Gender";
import { Select, Option } from "../../../../shared/ui/Select";
import { SpecializationApi } from "../../../../entities/Specialization/api/SpecializationApi";
import { StatusApi } from "../../../../entities/Status/api/StatusApi";
import { AreaApi } from "../../../../entities/Area/api/AreaApi";
import { CategoryApi } from "../../../../entities/Category/api/CategoryApi";
import { GenderApi } from "../../../../entities/Gender/api/GenderApi";
import { Button } from "../../../../shared/ui/Button";
import classNames from "classnames";
import { Modal } from "../../../../features/Modal";

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

  //   const specializationOptions: Option[] = specializations?.map((el) => ({
  //     value: el.id,
  //     label: el.name,
  //   })) as Option[];

  //   const statusOptions: Option[] = statuses?.map((el) => ({
  //     value: el.id,
  //     label: el.name,
  //   })) as Option[];

  //   const areaOptions: Option[] = areas?.map((el) => ({
  //     value: el.id,
  //     label: el.id.toString(),
  //   })) as Option[];

  //   const categoryOptions: Option[] = categories?.map((el) => ({
  //     value: el.id,
  //     label: el.name,
  //   })) as Option[];

  //   const genderOptions: Option[] = genders?.map((el) => ({
  //     value: el.id,
  //     label: el.name,
  //   })) as Option[];

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

  useEffect(() => {
    setLastName(doctor?.lastName);
    setFirstName(doctor?.firstName);
    setSurname(doctor?.surname);
    setDateOfBirth(doctor?.dateOfBirth);
    setSpecializationId(doctor?.specialization.id.toString());
    setStatusId(doctor?.status.id.toString());
    setAreaId(doctor?.area.id.toString());
    setCategoryId(doctor?.category.id.toString(0));
    setGenderId(doctor?.gender.id.toString());
  }, [doctor]);

  const handleSubmit = () => {};

  const closeModal = () => setIsOpen(false);

  const ModalContent = (
    <div className={cls.modal}>
      <form onSubmit={handleSubmit}>
        <div className={cls.field}>
          <label>Фамилия</label>
          <Input onChange={setLastName} value={lastName} />
        </div>
        <div className={cls.field}>
          <label>Имя</label>
          <Input onChange={setFirstName} value={firstName} />
        </div>
        <div className={cls.field}>
          <label>Отчество</label>
          <Input onChange={setSurname} value={surname} />
        </div>
        <div className={cls.field}>
          <label>Дата рождения</label>
          <Input type="date" onChange={setDateOfBirth} value={dateOfBirth} />
        </div>
        <div className={cls.field}>
          <label>Специализация</label>
          <Select
            data={specializations}
            selectValue={"id"}
            selectLabel={"name"}
            value={specializationId}
            onChange={setSpecializationId}
          />
        </div>
        <div className={cls.field}>
          <label>Статус</label>
          <Select
            data={statuses}
            selectValue={"id"}
            selectLabel={"name"}
            value={statusId}
            onChange={setStatusId}
          />
        </div>
        <div className={cls.field}>
          <label>Участок</label>
          <Select
            data={areas}
            selectValue={"id"}
            selectLabel={"id"}
            value={areaId}
            onChange={setAreaId}
          />
        </div>
        <div className={cls.field}>
          <label>Категория</label>
          <Select
            data={categories}
            selectValue={"id"}
            selectLabel={"name"}
            value={categoryId}
            onChange={setCategoryId}
          />
        </div>
        <div className={cls.field}>
          <label>Пол</label>
          <Select
            data={genders}
            selectValue={"id"}
            selectLabel={"name"}
            value={genderId}
            onChange={setGenderId}
          />
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
