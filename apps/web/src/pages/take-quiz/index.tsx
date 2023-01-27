import Container from '@web/layouts/dashboard-layout/components/Container';
import { UIBox } from '@quizrun/ui';
import BgComponent from './components/BgComponent';
import ContenxtWrapper, { useQuizDetailsContext } from './Context';
import TakeQuizCard from './components/TakeQuizCard';
import QuizQuestions from './components/QuizQuestions';
import SubmittedCard from './components/SubmittedCard';

const Page = () => {
  const { activeQuestion, submission } = useQuizDetailsContext();

  return (
    <Container className="flex-center h-full">
      <UIBox css={{ maxWidth: '320px', width: '100%' }}>
        {submission ? (
          <SubmittedCard />
        ) : activeQuestion === -1 ? (
          <TakeQuizCard />
        ) : (
          <QuizQuestions />
        )}
      </UIBox>
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
