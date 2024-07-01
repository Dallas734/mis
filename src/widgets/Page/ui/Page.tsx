import { NavBar } from "../../NavBar";
import { memo, useContext, useEffect } from "react";
import cls from "./Page.module.scss";
import { Outlet, useNavigate } from "react-router";
// import { AuthContext } from "@/shared/lib/context/AuthContext";

export const Page = memo(() => {

  // const { isAuth } = useContext(AuthContext)
  // const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuth) {
//       navigate("/login");
//     }
//   }, [isAuth]);

//   if (!isAuth) {
//     return null;
//   }
  
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