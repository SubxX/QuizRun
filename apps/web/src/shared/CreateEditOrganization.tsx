import { UIBox, UIButton, UIInput, UITextarea } from '@quizrun/ui';
import { BiBuilding } from 'react-icons/bi';
import { useForm, Controller } from 'react-hook-form';
import { createOrganization } from '@web/api/organization.api';
import { useUserStore } from '@web/store/user.store';
import { useGetMyOrganizationStore } from '@web/store/organization.store';
import useLoader from '@web/hooks/useLoader';

type OrganizationForm = {
  name: string;
  description: string;
};
const CreateEditOrganization = ({ closeDialog }: { closeDialog: any }) => {
  const { control, handleSubmit } = useForm<OrganizationForm>();
  const { user } = useUserStore();
  const { loading, startLoading, stopLoading } = useLoader();
  const { addOrganization } = useGetMyOrganizationStore();

  const submitForm = async (value: OrganizationForm) => {
    try {
      startLoading();
      const newOrg = await createOrganization({
        ...value,
        created_by: user.id as string,
      });
      addOrganization(newOrg);
      closeDialog();
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
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
        <UIButton fullWidth loading={loading}>
          Submit
        </UIButton>
        <UIButton
          fullWidth
          color="light"
          type="button"
          onClick={closeDialog}
          disabled={loading}
        >
          Cancel
        </UIButton>
      </UIBox>
    </UIBox>
  );
};

export default CreateEditOrganization;
