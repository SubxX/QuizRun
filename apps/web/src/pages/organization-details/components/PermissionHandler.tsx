import { useUserStore } from '@web/store/user.store';
import { useOrgDetailsContext } from '../Context';

const PermissionHandler = ({ children }: { children: JSX.Element }) => {
  const { organization } = useOrgDetailsContext();
  const { user } = useUserStore();
  const isOwner = user?.id === organization?.created_by;

  if (!isOwner) return <></>;

  return children;
};

export default PermissionHandler;
