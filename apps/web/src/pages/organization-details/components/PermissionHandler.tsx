import { useUserQuery } from '@web/queries/auth.queries';
import { useOrgDetailsContext } from '../Context';

const PermissionHandler = ({ children }: { children: JSX.Element }) => {
  const { organization } = useOrgDetailsContext();
  const { data: user } = useUserQuery();
  const isOwner = user?.id === organization?.created_by;

  if (!isOwner) return <></>;

  return children;
};

export default PermissionHandler;
