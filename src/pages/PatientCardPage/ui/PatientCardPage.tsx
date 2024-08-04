import cls from "./PatientCardPage.module.scss";
import { Select } from "../../../shared/ui/Select";
import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { PatientApi } from "../../../entities/Patient/api/PatientApi";
import { Patient } from "../../../entities/Patient";
import { TableColumn } from "../../../shared/types/TableColumn";
import { NTable } from "../../../shared/ui/Table";
import { VisitsApi } from "../../../entities/Visit/api/VisitsApi";

export const PatientCardPage = () => {
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const [areaId, setAreaId] = useState<string>();
  const { data: patients } = PatientApi.useFetchAllPatientsQuery();
  const [curPatients, setCurPatients] = useState<Patient[]>();
  const [patientId, setPatientId] = useState<string | undefined>();
  const { data: patientCard } = VisitsApi.useGetPatientCardQuery(patientId);

  const selectClasses = classNames("Select").split(" ");

  useEffect(() => {
    console.log(areaId);
    if (areaId)
      setCurPatients(patients?.filter((p) => p.area?.id.toString() === areaId));
    if (areaId === "") setCurPatients(undefined);
  }, [areaId, patients]);

  const head: TableColumn[] = [
    { index: "doctor.fullName", name: "Врач" },
    {
      index: "doctor.specialization.name",
      name: "Специализация",
    },
    { index: "dateT", name: "Дата", sortMethod: "asc" },
    { index: "timeT", name: "Время", sortMethod: "asc" },
    { index: "diagnosis.name", name: "Диагноз" },
    { index: "procedure.name", name: "Процедура" },
    { index: "recipe", name: "Рецепт" },
  ];

  return (
    <div className={cls.page}>
      <div className={cls.inputs}>
        <div className={cls.inputField}>
          <label>Участок</label>
          <Select
            data={areas}
            selectValue={"id"}
            selectLabel={"id"}
            value={areaId}
            onChange={setAreaId}
            classes={selectClasses}
          />
        </div>
        <div className={cls.inputField}>
          <label>Пациент</label>
          <Select
            data={curPatients}
            selectValue={"id"}
            selectLabel={"fullName"}
            value={patientId}
            onChange={setPatientId}
            classes={selectClasses}
          />
        </div>
      </div>
      <NTable head={head} data={patientCard}></NTable>
    </div>
  );
};
