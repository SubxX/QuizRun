import { UICard, UIText } from '@quizrun/ui';
import { Link } from 'react-router-dom';
import { IQuiz } from '@web/api/quiz.api';
import { ReactNode, useMemo } from 'react';

type Props = {
  quiz: IQuiz;
  actions?: ReactNode;
  footerActions?: ReactNode;
  as?: any;
};

const QuizCard = ({ quiz, actions, footerActions, as = Link }: Props) => {
  const quizId = quiz.id;

  const props = useMemo(
    () => (as === Link ? { as, to: `/quiz/${quizId}`, hover: true } : { as }),
    [quizId, as]
  );

  return (
    <UICard {...props}>
      <UICard.Header title={quiz.name} actions={actions} />

      <UICard.Content css={{ color: '$light-white', fontSize: '$xs' }}>
        <UIText css={{ lineClamper: 3, minHeight: 52, marginBottom: '$2' }}>
          {quiz.description}
        </UIText>

        <UIText fontSize="xs" color="light-white">
          {quiz?.questions?.length ?? 0} Questions
        </UIText>

        {footerActions}
      </UICard.Content>
    </UICard>
  );
};

export default QuizCard;
