import {
  UIIconButton,
  ToolTip,
  UIBox,
  UIText,
  UIAlertDialog,
} from '@quizrun/ui';
import SessionSelector from './SessionSelector';
import { AiFillSetting } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@web/hooks/useAuth';
import AddOrganization from './AddOrganization';
import { useUserQuery } from '@web/queries/auth.queries';
import { NavLink } from 'react-router-dom';
import { useMyOrganizationsQuery } from '@web/queries/organization.query';

const Sidebar = () => {
  const { data: user } = useUserQuery();
  const { data: myOrgs = [] } = useMyOrganizationsQuery(user?.id as string);
  const navigate = useNavigate();
  const { signout } = useAuth();

  const logout = async () => {
    await signout();
    navigate('/auth/signin');
  };

  return (
    <UIBox
      as="aside"
      css={{
        width: '64px',
        height: '100%',
        position: 'sticky',
        top: 0,
        left: 0,
        background: '$card',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Sidebar Logo */}
      <UIBox
        as={Link}
        to="/"
        css={{
          height: '64px',
          textAlign: 'center',
          width: '100%',
          background: 'rgba($white-rgb,0.2)',
        }}
        className="flex-center"
      >
        <UIText fontSize="xl">QR</UIText>
      </UIBox>

      {/* Sidebar Favorites */}
      <UIBox css={{ padding: '$2', marginTop: '$3', flex: 1, width: '100%' }}>
        <UIBox as="ul" css={{ spaceY: '$3' }}>
          {myOrgs.map((org) => (
            <li key={`nav-${org.id}`}>
              <NavLink to={`/organization/${org.id}`}>
                {({ isActive }) => (
                  <SessionSelector active={isActive}>
                    {org.name}
                  </SessionSelector>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <AddOrganization />
          </li>
        </UIBox>
      </UIBox>

      {/* Sidebar botttom actions */}
      <UIBox css={{ spaceY: '$3', paddingBottom: '$3' }}>
        <ToolTip title="Change password">
          <NavLink to={`/change-password`}>
            <UIIconButton>
              <AiFillSetting size={20} />
            </UIIconButton>
          </NavLink>
        </ToolTip>

        <UIAlertDialog
          subtitle="You are about to logout from this this platform"
          onResolve={logout}
        >
          <div>
            <ToolTip title="Logout">
              <UIIconButton>
                <BiLogOutCircle size={20} />
              </UIIconButton>
            </ToolTip>
          </div>
        </UIAlertDialog>
      </UIBox>
    </UIBox>
  );
};

export default Sidebar;
