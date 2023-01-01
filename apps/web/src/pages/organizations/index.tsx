import { UIGridBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import OrganizationCard from './components/OrganizationCard';
import Header from '@web/layouts/dashboard-layout/components/Header';
import useFetch from '@web/hooks/useFetch';
import { IOrganization } from '@web/store/organization.store';
import { getAllOrganizations } from '@web/api/organization.api';

const Organizations = () => {
  const { data: organizations } = useFetch<IOrganization[]>(() =>
    getAllOrganizations()
  );

  return (
    <Container>
      <Header title="Organizations" />

      <UIGridBox
        columns={{
          '@md': '2',
          '@lg': '3',
        }}
        gap="3"
      >
        {organizations?.map((org) => (
          <OrganizationCard key={org.id} org={org} />
        ))}
      </UIGridBox>
    </Container>
  );
};

export default Organizations;
