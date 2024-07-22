import "./Select.module.scss";
import cnBind from "classnames/bind";
import cls from "./Select.module.scss";

export interface Option {
  value: string | number | readonly string[] | undefined;
  label: string;
}

interface SelectProps<T> {
  classes?: string[];
  data?: Array<T>;
  selectValue: string | number | readonly string[] | undefined;
  selectLabel: string | number | readonly string[] | undefined;
  onChange?: (value: string) => void;
  value?: string | number | readonly string[] | undefined;
}
export const Select = <T extends Object>(props: SelectProps<T>) => {
  const cn = cnBind.bind(cls);
  const {
    classes = [],
    data = [],
    onChange,
    value,
    selectValue,
    selectLabel,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const options: Option[] = data?.map((el) => {
    type P = keyof typeof el;
    return {
      value: el[selectValue as P],
      label: el[selectLabel as P],
    };
  }) as Option[];

  classes.push("Select");
  return (
    <>
      <select
        className={cn(...classes.map((clsName) => cls[clsName] || clsName))}
        onChange={onChangeHandler}
        value={value}
        {...otherProps}
        required
      >
        <option value={""} key={""}></option>
        {options.map((el, index) => {
          return (
            <option value={el.value} key={index}>
              {el.label}
            </option>
          );
        })}
      </select>
    </>
  );
};
