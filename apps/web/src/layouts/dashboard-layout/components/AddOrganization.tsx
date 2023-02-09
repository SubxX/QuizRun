import { UIDialog, ToolTip, UIAvatar } from '@quizrun/ui';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import CreateEditOrganization from '@web/shared/CreateEditOrganization';

const AddOrganization = () => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);
  const openDialog = () => setOpen(true);

  return (
    <>
      <ToolTip title="Create organization" align="center">
        <button onClick={openDialog} className="cursor-pointer">
          <UIAvatar size="sm">
            <AiOutlinePlus size={20} />
          </UIAvatar>
        </button>
      </ToolTip>

      <UIDialog open={open}>
        <UIDialog.Content>
          <UIDialog.Header
            title="Create organization"
            description="Create your own organization on quizRun you can manage all your quizzes from here."
          />
          <CreateEditOrganization closeDialog={closeDialog} />
        </UIDialog.Content>
      </UIDialog>
    </>
  );
};

export default AddOrganization;
