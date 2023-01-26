import {
  UIGridBox,
  UIIconButton,
  UIText,
  UIFlexBox,
  UIDropdownMenu,
  UIDialog,
  UIAlertDialog,
  useBoolean,
} from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { AiFillSetting } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import QuizList from './components/tabs/QuizList';
import ContenxtWrapper, { useOrgDetailsContext } from './Context';

import { BsTrash } from 'react-icons/bs';
import CreateEditOrganization from '@web/shared/CreateEditOrganization';
import PermissionHandler from './components/PermissionHandler';
import { preventDefault } from '@web/utils/app.utils';
import { useDeleteOrganizationMutation } from '@web/queries/organization.query';

const Page = () => {
  const { organization } = useOrgDetailsContext();
  const navigate = useNavigate();
  const { mutateAsync: deleteOrganization } = useDeleteOrganizationMutation();

  const {
    value: editOpen,
    off: closeEditDialog,
    on: openEditDialog,
  } = useBoolean();

  const deleteOrganizationHandler = async () => {
    try {
      await deleteOrganization(organization?.id as string);
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
                <UIDropdownMenu.Item onClick={openEditDialog}>
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
        <UIText>Quizes</UIText>
      </UIFlexBox>

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        <QuizList />
      </UIGridBox>

      {/*  Edit Organization Dialog */}
      <UIDialog open={editOpen}>
        <UIDialog.Content>
          <UIDialog.Header
            title="Edit organization"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis culpa dolorum"
          />
          <CreateEditOrganization
            closeDialog={closeEditDialog}
            orgData={organization}
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
