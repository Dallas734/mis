import { useState, useCallback, useEffect } from "react";
import cls from "./LoginForm.module.scss";
import { Input } from "../../../shared/ui/Input";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../../../shared/ui/Button";
import { UserApi } from "../../../entities/User/api/UserApi";
import { LoginScheme } from "../../../entities/User";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [auth, { error }] = UserApi.useAuthMutation();
  const {
    data: user,
    isLoading,
    isSuccess,
    isFetching,
    error: isAuthError,
  } = UserApi.useIsAuthQuery();
  const [username, setUsername] = useState<string>("vernidub66@gmail.com");
  const [password, setPassword] = useState<string>("Baguvix_160403");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isAuthError && isSuccess && !isLoading && !isFetching)
      navigate("/main");
  }, [isAuthError, navigate, user, isSuccess, isLoading, isFetching]);

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
      if (data?.responseUser) navigate("/main");
    } catch (error) {
      console.log(error);
    }
  };

  const EyeIconClasses = classNames("eye-icon").split(" ");

  return (
    <form className={cls.LoginForm}>
      <label className={cls.head}>Здравствуйте!</label>
      <Input
        type="text"
        classes={InputClassesUser}
        placeholder="Email"
        onChange={setUsername}
        value={username}
      />
      <div className={cls.password}>
        <Input
          type={showPassword ? "text" : "password"}
          classes={InputClassesPassword}
          placeholder={"Пароль"}
          onChange={setPassword}
          value={password}
        />
        <Button
          classes={EyeIconClasses}
          onClick={() =>
            showPassword ? setShowPassword(false) : setShowPassword(true)
          }
        />
      </div>
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
        <label className={cls.red}>Вы ввели неверный логин или пароль</label>
      )}
      <Button
        classes={LoginButtonClasses}
        children={"Войти"}
        onClick={handleSubmitForm}
      />
      <Link to={"/register"}>На страницу регистрации</Link>
    </form>
  );
};
