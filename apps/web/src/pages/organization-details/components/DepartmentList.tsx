import { UICard, UIFlexBox, UIText } from '@quizrun/ui';
import { IDepartment, useDepartmentStore } from '@web/store/department.store';
import { useMemo } from 'react';
import { useOrgDetailsContext } from '../Context';
import { BsClipboardData } from 'react-icons/bs';

const DepartmentList = () => {
  const { organization } = useOrgDetailsContext();
  const { data, loading } = useDepartmentStore();

  const departmentMap = useMemo(
    () =>
      data.reduce((acc, dep) => {
        acc[dep.id] = dep;
        return acc;
      }, {} as Record<string, IDepartment>),

    [data]
  );

  if (loading)
    return (
      <UIText fontSize="sm" color="light-white">
        Loading
      </UIText>
    );

  if (!organization?.departments?.length)
    return (
      <UIFlexBox
        css={{
          gridColumn: 'span 3',
          color: '$light-white',
        }}
        gap="3"
        items="center"
      >
        <BsClipboardData size={30} />
        <UIText fontSize="sm">No departments</UIText>
      </UIFlexBox>
    );

  return (
    <>
      {organization?.departments?.map((depId: any) => {
        return (
          <UICard key={depId}>
            <UICard.Header
              title={departmentMap[depId]?.name ?? ''}
              subtitle={departmentMap[depId]?.description ?? ''}
            />
          </UICard>
        );
      })}
    </>
  );
};

export default DepartmentList;
