import { RegisterForm } from "../../../widgets/RegisterForm";
import cls from "./RegisterPage.module.scss";

export const RegisterPage = () => {
  return (
    <main>
      <div className={cls.block}>
        <div className={cls.blockRegister}>
          <RegisterForm />
        </div>
      </div>
      <div className={cls.bg}></div>
    </main>
  );
};
