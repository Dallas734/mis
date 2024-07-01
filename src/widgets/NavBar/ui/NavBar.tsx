import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  getRouteDoctors,
  getRoutePatients,
  getRouteAddVisit,
  getRouteSchedule,
} from "../../../shared/const/router";

const role = "Registrator";

export const NavBar = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar>
        <Menu>
          <MenuItem>Пользователь</MenuItem>
          {role === "Registrator" ? (
            <>
              <MenuItem component={<Link to={getRouteDoctors()} />}>
                Доктора
              </MenuItem>
              <MenuItem component={<Link to={getRouteSchedule()} />}>
                Расписание
              </MenuItem>
              <MenuItem component={<Link to={getRoutePatients()} />}>
                Пациенты
              </MenuItem>
              <MenuItem component={<Link to={getRouteAddVisit()} />}>
                Записать пациента
              </MenuItem>
            </>
          ) : (
            <MenuItem>Просмотреть записи</MenuItem>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};
