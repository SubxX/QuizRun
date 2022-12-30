import { UICard, UIIconButton } from '@quizrun/ui';
import useObjectLoader from '@web/hooks/useObjectLoader';
import { BsTrash } from 'react-icons/bs';
import { useOrgDetailsContext } from '../Context';
import AddDepartment from './AddDepartment';
import { removeDepartmentFromOrg } from '@web/api/department.api';
import { IOrganizationDepartment } from '@web/store/organization.store';

const DepartmentList = () => {
  const { organization, manageDepartment } = useOrgDetailsContext();
  const { loaders, createLoader, removeLoader } = useObjectLoader();

  const deleteDepartment = async (dep: IOrganizationDepartment) => {
    try {
      createLoader(dep.id);
      await removeDepartmentFromOrg(dep.id);
      manageDepartment(dep, 'remove');
    } catch (error) {
      console.log(error);
    } finally {
      removeLoader(dep.id);
    }
  };

  return (
    <>
      {organization?.departments.map((d: any) => {
        return (
          <UICard key={d.id}>
            <UICard.Header
              title={d?.name ?? ''}
              subtitle={d?.description ?? ''}
              actions={
                <UIIconButton
                  size="sm"
                  onClick={deleteDepartment.bind(this, d)}
                  loading={loaders[d.id]}
                >
                  <BsTrash size={16} />
                </UIIconButton>
              }
            />
          </UICard>
        );
      })}

      <AddDepartment />
    </>
  );
};

export default DepartmentList;
