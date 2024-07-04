import { NavBar } from "../../NavBar";
import { memo } from "react";
import cls from "./Page.module.scss";
import { Outlet } from "react-router";

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