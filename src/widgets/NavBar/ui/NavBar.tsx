import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  getRouteDoctors,
  getRoutePatients,
  getRouteAddVisit,
  getRouteSchedule,
  getRoutePatientCard,
  getRouteDoctorTalons,
} from "../../../shared/const/router";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Person,
  Schedule,
  Dataset,
  AppRegistration,
  Diversity1,
} from "@mui/icons-material";
import { useState } from "react";
import cls from "./NavBar.module.scss";
import { UserApi } from "../../../entities/User/api/UserApi";
import { Button } from "../../../shared/ui/Button";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [isCollapsed, setIsCollaspsed] = useState<boolean>(false);
  const { data: user } = UserApi.useIsAuthQuery();

  const [logoff] = UserApi.useLogoffMutation();

  const navigate = useNavigate();

  const setCollapse = () => {
    isCollapsed ? setIsCollaspsed(false) : setIsCollaspsed(true);
  };

  const LeaveClassesButton = classNames("leaveButton").split(" ");

  const handleLeave = () => {
    const handle = async () => {
      const response = await logoff();
      if (!response.error) navigate("/");
    };
    handle();
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
          {user?.roles.includes("Registrator") ? (
            <>
              <SubMenu label="Персонал" icon={<Person />}>
                <MenuItem
                  component={<Link to={getRouteDoctors()} />}
                  icon={<Dataset />}
                >
                  Данные о врачах
                </MenuItem>
                <MenuItem
                  component={<Link to={getRouteSchedule()} />}
                  icon={<Schedule />}
                >
                  Расписание
                </MenuItem>
              </SubMenu>
              <SubMenu label="Пациенты" icon={<Diversity1 />}>
                <MenuItem
                  component={<Link to={getRoutePatients()} />}
                  icon={<Dataset />}
                >
                  Данные о пациентах
                </MenuItem>
                <MenuItem
                  component={<Link to={getRouteAddVisit()} />}
                  icon={<AppRegistration />}
                >
                  Записать пациента
                </MenuItem>
              </SubMenu>
            </>
          ) : user?.roles.includes("Doctor") ? (
            <>
              <MenuItem
                component={<Link to={getRoutePatientCard()} />}
                icon={<Diversity1 />}
              >
                Медкарта
              </MenuItem>
              <MenuItem
                component={<Link to={getRouteDoctorTalons()} />}
                icon={<AppRegistration />}
              >
                Принять пациента
              </MenuItem>
            </>
          ) : (
            <></>
          )}
          <Button
            classes={LeaveClassesButton}
            children={"Выйти"}
            onClick={() => {
              handleLeave();
            }}
          />
        </Menu>
      </Sidebar>
    </div>
  );
};
