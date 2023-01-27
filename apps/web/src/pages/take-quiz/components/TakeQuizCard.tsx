import { UICard, UIText, UIFlexBox, UIButton } from '@quizrun/ui';
import { useNavigate } from 'react-router-dom';
import { useQuizDetailsContext } from '../Context';

const TakeQuizCard = () => {
  const navigate = useNavigate();
  const { quiz, setActiveQuestion } = useQuizDetailsContext();
  const takeQuizHandler = () => setActiveQuestion(0);

  return (
    <UICard css={{ maxWidth: '340px', width: '100%' }}>
      <UICard.Header title={quiz?.name ?? ''} />

      <UICard.Content css={{ color: '$light-white', fontSize: '$xs' }}>
        <UIText css={{ minHeight: 52, marginBottom: '$2' }}>
          {quiz?.description ?? ''}
        </UIText>

        <UIText fontSize="xs">{quiz?.questions?.length ?? 0} Questions</UIText>

        <UIFlexBox css={{ marginTop: '$4' }} gap="2">
          <UIButton onClick={takeQuizHandler}>Take quiz</UIButton>
          <UIButton color="light" onClick={navigate.bind(this, -1)}>
            Maybe leter
          </UIButton>
        </UIFlexBox>
      </UICard.Content>
    </UICard>
  );
};

export default TakeQuizCard;
