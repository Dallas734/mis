import classNames from "classnames";
import { LoginForm } from "../../../features/LoginForm";
import cls from "./LoginPage.module.scss";

export const LoginPage = () => {

    const blockClasses = classNames('block').concat(' ');

  return (
    <main>
      <div className={cls.block}>
        <div className={cls.blockLogin}>
          <LoginForm />
        </div>
      </div>
      <div className={cls.bg}></div>
    </main>
  );
};
