import { UIBox, UIGridBox, UIIconButton, UIText, UIFlexBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { AiOutlineMail, AiOutlineGlobal, AiOutlineHeart } from 'react-icons/ai';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import { useMemo } from 'react';
import QuizList from './components/QuizList';

const OrganizationDetails = () => {
  const { id } = useParams();
  const type = useSearchParams()[0].get('type') ?? 'department';
  const tabs: Record<string, JSX.Element | null> = useMemo(
    () => ({
      department: <DepartmentList />,
      quizes: <QuizList />,
    }),
    []
  );

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
        {Object.keys(tabs).map((key) => (
          <UIText
            key={key}
            as={Link}
            css={{
              color: type === key ? '$primary' : 'white',
              textTransform: 'capitalize',
            }}
            to={`/organization/${id}?type=${key}`}
          >
            {key}
          </UIText>
        ))}
      </UIFlexBox>

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        {tabs[type]}
      </UIGridBox>
    </Container>
  );
};

export default OrganizationDetails;
