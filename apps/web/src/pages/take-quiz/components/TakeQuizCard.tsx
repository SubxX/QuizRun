import { UIFlexBox, UIButton } from '@quizrun/ui';
import QuizCard from '@web/shared/QuizCard';
import { useNavigate } from 'react-router-dom';
import { useQuizDetailsContext } from '../Context';

const TakeQuizCard = () => {
  const navigate = useNavigate();
  const { quiz, setActiveQuestion } = useQuizDetailsContext();
  const takeQuizHandler = () => setActiveQuestion(0);

  return (
    <QuizCard
      quiz={quiz!}
      as="div"
      footerActions={
        <UIFlexBox css={{ marginTop: '$4' }} gap="2">
          <UIButton onClick={takeQuizHandler}>Take quiz</UIButton>
          <UIButton color="light" onClick={navigate.bind(this, -1)}>
            Maybe leter
          </UIButton>
        </UIFlexBox>
      }
    />
  );
};

export default TakeQuizCard;
