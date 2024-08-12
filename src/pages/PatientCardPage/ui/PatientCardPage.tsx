import cls from "./PatientCardPage.module.scss";
import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { useEffect, useState } from "react";
import { PatientApi } from "../../../entities/Patient/api/PatientApi";
import { Patient } from "../../../entities/Patient";
import { TableColumn } from "../../../shared/types/TableColumn";
import { NTable } from "../../../shared/ui/Table";
import { VisitsApi } from "../../../entities/Visit/api/VisitsApi";
import { Visit } from "../../../entities/Visit";
import dayjs from "dayjs";
import { Autocomplete, TextField } from "@mui/material";

export const PatientCardPage = () => {
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const [areaId, setAreaId] = useState<string>();
  const { data: patients } = PatientApi.useFetchAllPatientsQuery();
  const [curPatients, setCurPatients] = useState<Patient[]>();
  const [patientId, setPatientId] = useState<string | undefined>();
  const { data: patientCard } = VisitsApi.useGetPatientCardQuery(patientId);
  const [curPatientCard, setCurPatientCard] = useState<Visit[] | undefined>();
  const [clear, setClear] = useState<boolean>();

  useEffect(() => {
    if (areaId)
      setCurPatients(patients?.filter((p) => p.area?.id.toString() === areaId));
    if (areaId === undefined) {
      setCurPatients(undefined);
      setClear(clear ? false : true);
    }
    console.log(areaId);
    console.log(curPatients);
  }, [areaId, patients, curPatients, clear]);

  useEffect(() => {
    setCurPatientCard(
      patientCard?.map((el) => ({
        ...el,
        dateT: dayjs(el.dateT).format("DD-MM-YYYY"),
      }))
    );
  }, [patientCard]);

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
          <Autocomplete
            options={areas ? areas : []}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
            getOptionLabel={(opt) => opt.id.toString()}
            size="small"
            sx={{
              width: 200,
            }}
            onChange={(e, v) => setAreaId(v?.id.toString())}
            key={`5`}
          />
        </div>
        <div className={cls.inputField}>
          <label>Пациент</label>
          <Autocomplete
            options={curPatients ? curPatients : []}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
            getOptionLabel={(opt) => (opt.fullName ? opt.fullName : "")}
            size="small"
            sx={{
              width: 200,
            }}
            onChange={(e, v) => setPatientId(v?.id?.toString())}
            key={`6-${clear}`}
          />
        </div>
      </div>
      <NTable head={head} data={curPatientCard}></NTable>
    </div>
  );
};
