import { Patient } from "../../../../entities/Patient";
import { QueryT } from "../../../../shared/types/QueryT";
import { useState, useEffect } from "react";
import { AreaApi } from "../../../../entities/Area/api/AreaApi";
import { GenderApi } from "../../../../entities/Gender/api/GenderApi";
import { PatientApi } from "../../../../entities/Patient/api/PatientApi";
import classNames from "classnames";
import cls from "./PatientModal.module.scss";
import { Input } from "../../../../shared/ui/Input";
import { Select } from "../../../../shared/ui/Select";
import { Button } from "../../../../shared/ui/Button";
import { Modal } from "../../../../features/Modal";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  patient?: Patient | undefined;
  queryType: QueryT | undefined;
}

export const PatientModal = (props: ModalProps) => {
  const { isOpen, setIsOpen, patient, queryType } = props;
  const [lastName, setLastName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [areaId, setAreaId] = useState<string>();
  const [genderId, setGenderId] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [polis, setPolis] = useState<string>();
  const [workPlace, setWorkPlace] = useState<string>();
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const { data: genders } = GenderApi.useFetchAllGendersQuery();
  const [createPatient] = PatientApi.useCreatePatientMutation();
  const [updatePatient] = PatientApi.useUpdatePatientMutation();

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
    if (queryType === "UPDATE") {
      setLastName(patient?.lastName);
      setFirstName(patient?.firstName);
      setSurname(patient?.surname);
      setDateOfBirth(patient?.dateOfBirth);
      setGenderId(patient?.gender?.id.toString());
      setAddress(patient?.address);
      setAreaId(patient?.area?.id.toString());
      setPolis(patient?.polis);
      setWorkPlace(patient?.workPlace);
    } else if (queryType === "CREATE") {
      clearFields();
    }
  }, [patient, queryType]);

  const clearFields = () => {
    setLastName("");
    setFirstName("");
    setSurname("");
    setDateOfBirth("");
    setGenderId("");
    setAddress("");
    setAreaId("");
    setPolis("");
    setWorkPlace("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (queryType) {
      case "CREATE":
        const newPatient: Patient = {
          lastName,
          firstName,
          surname,
          dateOfBirth,
          gender: genders?.find((g) => g.id === Number(genderId)),
          address,
          area: areas?.find((a) => a.id === Number(areaId)),
          polis,
          workPlace,
        };
        createPatient(newPatient);
        clearFields();
        break;
      case "UPDATE":
        const updatedPatient: Patient = {
          id: patient?.id,
          lastName,
          firstName,
          surname,
          dateOfBirth,
          gender: genders?.find((g) => g.id === Number(genderId)),
          address,
          area: areas?.find((a) => a.id === Number(areaId)),
          polis,
          workPlace,
        };
        updatePatient(updatedPatient);
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
            <label>Пол</label>
            <label>Адрес</label>
            <label>Участок</label>
            <label>Полис</label>
            <label>Место работы</label>
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
              data={genders}
              selectValue={"id"}
              selectLabel={"name"}
              value={genderId}
              onChange={setGenderId}
              classes={selectClasses}
            />
            <Input onChange={setAddress} value={address} required />
            <Select
              data={areas}
              selectValue={"id"}
              selectLabel={"id"}
              value={areaId}
              onChange={setAreaId}
              classes={selectClasses}
            />
            <Input onChange={setPolis} value={polis} maxLength={16} required />
            <Input onChange={setWorkPlace} value={workPlace} required />
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
    <Modal
      isOpen={isOpen}
      title="Пациент"
      onClose={closeModal}
      classes={classes}
    >
      {ModalContent}
    </Modal>
  );
};
