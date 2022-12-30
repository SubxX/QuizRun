import { UIBox, UIButton, UIInput, UITextarea } from '@quizrun/ui';
import { BiBuilding } from 'react-icons/bi';
import { useForm, Controller } from 'react-hook-form';

type OrganizationForm = {
  name: string;
  description: string;
};
const CreateEditOrganization = ({ closeDialog }: { closeDialog: any }) => {
  const { control, handleSubmit } = useForm<OrganizationForm>();

  const submitForm = (value: OrganizationForm) => {
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

      <UIBox css={{ marginTop: '$5', spaceY: '$3' }}>
        <UIButton fullWidth>Submit</UIButton>
        <UIButton fullWidth color="light" type="button" onClick={closeDialog}>
          Cancel
        </UIButton>
      </UIBox>
    </UIBox>
  );
};

export default CreateEditOrganization;
