import {
  UIBox,
  UIButton,
  UIInput,
  UITextarea,
  UIChip,
  UILabel,
  UIFlexBox,
  useBoolean,
} from '@quizrun/ui';
import { BiBuilding } from 'react-icons/bi';
import { useForm, Controller } from 'react-hook-form';
import {
  createOrganization,
  editOrganization,
} from '@web/api/organization.api';
import { useUserStore } from '@web/store/user.store';
import {
  IOrganization,
  useGetMyOrganizationStore,
} from '@web/store/organization.store';
import { useDepartmentStore } from '@web/store/department.store';

type OrganizationForm = {
  name: string;
  description: string;
  departments: string[];
};

type Props = {
  closeDialog: any;
  orgData?: IOrganization;
  updateOrganization?: (org: IOrganization) => void;
};

const CreateEditOrganization = ({
  closeDialog,
  orgData,
  updateOrganization,
}: Props) => {
  const { control, handleSubmit, setValue, watch } = useForm<OrganizationForm>({
    defaultValues: {
      name: orgData?.name ?? '',
      description: orgData?.description ?? '',
      departments: orgData?.departments ?? [],
    },
  });
  const { user } = useUserStore();
  const { value: loading, set: setLoading } = useBoolean();
  const { addOrganization } = useGetMyOrganizationStore();
  const { data: departments } = useDepartmentStore();

  const formDeparments = watch('departments');
  const isEditing = Boolean(orgData);

  const submitForm = async (payload: OrganizationForm) => {
    try {
      setLoading(true);

      if (!isEditing) {
        const newOrg = await createOrganization({
          ...payload,
          created_by: user.id as string,
        });
        addOrganization(newOrg);
      } else {
        const updatedOrg = await editOrganization({
          ...payload,
          id: orgData?.id as string,
        });
        updateOrganization?.(updatedOrg);
      }

      closeDialog();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartment = (id: string) => {
    const value = formDeparments ?? [];
    setValue(
      'departments',
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id]
    );
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

      <UIBox>
        <UILabel>Departments</UILabel>
        <UIFlexBox gap={2} css={{ flexWrap: 'wrap' }}>
          {departments.map((department) => (
            <UIChip
              onClick={handleDepartment.bind(this, department.id)}
              selected={formDeparments.includes(department.id)}
              key={`org-form-deps-${department.id}`}
            >
              {department.name}
            </UIChip>
          ))}
        </UIFlexBox>
      </UIBox>

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
