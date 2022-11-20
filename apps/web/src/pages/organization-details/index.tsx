import { UIGridBox, UIIconButton, UIText, UIFlexBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { AiOutlineMail, AiOutlineGlobal, AiOutlineHeart } from 'react-icons/ai';
import { Link, useSearchParams } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import QuizList from './components/QuizList';

const OrganizationDetails = () => {
  const type = useSearchParams()[0].get('type');

  return (
    <Container>
      <Header title="JIS Institute of Engineering" backButton />

      <UIText color="white-muted" fontSize="sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standardLorem Ipsum is
        simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has been the industry's standardLorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        standardLorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standardLorem Ipsum is
        simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has been the industry's standard
      </UIText>

      <UIFlexBox gap="2" css={{ margin: '$6 0' }}>
        <UIIconButton>
          <AiOutlineMail size={18} />
        </UIIconButton>
        <UIIconButton>
          <AiOutlineGlobal size={18} />
        </UIIconButton>
        <UIIconButton>
          <AiOutlineHeart size={18} />
        </UIIconButton>
      </UIFlexBox>

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
        {type == 'quizes' ? <QuizList /> : <DepartmentList />}
      </UIGridBox>
    </Container>
  );
};

export default OrganizationDetails;
