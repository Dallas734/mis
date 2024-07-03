import { NavBar } from "../../NavBar";
import { memo, useContext, useEffect } from "react";
import cls from "./Page.module.scss";
import { Outlet, useNavigate } from "react-router";
import { UserApi } from "../../../entities/User/api/UserApi";
// import { AuthContext } from "@/shared/lib/context/AuthContext";

export const Page = memo(() => {
  
  return (
    <div className={cls.page}>
      <NavBar />
      <div className={cls.pageZone}>
        {/*<HistoryNav />*/}
        <main className={cls.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
});