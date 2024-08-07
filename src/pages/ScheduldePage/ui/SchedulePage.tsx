import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { SpecializationApi } from "../../../entities/Specialization/api/SpecializationApi";
import { Select } from "../../../shared/ui/Select";
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

  const selectClasses = classNames("Select").split(" ");

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
            <Select
              data={specializations}
              selectValue={"id"}
              selectLabel={"name"}
              value={specializationId}
              onChange={(e) => {
                setSpecializationId(e);
                setAreaId("");
                setDoctorId("");
              }}
              classes={selectClasses}
            />
          </div>
          <label>Участок</label>
          <Select
            data={areas}
            selectValue={"id"}
            selectLabel={"id"}
            value={areaId}
            onChange={setAreaId}
            classes={selectClasses}
            disabled={specializationId === SPECS.AREA_DOCTOR_ID ? false : true}
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
