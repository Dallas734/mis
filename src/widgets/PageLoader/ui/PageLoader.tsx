import cls from "./PageLoader.module.scss";

interface PageLoaderProps {
  className?: string;
}
const classNames = require("classnames");

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={classNames(cls.PageLoader, [className])}>
    <div className={classNames("lds-ellipsis", [className])}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
