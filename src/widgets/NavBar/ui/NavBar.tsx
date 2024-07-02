import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  getRouteDoctors,
  getRoutePatients,
  getRouteAddVisit,
  getRouteSchedule,
} from "../../../shared/const/router";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Person, Schedule, Dataset, AppRegistration, Diversity1 } from "@mui/icons-material";
import { useState } from "react";
import cls from './NavBar.module.scss';

const role = "Registrator";

export const NavBar = () => {
  const [isCollapsed, setIsCollaspsed] = useState<boolean>(false);

  const setCollapse = () => {
    isCollapsed ? setIsCollaspsed(false) : setIsCollaspsed(true);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={isCollapsed} className={cls.nav}>
        <Menu>
          <MenuItem
            component={<Link to="/main" />}
            icon={<MenuRoundedIcon onClick={() => setCollapse()} />}
          >
            МИС
          </MenuItem>
          <div>Копонент Аккаунта</div>
          {role === "Registrator" ? (
            <>
              <SubMenu label="Персонал" icon={<Person />}>
                <MenuItem component={<Link to={getRouteDoctors()} />} icon={<Dataset />}>
                  Данные о врачах
                </MenuItem>
                <MenuItem component={<Link to={getRouteSchedule()} />} icon={<Schedule />}>
                  Расписание
                </MenuItem>
              </SubMenu>
              <SubMenu label="Пациенты" icon={<Diversity1 />}>
                <MenuItem component={<Link to={getRoutePatients()} />} icon={<Dataset />}>
                  Данные о пациентах
                </MenuItem>
                <MenuItem component={<Link to={getRouteAddVisit()} />} icon={<AppRegistration />}>
                  Записать пациента
                </MenuItem>
              </SubMenu>
            </>
          ) : (
            <MenuItem>Просмотреть записи</MenuItem>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};
