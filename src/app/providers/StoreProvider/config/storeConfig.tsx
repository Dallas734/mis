import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { DoctorApi } from "../../../../entities/Doctor/api/DoctorApi";
import { AreaApi } from "../../../../entities/Area/api/AreaApi";
import { CategoryApi } from "../../../../entities/Category/api/CategoryApi";
import { GenderApi } from "../../../../entities/Gender/api/GenderApi";
import { PatientApi } from "../../../../entities/Patient/api/PatientApi";
import { SpecializationApi } from "../../../../entities/Specialization/api/SpecializationApi";
import { StatusApi } from "../../../../entities/Status/api/StatusApi";
import { UserApi } from "../../../../entities/User/api/UserApi";
import { DayApi } from "../../../../entities/Day/api/DayApi";
import { ScheduleApi } from "../../../../entities/Schedule/api/ScheduleApi";
import { VisitsApi } from "../../../../entities/Visit/api/VisitApi";
import { DiagnosisApi } from "../../../../entities/Diagnosis/api/DiagnosisApi";

const rootReducer = combineReducers({
  [DoctorApi.reducerPath]: DoctorApi.reducer,
  [AreaApi.reducerPath]: AreaApi.reducer,
  [CategoryApi.reducerPath]: CategoryApi.reducer,
  [GenderApi.reducerPath]: GenderApi.reducer,
  [PatientApi.reducerPath]: PatientApi.reducer,
  [SpecializationApi.reducerPath]: SpecializationApi.reducer,
  [StatusApi.reducerPath]: StatusApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [DayApi.reducerPath]: DayApi.reducer,
  [ScheduleApi.reducerPath]: ScheduleApi.reducer,
  [VisitsApi.reducerPath]: VisitsApi.reducer,
  [DiagnosisApi.reducerPath]: DiagnosisApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {serializableCheck: false}
    )
      .concat(DoctorApi.middleware)
      .concat(AreaApi.middleware)
      .concat(CategoryApi.middleware)
      .concat(GenderApi.middleware)
      .concat(PatientApi.middleware)
      .concat(SpecializationApi.middleware)
      .concat(StatusApi.middleware)
      .concat(UserApi.middleware)
      .concat(DayApi.middleware)
      .concat(ScheduleApi.middleware)
      .concat(VisitsApi.middleware)
      .concat(DiagnosisApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
