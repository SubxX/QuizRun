import { useUserQuery } from '@web/queries/auth.queries';
import { ReactNode } from 'react';
import { useOrgDetailsContext } from '../Context';

const PermissionHandler = ({
  children,
}: {
  children: ReactNode | ((owner: boolean) => ReactNode);
}) => {
  const { organization } = useOrgDetailsContext();
  const { data: user } = useUserQuery();
  const isOwner = user?.id === organization?.created_by;

  if (typeof children === 'function') return children(isOwner);

  if (!isOwner) return <></>;
  return children;
};

export default PermissionHandler;
