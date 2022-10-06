import classNames from "classnames";
import { MouseEventHandler } from "react";

interface Props {
  name: string;
  isActive: boolean;
  setactive: MouseEventHandler<HTMLDivElement>;
}

const SessionSelector = ({ name, isActive, setactive }: Props) => {
  var rootClassNames = classNames(
    "tracking-wide h-12 flex items-center justify-center relative group",
    "rounded-full hover:rounded-xl",
    isActive
      ? "rounded-xl cursor-default bg-primary"
      : "cursor-pointer bg-white bg-opacity-10"
  );
  const lineClassNames = classNames(
    "absolute top-2/4 transform -translate-y-2/4 bg-white rounded-r-2xl w-1 transition-all",
    isActive ? "-left-2 h-2/3" : "h-2/5 -left-3 group-hover:-left-2"
  );

  return (
    <div className={rootClassNames} onClick={setactive}>
      <span>{name}</span>
      <span className={lineClassNames} />
    </div>
  );
};

export default SessionSelector;
