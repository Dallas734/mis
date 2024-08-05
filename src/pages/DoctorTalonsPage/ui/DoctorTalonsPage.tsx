import cls from "./DoctorTalonsPage.module.scss";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { VisitsApi } from "../../../entities/Visit/api/VisitsApi";
import { UserApi } from "../../../entities/User/api/UserApi";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Visit } from "../../../entities/Visit";
import { DiagnosisApi } from "../../../entities/Diagnosis/api/DiagnosisApi";
import { Select } from "../../../shared/ui/Select";
import classNames from "classnames";
import { ProcedureApi } from "../../../entities/Procedure/api/ProcedureApi";
import { Button } from "../../../shared/ui/Button";

export const DoctorTalonsPage = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const { data: user } = UserApi.useIsAuthQuery();
  const { data: talons } = VisitsApi.useGetTalonsQuery({
    doctorId: user?.doctorId?.toString(),
    date: selectedDate,
  });
  const [completeVisit] = VisitsApi.useCompleteVisitMutation();
  const [activeId, setActiveId] = useState<number>();
  const [selectedElement, setSelectedElement] = useState<Visit | undefined>();
  const [diagnosisId, setDiagnosisId] = useState<string>("");
  const [procedureId, setProcedureId] = useState<string>("");
  const [recipe, setRecipe] = useState<string>("");
  const { data: diagnoses } = DiagnosisApi.useFetchAllDiagnosesQuery();
  const { data: procedures } = ProcedureApi.useFetchAllProceduresQuery();

  const selectClasses = classNames("Select").split(" ");

  const createButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "createButton"
  ).split(" ");

  const handleCompleteButton = () => {
    completeVisit({
        id: selectedElement?.id,
        patient: selectedElement?.patient,
        diagnosis: { id: diagnosisId ? Number(diagnosisId) : 0, name: "" },
        recipe: recipe,
        procedure: { id: procedureId ? Number(procedureId) : 0, name: "" },
        dateT: selectedElement?.dateT,
        timeT: selectedElement?.timeT,
        doctor: selectedElement?.doctor,
    })
  };

  return (
    <div className={cls.page}>
      <div className={cls.inputs}>
        <div className={cls.inputField}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
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
                      ? cls.isWait
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
          <div className={cls.inputField}>
            <label>Диагноз:</label>
            <Select
              data={diagnoses}
              selectValue={"id"}
              selectLabel={"name"}
              value={diagnosisId}
              onChange={setDiagnosisId}
              classes={selectClasses}
            />
          </div>
          <div className={cls.inputField}>
            <label>Процедура:</label>
            <Select
              data={procedures}
              selectValue={"id"}
              selectLabel={"name"}
              value={procedureId}
              onChange={setProcedureId}
              classes={selectClasses}
            />
          </div>
          <div className={cls.inputField}>
            <textarea
              name="recipe"
              key="recipe"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
              rows={4}
              placeholder="Рецепт"
              style={{ marginBottom: "10px", resize: "none", height: '150px' }}
            />
          </div>
          <div className={cls.buttons}>
            <Button
              children="Завершить запись"
              classes={createButtonClasses}
              onClick={handleCompleteButton}
              disabled={
                selectedElement && selectedElement.visitStatus && diagnosisId
                  ? false
                  : true
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
