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

export const SchedulePage = () => {
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const { data: specializations } =
    SpecializationApi.useFetchAllSpecializationsQuery();
  const [doctorId, setDoctorId] = useState<string>();
  const { data: schedules } = ScheduleApi.useFetchAllSchedulesQuery(doctorId);
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();
  const [areaId, setAreaId] = useState<string>();
  const [specializationId, setSpecializationId] = useState<string>();
  const [curSchedule, setCurSchedule] = useState<Schedule[]>();

  const selectClasses = classNames("Select").split(" ");

  useEffect(() => {
    setCurSchedule(schedules);
    console.log("ok");
    console.log(schedules);
  }, [doctorId, schedules]);

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
          <label>Специальность</label>
          <Select
            data={specializations}
            selectValue={"id"}
            selectLabel={"name"}
            value={specializationId}
            onChange={setSpecializationId}
            classes={selectClasses}
          />
        </div>
        <div className={cls.inputField}>
          <label>Врач</label>
          <Select
            data={doctors}
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
                    format="HH:mm"
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
    </div>
  );
};
