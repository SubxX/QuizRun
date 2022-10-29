import { HTMLProps } from 'react';
import cn from 'classnames';
import { IconType } from 'react-icons';
import { cardStyles } from './styles';

type CardHeaderProps = {
  title: string;
  subtitle: string;
  Icon: IconType;
};

const Card = ({
  className = '',
  children,
  ...rest
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...rest} className={cardStyles({ class: className })}>
      {children}
    </div>
  );
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

const Content = ({
  className = '',
  children,
  ...rest
}: HTMLProps<HTMLDivElement>) => {
  const classNames = cn('px-4', className);
  return (
    <div {...rest} className={classNames}>
      {children}
    </div>
  );
};

export default Object.assign(Card, { Header, Content });
