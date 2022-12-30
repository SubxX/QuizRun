import {
  UIGridBox,
  UIIconButton,
  UIText,
  UIFlexBox,
  UIDropdownMenu,
  UIDalog,
} from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import {
  AiOutlineMail,
  AiOutlineGlobal,
  AiOutlineHeart,
  AiFillSetting,
} from 'react-icons/ai';
import { Link, useSearchParams } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import QuizList from './components/QuizList';
import ContenxtWrapper, { useOrgDetailsContext } from './Context';

import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import CreateEditOrganization from '@web/shared/CreateEditOrganization';

const Page = () => {
  const { organization } = useOrgDetailsContext();
  const type = useSearchParams()[0].get('type');

  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  return (
    <Container>
      <Header
        title={organization?.name ?? ''}
        backButton
        actions={
          <>
            <UIDropdownMenu>
              <UIDropdownMenu.Trigger asChild>
                <UIIconButton>
                  <AiFillSetting />
                </UIIconButton>
              </UIDropdownMenu.Trigger>
              <UIDropdownMenu.Content align="end">
                <UIDropdownMenu.Item onClick={() => setOpen(true)}>
                  Edit
                </UIDropdownMenu.Item>
                <UIDropdownMenu.Item color="danger">
                  Delete
                  <UIDropdownMenu.RightSlot>
                    <BsTrash />
                  </UIDropdownMenu.RightSlot>
                </UIDropdownMenu.Item>
              </UIDropdownMenu.Content>
            </UIDropdownMenu>
          </>
        }
      />

      <UIText color="white-muted" fontSize="sm">
        {organization?.description}
      </UIText>

      {/* <UIFlexBox gap="2" css={{ margin: '$6 0' }}>
        <UIIconButton>
          <AiOutlineMail size={18} />
        </UIIconButton>
        <UIIconButton>
          <AiOutlineGlobal size={18} />
        </UIIconButton>
        <UIIconButton>
          <AiOutlineHeart size={18} />
        </UIIconButton>
      </UIFlexBox> */}

      <UIFlexBox gap="2" css={{ margin: '$6 0', fontSize: '$lg' }}>
        <UIText
          as={Link}
          css={{ color: !type ? '$primary' : 'white' }}
          to={`${location.pathname}`}
          replace={true}
        >
          Departments
        </UIText>
        <UIText
          as={Link}
          css={{ color: type === 'quizes' ? '$primary' : 'white' }}
          to={`${location.pathname}?type=quizes`}
          replace={true}
        >
          Quizes
        </UIText>
      </UIFlexBox>

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        {type == 'quizes' ? <QuizList /> : <DepartmentList />}
      </UIGridBox>

      {/*  Edit Organization Dialog */}
      <UIDalog open={open}>
        <UIDalog.Content>
          <UIDalog.Header
            title="Edit organization"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis culpa dolorum"
          />
          <CreateEditOrganization closeDialog={closeDialog} />
        </UIDalog.Content>
      </UIDalog>
    </Container>
  );
};

export default function OrganizationDetails() {
  return (
    <ContenxtWrapper>
      <Page />
    </ContenxtWrapper>
  );
}
