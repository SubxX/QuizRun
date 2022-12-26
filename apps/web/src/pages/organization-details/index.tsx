import {
  UIGridBox,
  UIIconButton,
  UIText,
  UIFlexBox,
  UIBox,
  ErrorView,
  rotate,
} from '@quizrun/ui';
import useFetch from '@web/hooks/useFetch';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { AiOutlineMail, AiOutlineGlobal, AiOutlineHeart } from 'react-icons/ai';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import QuizList from './components/QuizList';
import { Organization } from '@web/store/organization.store';
import { getOrganizationDetails } from '@web/api/organization.api';
import { ImSpinner9 } from 'react-icons/im';

const OrganizationDetails = () => {
  const type = useSearchParams()[0].get('type');
  const { id } = useParams();

  const { loading, data, error } = useFetch<Organization[]>(
    () => getOrganizationDetails(id as string),
    [id]
  );
  const organization = data?.[0];

  if (loading)
    return (
      <UIBox
        className="flex-center"
        css={{
          padding: '$4',
          height: '100%',
          spaceX: '$3',
        }}
      >
        <UIText color="white-muted">Loading</UIText>
        <ImSpinner9
          display="block"
          style={{ animation: `${rotate} 1s linear infinite` }}
        />
      </UIBox>
    );
  if (error) return <ErrorView errorMessage={error?.message} />;

  return (
    <Container>
      <Header title={organization?.name ?? ''} backButton />

      <UIText color="white-muted" fontSize="sm">
        {organization?.description}
      </UIText>

      {/* <UIFlexBox gap="2" css={{ margin: '$6 0' }}>
        <UIIconButton>
          <AiOutlineMail size={18} />
        </UIIconButton>
        <UIIconButton>
          <AiOutlineGlobal size={18} />
        </UIIconButton>
        <UIIconButton>
          <AiOutlineHeart size={18} />
        </UIIconButton>
      </UIFlexBox> */}

      <UIFlexBox gap="2" css={{ margin: '$6 0', fontSize: '$lg' }}>
        <UIText
          as={Link}
          css={{ color: !type ? '$primary' : 'white' }}
          to={`${location.pathname}`}
          replace={true}
        >
          Departments
        </UIText>
        <UIText
          as={Link}
          css={{ color: type === 'quizes' ? '$primary' : 'white' }}
          to={`${location.pathname}?type=quizes`}
          replace={true}
        >
          Quizes
        </UIText>
      </UIFlexBox>

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        {type == 'quizes' ? (
          <QuizList />
        ) : (
          <DepartmentList
            departments={organization?.organization_departments}
          />
        )}
      </UIGridBox>
    </Container>
  );
};

export default OrganizationDetails;
