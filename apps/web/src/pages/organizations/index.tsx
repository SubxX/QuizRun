import { UIGridBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import OrganizationCard from './components/OrganizationCard';
import Header from '@web/layouts/dashboard-layout/components/Header';

const Organizations = () => {
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
        {[1, 2, 3, 4, 5, 6].map((org) => (
          <OrganizationCard key={org} id={org} />
        ))}
      </UIGridBox>
    </Container>
  );
};

export default Organizations;
