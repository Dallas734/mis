import { AreaApi } from "../../../entities/Area/api/AreaApi";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";
import { SpecializationApi } from "../../../entities/Specialization/api/SpecializationApi";
import { Select } from "../../../shared/ui/Select";
import cls from "./SchedulePage.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { NTable } from "../../../shared/ui/Table";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ScheduleApi } from "../../../entities/Schedule/api/ScheduleApi";
import { Schedule } from "../../../entities/Schedule";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, UseDispatch } from "react-redux";

export const SchedulePage = () => {
  const { data: areas } = AreaApi.useFetchAllAreasQuery();
  const { data: specializations } =
    SpecializationApi.useFetchAllSpecializationsQuery();
  const [doctorId, setDoctorId] = useState<string>();
  const { data: schedules, isSuccess } =
    ScheduleApi.useFetchAllSchedulesQuery(doctorId);
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();
  const [areaId, setAreaId] = useState<string>();
  const [specializationId, setSpecializationId] = useState<string>();
  const [beginTime, setBeginTime] = useState<Dayjs | null>();
  const [endTime, setEndTime] = useState<Dayjs | null>();
  const [curSchedule, setCurSchedule] = useState<Schedule[]>();

  const dispatch = useDispatch();
  const selectClasses = classNames("Select").split(" ");

  useEffect(() => {
    // console.log(schedules);
    // dispatch(ScheduleApi.util.resetApiState());
    if (isSuccess) {
      setCurSchedule(schedules);
      dispatch(ScheduleApi.util.resetApiState());
    }
  }, [schedules, isSuccess, dispatch]);

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
            <th>День недели</th>
            <th>Начало</th>
            <th>Конец</th>
          </tr>
        </thead>
        <tbody>
          {curSchedule?.map((s: Schedule, k) => {
            return (
              <tr>
                <td>
                  <label key="label">{s.day.name}</label>
                </td>
                <td>
                  <TimePicker
                    ampm={false}
                    key="beginTime"
                    // readOnly
                    timeSteps={{ hours: 1, minutes: 30 }}
                    // format="HH:mm
                    value={dayjs(
                      new Date()
                        .toISOString()
                        .substring(0, new Date().toISOString().indexOf("T")) +
                        s.beginTime
                    )}
                    //defaultValue={dayjs('2022-04-17T15:30')}
                    onChange={(e) => {
                      console.log(curSchedule);
                      //console.log(dayjs(new Date().toISOString().substring(0, new Date().toISOString().indexOf('T')) + s.beginTime).toISOString())
                      // (s.beginTime = dayjs(e, "HH:mm:ss").format("HH:mm:ss"))
                    }}
                    //value={new Date(s.beginTime)}
                  />
                </td>
                <td>
                  <TimePicker
                    ampm={false}
                    key="endTime"
                    // readOnly
                    // defaultValue={dayjs(s.endTime, "HH:mm:ss")}
                    timeSteps={{ hours: 1, minutes: 30 }}
                    format="HH:mm"
                    value={dayjs(
                      new Date()
                        .toISOString()
                        .substring(0, new Date().toISOString().indexOf("T")) +
                        s.endTime
                    )}
                    //value={new Date(s.endTime)}
                    //   onChange={(e) =>
                    //     (s.endTime = dayjs(e, "HH:mm:ss").format("HH:mm:ss"))
                    //   }
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
