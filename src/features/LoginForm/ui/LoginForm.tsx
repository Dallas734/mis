import { useState } from "react";
import cls from "./LoginForm.module.scss";
import { Input } from "../../../shared/ui/Input";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../../../shared/ui/Button";

export const LoginForm = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [remember, setRemember] = useState<boolean>();

  const navigate = useNavigate();

  const InputClassesUser = classNames("input-m", "icon", "user").split(" ");

  const InputClassesPassword = classNames("input-m", "icon", "password").split(
    " "
  );

  const LoginButtonClasses = classNames("loginButton", "border-radius").split(
    " "
  );

  return (
    <form className={cls.LoginForm}>
      <label className={cls.head}>Здравствуйте!</label>
      <Input type="text" classes={InputClassesUser} placeholder="Логин" />
      <Input
        type="password"
        classes={InputClassesPassword}
        placeholder={"Пароль"}
      />
      <Button type={"submit"} classes={LoginButtonClasses} children={"Войти"}/>
    </form>
  );
};
