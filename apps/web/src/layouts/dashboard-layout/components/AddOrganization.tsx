import {
  UIBox,
  UIDalog,
  UIButton,
  UIInput,
  UITextarea,
  UILabel,
  UIChip,
  ToolTip,
} from '@quizrun/ui';
import { BiBuilding, BiGlobe } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import StyledSessionSelector from './SessionSelector';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDepartmentStore } from '@web/store/department.store';

type AddOrganizationForm = {
  name: string;
  website: string;
  description: string;
  subjects: string[];
};

const Form = ({ closeDialog }: { closeDialog: () => void }) => {
  const { control, handleSubmit } = useForm<AddOrganizationForm>();
  const { data: departments, loading, fetch } = useDepartmentStore();

  useEffect(() => {
    fetch();
  }, []);

  const submitForm = (value: AddOrganizationForm) => {
    console.log(value);
  };

  return (
    <UIBox as="form" css={{ spaceY: '$2' }} onSubmit={handleSubmit(submitForm)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <UIInput
            label="Name"
            type="text"
            placeholder="Enter Name"
            id="org_name"
            autoFocus={true}
            startAdornment={<BiBuilding />}
            value={value ?? ''}
            onChange={onChange}
            error={errors?.name?.message}
          />
        )}
      />

      <Controller
        name="website"
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <UIInput
            label="Website"
            type="text"
            placeholder="Enter Website"
            id="org_website"
            startAdornment={<BiGlobe />}
            value={value ?? ''}
            onChange={onChange}
            error={errors?.name?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <UITextarea
            label="Description"
            type="text"
            placeholder="Enter Description"
            id="org_description"
            value={value ?? ''}
            onChange={onChange}
            error={errors?.name?.message}
          />
        )}
      />

      <div>
        <UILabel>Departments</UILabel>
        <UIBox css={{ display: 'flex', flexWrap: 'wrap', gap: '$2' }}>
          {departments.map((department) => (
            <UIChip key={department.id}>{department.name}</UIChip>
          ))}
        </UIBox>
      </div>

      <UIBox css={{ marginTop: '$5', spaceY: '$3' }}>
        <UIButton fullWidth>Submit</UIButton>
        <UIButton fullWidth color="light" type="button" onClick={closeDialog}>
          Cancel
        </UIButton>
      </UIBox>
    </UIBox>
  );
};

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

      <UIDalog open={open}>
        <UIDalog.Content>
          <UIDalog.Header
            title="Create organization"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis culpa dolorum"
          />
          <Form closeDialog={closeDialog} />
        </UIDalog.Content>
      </UIDalog>
    </>
  );
};

export default AddOrganization;
