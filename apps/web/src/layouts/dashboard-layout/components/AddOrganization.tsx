import { UIDialog, ToolTip } from '@quizrun/ui';
import { AiOutlinePlus } from 'react-icons/ai';
import StyledSessionSelector from './SessionSelector';
import { useState } from 'react';
import CreateEditOrganization from '@web/shared/CreateEditOrganization';

const AddOrganization = () => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);
  const openDialog = () => setOpen(true);

  return (
    <>
      <ToolTip title="Add organzation" align="center">
        <StyledSessionSelector
          as="button"
          className="flex-center"
          onClick={openDialog}
        >
          <AiOutlinePlus size={20} />
        </StyledSessionSelector>
      </ToolTip>

      <UIDialog open={open}>
        <UIDialog.Content>
          <UIDialog.Header
            title="Create organization"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis culpa dolorum"
          />
          <CreateEditOrganization closeDialog={closeDialog} />
        </UIDialog.Content>
      </UIDialog>
    </>
  );
};

export default AddOrganization;
