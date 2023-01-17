import { UIGridBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import OrganizationCard from './components/OrganizationCard';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { useAllOrganizationsQuery } from '@web/queries/organization.query';

const Organizations = () => {
  const { data: organizations } = useAllOrganizationsQuery();

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
