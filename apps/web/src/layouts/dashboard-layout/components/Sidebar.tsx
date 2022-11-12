import useSwitchInstitute from '@web/hooks/useSwitchInstitute';
import { UICard, IconButton, ToolTip } from '@quizrun/ui';
import SessionSelector from './SessionSelector';
import { AiFillSetting } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

const Sidebar = () => {
  const { currentInstitute, changeInstitute } = useSwitchInstitute();
  return (
    <aside className="w-16 h-screen sticky top-0 left-0">
      <UICard
        css={{
          paddingTop: 0,
          height: '100%',
          border: 'none',
          rounded: 'none',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="bg-white bg-opacity-10 h-16 text-center flex-center w-full">
          <span className="text-xl tracking-widest">QR</span>
        </div>

        <div className="p-2 mt-3 flex-1 w-full">
          <ul className="space-y-3">
            <li>
              <SessionSelector
                name="JIS"
                isActive={currentInstitute === '1'}
                setactive={changeInstitute.bind(this, '1')}
              />
            </li>
            <li>
              <SessionSelector
                name="IIT"
                isActive={currentInstitute === '2'}
                setactive={changeInstitute.bind(this, '2')}
              />
            </li>

            {/* <li>
              <AddSessionButton />
            </li> */}
          </ul>
        </div>

        <div className="space-y-3">
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
        </div>
      </UICard>
    </aside>
  );
};

export default Sidebar;
