import {
  UIBox,
  UICard,
  UIIconButton,
  UIDalog,
  UIFlexBox,
  UIText,
  UIButton,
  LoaderView,
} from '@quizrun/ui';
import { IDepartment, useDepartmentStore } from '@web/store/department.store';
import { useEffect, useMemo, useState } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useOrgDetailsContext } from '../Context';
import { addDepartmentToOrg } from '@web/api/department.api';
import { useUserStore } from '@web/store/user.store';
import useObjectLoader from '@web/hooks/useObjectLoader';

const Content = ({ closeDialog }: { closeDialog: () => void }) => {
  const { organization, manageDepartment } = useOrgDetailsContext();
  const { loading, data, fetch } = useDepartmentStore();
  const { loaders, createLoader, removeLoader } = useObjectLoader();

  const { user } = useUserStore();

  useEffect(() => {
    fetch();
  }, []);

  const filteredDepartments = useMemo(() => {
    const addedIds = organization?.departments?.map((d: any) => d.dep_id);
    return data.filter((d) => !addedIds?.includes(d.id));
  }, [organization?.departments, data]);

  const addDepartment = async (dep: IDepartment) => {
    try {
      createLoader(dep.id);
      const result = await addDepartmentToOrg({
        organization: organization?.id as string,
        department: dep.id,
        created_by: user?.id,
      });
      manageDepartment({ ...dep, id: result.id, dep_id: dep.id }, 'add');
    } catch (error) {
      console.log(error);
    } finally {
      removeLoader(dep.id);
    }
  };

  return (
    <UIBox css={{ spaceY: '$3' }}>
      {loading ? <LoaderView css={{ height: '114px' }} /> : null}
      {!loading && !Boolean(filteredDepartments.length) && (
        <UIText fontSize="sm" css={{ textAlign: 'center' }} color="light-white">
          No Departments to add
        </UIText>
      )}
      {filteredDepartments?.map((d) => {
        return (
          <UICard key={d.id} css={{ background: '$dark' }}>
            <UICard.Header
              title={d?.name ?? ''}
              subtitle={d?.description ?? ''}
              actions={
                <UIIconButton
                  size="sm"
                  onClick={addDepartment.bind(this, d)}
                  loading={loaders[d.id]}
                >
                  <BsPlusCircleDotted size={16} />
                </UIIconButton>
              }
            />
          </UICard>
        );
      })}
      <UIButton
        fullWidth
        color="light"
        onClick={closeDialog}
        disabled={Object.keys(loaders).length > 0}
      >
        All right
      </UIButton>
    </UIBox>
  );
};

const AddDepartment = () => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  return (
    <UIDalog open={open}>
      <UICard
        as="button"
        className="flex-center"
        hover
        onClick={() => setOpen(true)}
      >
        <UIFlexBox gap={3} items="center" css={{ color: '$white-muted' }}>
          <BsPlusCircleDotted size={30} />
          <UIText fontSize="sm">Add department</UIText>
        </UIFlexBox>
      </UICard>

      <UIDalog.Content>
        <UIDalog.Header
          title="Add departments"
          description="Choose your desired department from here and add them to you organization"
        />
        <Content closeDialog={closeDialog} />
      </UIDalog.Content>
    </UIDalog>
  );
};

export default AddDepartment;
