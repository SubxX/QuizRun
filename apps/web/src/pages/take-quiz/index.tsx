import Container from '@web/layouts/dashboard-layout/components/Container';
import { UIButton, UICard, UIFlexBox, UIText } from '@quizrun/ui';
import BgComponent from './components/BgComponent';
import ContenxtWrapper, { useQuizDetailsContext } from './Context';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const { quiz } = useQuizDetailsContext();
  const navigate = useNavigate();

  return (
    <Container className="flex-center h-full">
      <UICard css={{ maxWidth: '340px', width: '100%' }}>
        <UICard.Header title={quiz?.name ?? ''} />
        <UICard.Content>
          <UIText fontSize="sm" color="light-white">
            {quiz?.description ?? ''}
          </UIText>

          <UIText fontSize="xs" color="light-white" css={{ marginTop: '$1' }}>
            {quiz?.questions?.length} Questions
          </UIText>

          <UIFlexBox css={{ marginTop: '$4' }} gap="2">
            <UIButton>Take quiz</UIButton>
            <UIButton color="light" onClick={navigate.bind(this, -1)}>
              Maybe leter
            </UIButton>
          </UIFlexBox>
        </UICard.Content>
      </UICard>

      <BgComponent />
    </Container>
  );
};

export default function TakeQuiz() {
  return (
    <ContenxtWrapper>
      <Page />
    </ContenxtWrapper>
  );
}
