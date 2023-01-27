import { UIBox, UIButton, UIGridBox, UISeparator, UIText } from '@quizrun/ui';
import { useNavigate } from 'react-router-dom';
import { useQuizDetailsContext } from '../Context';

const SubmittedCard = () => {
  const { submission } = useQuizDetailsContext();
  const navigate = useNavigate();

  return (
    <UIBox css={{ textAlign: 'center' }}>
      <UIText>Quiz completed</UIText>
      <UIText fontSize="xs" color="light-white" css={{ marginTop: '$1' }}>
        You cannot retake a quiz, this feature is not yet implemented so sit
        tight till then.
      </UIText>
      <UISeparator css={{ marginTop: '$5' }} />
      <UIGridBox css={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <UIBox>
          <UIText fontSize="3xl" color="primary">
            {submission?.correct ?? 0}
          </UIText>
          Correct
        </UIBox>

        <UISeparator orientation="vertical" />

        <UIBox>
          <UIText fontSize="3xl" css={{ color: '$error' }}>
            {submission?.incorrect ?? 0}
          </UIText>
          Incorrect
        </UIBox>
      </UIGridBox>
      {/* <UIButton
        css={{ marginTop: '$5', width: 180 }}
        onClick={() => navigate(`/quiz/${id}/leaderboard`)}
      >
        Take me to the leaderboard
      </UIButton> */}

      <UIButton
        css={{ marginTop: '$3' }}
        onClick={navigate.bind(this, -1)}
        color="light"
      >
        Take me back
      </UIButton>
    </UIBox>
  );
};

export default SubmittedCard;
