import {
  UIGridBox,
  UIIconButton,
  UIText,
  UIFlexBox,
  UIBox,
  ErrorView,
  rotate,
  NotFoundView,
  UIButton,
} from '@quizrun/ui';
import useFetch from '@web/hooks/useFetch';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { AiOutlineMail, AiOutlineGlobal, AiOutlineHeart } from 'react-icons/ai';
import {
  Link,
  useSearchParams,
  useParams,
  useNavigate,
} from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import QuizList from './components/QuizList';
import { getOrganizationDetails } from '@web/api/organization.api';
import { ImSpinner9 } from 'react-icons/im';
import { AiFillSetting } from 'react-icons/ai';

const OrganizationDetails = () => {
  const type = useSearchParams()[0].get('type');
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, data, error } = useFetch(
    () => getOrganizationDetails(id as string),
    [id]
  );

  if (loading)
    return (
      <UIBox className="h-full flex-center" css={{ spaceX: '$3' }}>
        <UIText color="white-muted">Loading</UIText>
        <ImSpinner9
          display="block"
          style={{ animation: `${rotate} 1s linear infinite` }}
        />
      </UIBox>
    );

  if (error)
    return (
      <Container className="h-full flex-center">
        {error?.message === '404' ? (
          <NotFoundView>
            <UIButton
              css={{ marginTop: '$5' }}
              onClick={navigate.bind(this, -1)}
            >
              I understand take me back
            </UIButton>
          </NotFoundView>
        ) : (
          <ErrorView errorMessage={error?.message} />
        )}
      </Container>
    );

  return (
    <Container>
      <Header
        title={data?.name ?? ''}
        backButton
        actions={
          <UIIconButton>
            <AiFillSetting />
          </UIIconButton>
        }
      />

      <UIText color="white-muted" fontSize="sm">
        {data?.description}
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
          <DepartmentList departments={data?.departments} />
        )}
      </UIGridBox>
    </Container>
  );
};

export default OrganizationDetails;
