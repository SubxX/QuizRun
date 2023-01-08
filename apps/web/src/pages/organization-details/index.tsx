import {
  UIGridBox,
  UIIconButton,
  UIText,
  UIFlexBox,
  UIDropdownMenu,
  UIDialog,
  UIAlertDialog,
} from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { AiFillSetting } from 'react-icons/ai';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import QuizList from './components/QuizList';
import ContenxtWrapper, { useOrgDetailsContext } from './Context';

import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import CreateEditOrganization from '@web/shared/CreateEditOrganization';
import { deleteOrganization } from '@web/api/organization.api';
import { useGetMyOrganizationStore } from '@web/store/organization.store';
import PermissionHandler from './components/PermissionHandler';
import { preventDefault } from '@web/utils/app.utils';

const Page = () => {
  const { organization, mutateData } = useOrgDetailsContext();
  const type = useSearchParams()[0].get('type');
  const navigate = useNavigate();
  const { removeOrganization } = useGetMyOrganizationStore();

  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  const deleteOrganizationHandler = async () => {
    try {
      await deleteOrganization(organization?.id as string);
      removeOrganization(organization?.id as string);
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header
        title={organization?.name ?? ''}
        backButton
        actions={
          <PermissionHandler>
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

                <UIAlertDialog
                  subtitle="You are about to delete this organization"
                  onResolve={deleteOrganizationHandler}
                >
                  <UIDropdownMenu.Item color="danger" onSelect={preventDefault}>
                    Delete
                    <UIDropdownMenu.RightSlot>
                      <BsTrash />
                    </UIDropdownMenu.RightSlot>
                  </UIDropdownMenu.Item>
                </UIAlertDialog>
              </UIDropdownMenu.Content>
            </UIDropdownMenu>
          </PermissionHandler>
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
      <UIDialog open={open}>
        <UIDialog.Content>
          <UIDialog.Header
            title="Edit organization"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis culpa dolorum"
          />
          <CreateEditOrganization
            closeDialog={closeDialog}
            orgData={organization}
            updateOrganization={mutateData}
          />
        </UIDialog.Content>
      </UIDialog>
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
