import { ReactNode } from "react";
import cn from "classnames";
import { IconType } from "react-icons";

type Props = {
  className?: string;
  children: ReactNode;
};

type CardHeaderProps = {
  title: string;
  subtitle: string;
  Icon: IconType;
};

const Card = ({ className = "", children }: Props) => {
  let classNames = cn(
    "bg-blackish rounded-lg border border-card py-4 space-y-4",
    className
  );
  return <div className={classNames}>{children}</div>;
};

const Header = ({ Icon, title, subtitle }: CardHeaderProps) => {
  return (
    <div className="px-4">
      <div className="flex items-center text-xl">
        {Icon && (
          <div className="bg-primary rounded-full p-2 mr-3">
            <Icon size={18} />
          </div>
        )}
        <span>{title}</span>
      </div>
      <p className="mt-2 text-white text-opacity-50 text-sm">{subtitle}</p>
    </div>
  );
};

const Content = ({ className = "", children }: Props) => {
  let classNames = cn("px-4", className);
  return <div className={classNames}>{children}</div>;
};

export default Object.assign(Card, { Header, Content });
