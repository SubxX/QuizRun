import useSwitchInstitute from '@web/hooks/useSwitchInstitute';
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
import { useGetMyOrganizationStore } from '@web/store/organization.store';
import { useEffect } from 'react';
import { useUserStore } from '@web/store/user.store';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useUserStore();
  const { fetch, data: myOrgs } = useGetMyOrganizationStore();
  const navigate = useNavigate();
  const { signout } = useAuth();

  useEffect(() => {
    if (user?.id) fetch(user?.id);
  }, [user]);

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

      {/* Sidebar Fevourites */}
      <UIBox css={{ padding: '$2', marginTop: '$3', flex: 1, width: '100%' }}>
        <UIBox as="ul" css={{ spaceY: '$3' }}>
          {myOrgs.map((org) => (
            <li key={`nav-${org.id}`}>
              <NavLink to={`/organization/${org.id}`}>
                {({ isActive }) => (
                  <SessionSelector as="div" data-active={isActive}>
                    {org.name
                      .split(' ')
                      .map((word) => word[0].toUpperCase())
                      .join('')}
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
        <ToolTip title="Settings">
          <UIIconButton disabled>
            <AiFillSetting size={20} />
          </UIIconButton>
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
