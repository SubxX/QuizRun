import Container from '@web/layouts/dashboard-layout/components/Container';
import {
  UIBox,
  UIButton,
  UICard,
  UIFlexBox,
  UIIconButton,
  UIText,
} from '@quizrun/ui';
import BgComponent from './components/BgComponent';
import ContenxtWrapper, { useQuizDetailsContext } from './Context';
import TakeQuizCard from './components/TakeQuizCard';
import QuizQuestions from './components/QuizQuestions';
import SubmittedCard from './components/SubmittedCard';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const { activeQuestion, submission, id } = useQuizDetailsContext();
  const navigate = useNavigate();
  const visitLeaderboard = () => navigate(`/quiz/${id}/leaderboard`);

  return (
    <Container className="flex-center h-full">
      <UIBox css={{ maxWidth: '320px', width: '100%' }}>
        {(activeQuestion === -1 || Boolean(submission)) && (
          <UICard css={{ marginBottom: '$5', padding: '$2 $2 $2 $4' }}>
            <UIFlexBox justify="between" items="center">
              <UIText fontSize="sm" color="white-muted">
                Check Leaderboard
              </UIText>
              <UIIconButton onClick={visitLeaderboard} size="sm">
                <MdOutlineLeaderboard />
              </UIIconButton>
            </UIFlexBox>
          </UICard>
        )}

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
