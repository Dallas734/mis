import cls from "./AddVisitsPage.module.scss";
import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { SpecializationApi } from "../../../entities/Specialization/api/SpecializationApi";
import { useEffect, useState } from "react";
import { Doctor } from "../../../entities/Doctor";
import { Patient } from "../../../entities/Patient";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import classNames from "classnames";
import { PatientApi } from "../../../entities/Patient/api/PatientApi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Visit } from "../../../entities/Visit";
import { VisitsApi } from "../../../entities/Visit/api/VisitsApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "../../../shared/ui/Button";
import { SPECS } from "../../../shared/types/constants";
import toast from "react-hot-toast";
import { Autocomplete, TextField } from "@mui/material";

export const AddVisitsPage = () => {
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const { data: specializations } =
    SpecializationApi.useFetchAllSpecializationsQuery();
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();
  const { data: patients } = PatientApi.useFetchAllPatientsQuery();
  const [addVisit] = VisitsApi.useCreateVisitMutation();
  const [deleteVisit] = VisitsApi.useDeleteVisitMutation();
  const [curDoctors, setCurDoctors] = useState<Doctor[]>();
  const [curPatients, setCurPatients] = useState<Patient[]>();
  const [doctorAreaId, setDoctorAreaId] = useState<string>();
  const [patientAreaId, setPatientAreaId] = useState<string>();
  const [specializationId, setSpecializationId] = useState<string>();
  const [doctorId, setDoctorId] = useState<string>();
  const [patientId, setPatientId] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const { data: talons } = VisitsApi.useGetTalonsQuery({
    doctorId,
    date: selectedDate,
  });
  const [activeId, setActiveId] = useState<number>();
  const [selectedElement, setSelectedElement] = useState<Visit | undefined>();
  const [clear, setClear] = useState<boolean>(false);
  const [clearDoctors, setClearDoctors] = useState<boolean>(false);
  const [clearPatients, setClearPatients] = useState<boolean>(false);

  useEffect(() => {
    if (patientAreaId) {
      setCurPatients(
        patients?.filter((p) => p.area?.id.toString() === patientAreaId)
      );
    }
  }, [patientAreaId, patients]);

  useEffect(() => {
    if (specializationId) {
      if (doctorAreaId) {
        setCurDoctors(
          doctors?.filter(
            (d) =>
              d.area?.id.toString() === doctorAreaId &&
              d.specialization?.id.toString() === specializationId
          )
        );
      } else {
        setCurDoctors(
          doctors?.filter(
            (d) => d.specialization?.id.toString() === specializationId
          )
        );
      }
    }
    console.log(doctorId);
  }, [doctors, doctorAreaId, specializationId, doctorId]);

  const createButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "createButton"
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

  const handleCreateButton = async () => {
    const newVisit: Visit = {
      doctor: doctors?.find((d) => d.id === Number(doctorId)),
      patient: patients?.find((p) => p.id === Number(patientId)),
      dateT: selectedDate?.format("YYYY-MM-DD"),
      timeT: selectedElement?.timeT,
    };
    const { error } = await addVisit(newVisit);
    error ? toast.error("Ошибка!") : toast.success("Успешно!");
  };

  const handleDeleteButton = async () => {
    const { error } = await deleteVisit(selectedElement?.id);
    error ? toast.error("Ошибка!") : toast.success("Успешно!");
  };

  const handleClearFilterButton = () => {
    setClear(clear ? false : true);
    setClearDoctors(clearDoctors ? false : true);
    setClearPatients(clearPatients ? false : true);
  };

  return (
    <div className={cls.page}>
      <div className={cls.inputs}>
        <div className="dateWidth">
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </div>
        <div className={cls.block}>
          <div className={cls.labels}>
            <label>Специальность</label>
            <label>Участок врача</label>
            <label>Врач</label>
          </div>
          <div className={cls.selects}>
            <Autocomplete
              options={specializations ? specializations : []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Специализация"
                />
              )}
              getOptionLabel={(opt) => opt.name}
              size="small"
              onChange={(e, v) => {
                if (v?.id.toString()) {
                  setSpecializationId(v?.id.toString());
                } else {
                  setDoctorId("");
                  setDoctorAreaId("");
                  setClearDoctors(clearDoctors ? false : true);
                }
              }}
              key={`2-${clear}`}
            />
            <Autocomplete
              options={areas ? areas : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Участок" />
              )}
              getOptionLabel={(opt) => opt.id.toString()}
              size="small"
              onChange={(e, v) => setDoctorAreaId(v?.id.toString())}
              disabled={
                specializationId === SPECS.AREA_DOCTOR_ID ? false : true
              }
              key={`3-${clearDoctors}`}
            />
            <Autocomplete
              options={curDoctors ? curDoctors : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Врач" />
              )}
              getOptionLabel={(opt) => (opt.fullName ? opt.fullName : "")}
              size="small"
              onChange={(e, v) => setDoctorId(v?.id?.toString())}
              key={`4-${clearDoctors}`}
            />
          </div>
        </div>
        <div className={cls.block}>
          <div className={cls.labels}>
            <label>Участок пациента</label>
            <label>Пациенты</label>
          </div>
          <div className={cls.selects}>
            <Autocomplete
              options={areas ? areas : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Участок" />
              )}
              getOptionLabel={(opt) => opt.id.toString()}
              size="small"
              onChange={(e, v) => {
                if (v?.id.toString()) {
                  setPatientAreaId(v?.id.toString());
                } else {
                  setClearPatients(clearPatients ? false : true);
                  setCurPatients(undefined);
                  setPatientId("");
                }
              }}
              key={`5-${clear}`}
            />
            <Autocomplete
              options={curPatients ? curPatients : []}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Пациент" />
              )}
              getOptionLabel={(opt) => (opt.fullName ? opt.fullName : "")}
              size="small"
              onChange={(e, v) => setPatientId(v?.id?.toString())}
              key={`6-${clearPatients}`}
            />
            <Button
              children="Очистить фильтр"
              classes={clearFilterButtonClasses}
              onClick={handleClearFilterButton}
            />
          </div>
        </div>
      </div>
      <div className={cls.bodyPage}>
        <TableContainer
          component={Paper}
          style={{ height: "100%", width: "70%" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    [`&.${tableCellClasses.head}`]: {
                      backgroundColor: "#afd5af",
                    },
                  }}
                >
                  Время
                </TableCell>
                <TableCell
                  sx={{
                    [`&.${tableCellClasses.head}`]: {
                      backgroundColor: "#afd5af",
                    },
                  }}
                >
                  Статус
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {talons?.map((el: Visit, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "fff6e7",
                    },
                  }}
                  onClick={() => {
                    setActiveId(index);
                    if (setSelectedElement) setSelectedElement(el);
                  }}
                  className={
                    activeId === index
                      ? cls.active
                      : el.visitStatus
                      ? cls.isTaken
                      : ""
                  }
                >
                  <TableCell>
                    <>{el.timeT}</>
                  </TableCell>
                  <TableCell>
                    <>{el.visitStatus ? el.visitStatus.name : ""}</>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={cls.sideBox}>
          <label>Информация о записи</label>
          <br />
          <label>
            Дата: {dayjs(selectedElement?.dateT).format("DD-MM-YYYY")}
          </label>
          <br />
          <label>Время: {selectedElement?.timeT}</label>
          <br />
          <label>
            Врач:{" "}
            {selectedElement?.doctor ? selectedElement?.doctor.fullName : ""}
          </label>
          <br />
          <label>
            Пациент:{" "}
            {selectedElement?.patient ? selectedElement?.patient.fullName : ""}
          </label>
          <div className={cls.buttons}>
            <Button
              children="Записать"
              classes={createButtonClasses}
              onClick={handleCreateButton}
              disabled={
                selectedElement &&
                patientId &&
                doctorId &&
                selectedElement.visitStatus?.id !== 1
                  ? false
                  : true
              }
            />
            <Button
              children="Удалить"
              classes={deleteButtonClasses}
              disabled={selectedElement?.visitStatus?.id === 1 ? false : true}
              onClick={handleDeleteButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
