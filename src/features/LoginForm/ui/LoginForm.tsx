import { useState, useCallback } from "react";
import cls from "./LoginForm.module.scss";
import { Input } from "../../../shared/ui/Input";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../../../shared/ui/Button";
import { UserApi } from "../../../entities/User/api/UserApi";
import { LoginScheme, ResponseScheme } from "../../../entities/User";

export const LoginForm = () => {
  const [auth, { error }] = UserApi.useAuthMutation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const navigate = useNavigate();

  const InputClassesUser = classNames("input-m", "icon", "user").split(" ");

  const InputClassesPassword = classNames("input-m", "icon", "password").split(
    " "
  );

  const LoginButtonClasses = classNames("loginButton", "border-radius").split(
    " "
  );

  const CheckBoxClasses = classNames("checkbox", "sr-only").split(" ");

  const onChangeRemember = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  const handleSubmitForm = async () => {
    try {
      const loginScheme: LoginScheme = {
        email: username,
        password,
        rememberMe,
      };

      const { data } = await auth(loginScheme);
      navigate('/main');

      console.log(data?.responseUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={cls.LoginForm}>
      <label className={cls.head}>Здравствуйте!</label>
      <Input
        type="text"
        classes={InputClassesUser}
        placeholder="Email"
        onChange={setUsername}
      />
      <Input
        type="password"
        classes={InputClassesPassword}
        placeholder={"Пароль"}
        onChange={setPassword}

      />
      <label className={cls.inputWrapper} htmlFor="remember">
        <Input
          id="remember"
          type="checkbox"
          classes={CheckBoxClasses}
          onChange={onChangeRemember}
          checked={rememberMe}
        />
        Запомнить меня
      </label>
      {error && (
                    <label className={cls.red}>
                        Вы ввели неверный логин или пароль
                        </label>
                )}
      <Button
        classes={LoginButtonClasses}
        children={"Войти"}
        onClick={handleSubmitForm}
      />
    </form>
  );
};
