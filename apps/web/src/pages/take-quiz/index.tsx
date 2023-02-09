import { UICard, UIFlexBox, UIIconButton, UIText } from '@quizrun/ui';
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
    <>
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
    </>
  );
};

export default function TakeQuiz() {
  return (
    <ContenxtWrapper>
      <Page />
    </ContenxtWrapper>
  );
}
