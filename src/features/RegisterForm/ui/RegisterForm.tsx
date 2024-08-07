import cls from "./RegisterForm.module.scss";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Input } from "../../../shared/ui/Input";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { Button } from "../../../shared/ui/Button";
import { ROLES } from "../../../shared/types/constants";
import { UserApi } from "../../../entities/User/api/UserApi";
import { RegisterResponse, RegisterScheme } from "../../../entities/User";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [register] = UserApi.useRegisterMutation();
  const {
    data: user,
    error: isAuthError,
    isSuccess,
    isLoading,
    isFetching,
  } = UserApi.useIsAuthQuery();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string>("Doctor");

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isAuthError && isSuccess && !isLoading && !isFetching)
      navigate("/main");
  }, [isAuthError, navigate, user, isSuccess, isLoading, isFetching]);

  const InputClassesUser = classNames("input-m", "icon", "user").split(" ");

  const InputClassesPassword = classNames("input-m", "icon", "password").split(
    " "
  );

  const InputClassesEmail = classNames("input-m", "icon", "email").split(" ");

  const EyeIconClasses = classNames("eye-icon").split(" ");

  const RegisterButtonClasses = classNames(
    "registerButton",
    "border-radius"
  ).split(" ");

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirm) throw new Error("Пароли не совпадают");

      const registerScheme: RegisterScheme = {
        email,
        password,
        passwordConfirm,
        doctorId: doctorId ? Number(doctorId) : undefined,
        role,
      };

      const { error } = await register(registerScheme);
      if (error && "data" in error) {
        const regResponse = error.data as RegisterResponse;
        setErrorMsg(regResponse.message);
      } else {
        setErrorMsg("Добавлен новый пользователь");
      }
    } catch (e) {
      const error = e as Error;
      setErrorMsg(error.message);
    }
  };

  return (
    <form className={cls.RegisterForm} onSubmit={(e) => handleSubmitForm(e)}>
      <label className={cls.head}>Регистрация</label>
      <RadioGroup
        row
        aria-required
        onChange={(e) => {
          setRole(e.target.value);
          setDoctorId("");
        }}
        defaultValue={role}
      >
        <FormControlLabel
          value={ROLES.REGISTRATOR}
          control={<Radio />}
          label="Регистратор"
        />
        <FormControlLabel
          value={ROLES.DOCTOR}
          control={<Radio />}
          label="Врач"
        />
      </RadioGroup>
      <Input
        type="text"
        classes={InputClassesUser}
        placeholder="Уникальный номер"
        onChange={setDoctorId}
        value={doctorId}
        required
        disabled={role === ROLES.DOCTOR ? false : true}
      />
      <Input
        type="email"
        classes={InputClassesEmail}
        placeholder="Email"
        onChange={setEmail}
        value={email}
        required
      />
      <div className={cls.password}>
        <Input
          type={showPassword ? "text" : "password"}
          classes={InputClassesPassword}
          placeholder={"Пароль"}
          onChange={setPassword}
          value={password}
          required
          pattern='^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? _"]).*$'
          title={
            "Пароль должен должен состоять минимум из 6 символов, содержать только латинские символы, содержать заглавные, строчные буквы, цифры и специальные символы"
          }
        />
        <Button
          classes={EyeIconClasses}
          onClick={() =>
            showPassword ? setShowPassword(false) : setShowPassword(true)
          }
        />
      </div>
      <div className={cls.password}>
        <Input
          type={showPasswordConfirm ? "text" : "password"}
          classes={InputClassesPassword}
          placeholder={"Повторите пароль"}
          onChange={setConfirmPassword}
          value={passwordConfirm}
          required
          pattern='^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? _"]).*$'
        />
        <Button
          classes={EyeIconClasses}
          onClick={() =>
            showPasswordConfirm
              ? setShowPasswordConfirm(false)
              : setShowPasswordConfirm(true)
          }
        />
      </div>
      {errorMsg && <label className={cls.red}>{errorMsg}</label>}
      <Button
        type="submit"
        classes={RegisterButtonClasses}
        children={"Зарегистрироваться"}
      />
      <Link to={"/"}>На страницу входа</Link>
    </form>
  );
};
