import cls from "./AddVisitsPage.module.scss";
import { Select } from "../../../shared/ui/Select";
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
  const [areaId, setAreaId] = useState<string>();
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

  useEffect(() => {
    if (areaId) {
      setCurPatients(patients?.filter((p) => p.area?.id.toString() === areaId));
    }
  }, [areaId, patients]);

  useEffect(() => {
    if (areaId && specializationId) {
      setCurDoctors(
        doctors?.filter(
          (d) =>
            d.area?.id.toString() === areaId &&
            d.specialization?.id.toString() === specializationId
        )
      );
    }
  }, [doctors, areaId, specializationId]);

  const selectClasses = classNames("Select").split(" ");

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

  const handleCreateButton = () => {
    const newVisit: Visit = {
      doctor: doctors?.find((d) => d.id === Number(doctorId)),
      patient: patients?.find((p) => p.id === Number(patientId)),
      dateT: selectedDate?.format("YYYY-MM-DD"),
      timeT: selectedElement?.timeT,
    };
    console.log(newVisit);
    addVisit(newVisit);
  };

  const handleDeleteButton = () => {
    deleteVisit(selectedElement?.id);
  };

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
            onChange={(el) => {
              setAreaId(el);
              setSpecializationId("");
              setDoctorId("");
              setPatientId("");
            }}
            classes={selectClasses}
          />
        </div>
        <div className={cls.inputField}>
          <label>Специальность</label>
          <Select
            data={specializations}
            selectValue={"id"}
            selectLabel={"name"}
            value={specializationId}
            onChange={(el) => {
              setSpecializationId(el);
              setDoctorId("");
            }}
            classes={selectClasses}
          />
        </div>
        <div className={cls.inputField}>
          <label>Врач</label>
          <Select
            data={curDoctors}
            selectValue={"id"}
            selectLabel={"fullName"}
            value={doctorId}
            onChange={setDoctorId}
            classes={selectClasses}
          />
        </div>
        <div className={cls.inputField}>
          <label>Пациенты</label>
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
      <div className="dateWidth">
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
        />
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
          <label>Дата: {selectedElement?.dateT}</label>
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
