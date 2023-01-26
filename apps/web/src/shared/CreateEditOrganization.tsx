import { UIBox, UIButton, UIInput, UITextarea, UIFlexBox } from '@quizrun/ui';
import { BiBuilding } from 'react-icons/bi';
import { useForm, Controller } from 'react-hook-form';
import { useUserQuery } from '@web/queries/auth.queries';
import { IOrganization } from '@web/api/organization.api';
import {
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
} from '@web/queries/organization.query';

type OrganizationForm = {
  name: string;
  description: string;
};

type Props = {
  closeDialog: any;
  orgData?: IOrganization;
};

const CreateEditOrganization = ({ closeDialog, orgData }: Props) => {
  const { control, handleSubmit } = useForm<OrganizationForm>({
    defaultValues: {
      name: orgData?.name ?? '',
      description: orgData?.description ?? '',
    },
  });
  const { data: user } = useUserQuery();

  const { mutateAsync: addOrganization, isLoading: createLoading } =
    useCreateOrganizationMutation();
  const { mutateAsync: updateOrganization, isLoading: updateLoading } =
    useUpdateOrganizationMutation();

  const isEditing = Boolean(orgData);
  const loading = createLoading || updateLoading;

  const submitForm = async (payload: OrganizationForm) => {
    try {
      if (!isEditing) {
        await addOrganization({ ...payload, created_by: user?.id as string });
      } else {
        await updateOrganization({ ...payload, id: orgData?.id as string });
      }
      closeDialog();
    } catch (error) {
      console.log(error);
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
            value={value}
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
            value={value}
            onChange={onChange}
            error={errors?.name?.message}
          />
        )}
      />

      <UIFlexBox justify="end" css={{ marginTop: '$5', spaceX: '$2' }}>
        <UIButton type="submit" loading={loading}>
          {isEditing ? 'Save' : 'Submit'}
        </UIButton>
        <UIButton color="light" onClick={closeDialog} disabled={loading}>
          Cancel
        </UIButton>
      </UIFlexBox>
    </UIBox>
  );
};

export default CreateEditOrganization;
