import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { SpecializationApi } from "../../../entities/Specialization/api/SpecializationApi";
import cls from "./SchedulePage.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ScheduleApi } from "../../../entities/Schedule/api/ScheduleApi";
import { Schedule } from "../../../entities/Schedule";
import dayjs from "dayjs";
import { Button } from "../../../shared/ui/Button";
import { Doctor } from "../../../entities/Doctor";
import { SPECS } from "../../../shared/types/constants";
import toast from "react-hot-toast";
import { Autocomplete, TextField } from "@mui/material";

export const SchedulePage = () => {
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const { data: specializations } =
    SpecializationApi.useFetchAllSpecializationsQuery();
  const [doctorId, setDoctorId] = useState<string>();
  const { data: schedules } = ScheduleApi.useFetchAllSchedulesQuery(doctorId);
  const [updateSchedule] = ScheduleApi.useUpdateScheduleMutation();
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();
  const [curDoctors, setCurDoctors] = useState<Doctor[]>();
  const [areaId, setAreaId] = useState<string>();
  const [specializationId, setSpecializationId] = useState<string>();
  const [curSchedule, setCurSchedule] = useState<Schedule[]>();
  const [clear, setClear] = useState<boolean>(false);
  const [clearDoctors, setClearDoctors] = useState<boolean>(false);

  useEffect(() => {
    setCurSchedule(schedules);
  }, [doctorId, schedules]);

  useEffect(() => {
    if (specializationId) {
      if (areaId) {
        setCurDoctors(
          doctors?.filter(
            (d) =>
              d.area?.id.toString() === areaId &&
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

    if (specializationId === "") {
      setCurDoctors(undefined);
      setDoctorId("");
    }
  }, [areaId, specializationId, doctors]);

  const okButtonClasses = classNames(
    "crud",
    "border-radius",
    "okButton",
    "saveButton"
  ).split(" ");

  const handleSaveClick = async () => {
    const { error } = await updateSchedule(curSchedule);
    error ? toast.error("Ошибка!") : toast.success("Успешно!");
  };

  return (
    <div className={cls.page}>
      <div className={cls.inputs}>
        <div className={cls.inputField}>
          <div className={cls.inputField}>
            <label>Специальность</label>
            <Autocomplete
              options={specializations ? specializations : []}
              sx={{
                width: 200,
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
              getOptionLabel={(opt) => opt.name}
              size="small"
              onChange={(e, v) => {
                if (v?.id.toString()) {
                  setSpecializationId(v?.id.toString());
                } else {
                  setDoctorId("");
                  setAreaId("");
                  setClear(clear ? false : true);
                  setClearDoctors(clearDoctors ? false : true);
                }
              }}
              key={`2-${clear}`}
            />
          </div>
          <div className={cls.inputField}>
            <label>Участок</label>
            <Autocomplete
              options={areas ? areas : []}
              sx={{
                width: 200,
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
              disabled={
                specializationId === SPECS.AREA_DOCTOR_ID ? false : true
              }
              getOptionLabel={(opt) => opt.id.toString()}
              size="small"
              onChange={(e, v) => {
                if (v?.id.toString()) {
                  setAreaId(v?.id.toString());
                } else {
                  setDoctorId("");
                  setAreaId("");
                  //setDoctorAreaId("");
                  setClearDoctors(clearDoctors ? false : true);
                }
              }}
              key={`3-${clear}`}
            />
          </div>
        </div>
        <div className={cls.inputField}>
          <label>Врач</label>
          <Autocomplete
            options={curDoctors ? curDoctors : []}
            sx={{
              width: 200,
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
            getOptionLabel={(opt) => (opt.fullName ? opt.fullName : "")}
            size="small"
            onChange={(e, v) => {
              setDoctorId(v?.id?.toString());
            }}
            key={`2-${clearDoctors}`}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th key={"day"}>День недели</th>
            <th key={"begin"}>Начало</th>
            <th key={"end"}>Конец</th>
          </tr>
        </thead>
        <tbody>
          {curSchedule?.map((s: Schedule, k) => {
            return (
              <tr key={k}>
                <td key={"dayName"}>
                  <label key="label">{s.day?.name}</label>
                </td>
                <td key={"beginTime"}>
                  <TimePicker
                    ampm={false}
                    key={`beginTime${k}`}
                    timeSteps={{ hours: 1, minutes: 30 }}
                    value={dayjs(
                      new Date()
                        .toISOString()
                        .substring(0, new Date().toISOString().indexOf("T")) +
                        s.beginTime
                    )}
                    onChange={(e) => {
                      setCurSchedule((prevState) =>
                        prevState?.map((el) => {
                          return el.id === s.id
                            ? {
                                ...el,
                                beginTime: e
                                  ?.format()
                                  .slice(e?.format().indexOf("T") + 1)
                                  .split("+")[0],
                              }
                            : el;
                        })
                      );
                    }}
                  />
                </td>
                <td key={"endTime"}>
                  <TimePicker
                    ampm={false}
                    key={`endTime${k}`}
                    timeSteps={{ hours: 1, minutes: 30 }}
                    value={dayjs(
                      new Date()
                        .toISOString()
                        .substring(0, new Date().toISOString().indexOf("T")) +
                        s.endTime
                    )}
                    onChange={(e) => {
                      setCurSchedule((prevState) =>
                        prevState?.map((el) => {
                          return el.id === s.id
                            ? {
                                ...el,
                                endTime: e
                                  ?.format()
                                  .slice(e?.format().indexOf("T") + 1)
                                  .split("+")[0],
                              }
                            : el;
                        })
                      );
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {doctorId ? (
        <Button
          onClick={handleSaveClick}
          classes={okButtonClasses}
          children={"Сохранить"}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
