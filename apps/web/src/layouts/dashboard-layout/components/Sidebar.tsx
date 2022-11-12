import useSwitchInstitute from '@web/hooks/useSwitchInstitute';
import { UICard, IconButton, ToolTip, UIBox, UIText } from '@quizrun/ui';
import SessionSelector from './SessionSelector';
import { AiFillSetting } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

const Sidebar = () => {
  const { currentInstitute, changeInstitute } = useSwitchInstitute();
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
          <li>
            <SessionSelector
              data-active={currentInstitute === '1'}
              onClick={changeInstitute.bind(this, '1')}
            >
              JIS
            </SessionSelector>
          </li>
          <li>
            <SessionSelector
              data-active={currentInstitute === '2'}
              onClick={changeInstitute.bind(this, '2')}
            >
              IIT
            </SessionSelector>
          </li>
        </UIBox>
      </UIBox>

      {/* Sidebar botttom actions */}
      <UIBox css={{ spaceY: '$3', paddingBottom: '$4' }}>
        <ToolTip title="Settings">
          <IconButton disabled>
            <AiFillSetting size={20} />
          </IconButton>
        </ToolTip>
        <ToolTip title="Logout">
          <IconButton>
            <BiLogOutCircle size={20} />
          </IconButton>
        </ToolTip>
      </UIBox>
    </UIBox>
  );
};

export default Sidebar;
