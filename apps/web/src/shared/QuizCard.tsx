import { UICard, UIText } from '@quizrun/ui';
import { Link } from 'react-router-dom';
import { IQuiz } from '@web/api/quiz.api';
import { ReactNode } from 'react';

type Props = {
  quiz: IQuiz;
  actions?: ReactNode;
};

const QuizCard = ({ quiz, actions }: Props) => (
  <UICard hover as={Link} to={`/quiz/${quiz.id}`}>
    <UICard.Header title={quiz.name} actions={actions} />

    <UICard.Content css={{ color: '$light-white', fontSize: '$xs' }}>
      <UIText css={{ lineClamper: 3, minHeight: 52, marginBottom: '$2' }}>
        {quiz.description}
      </UIText>

      <UIText fontSize="xs" color="light-white">
        {quiz?.questions?.length ?? 0} Questions
      </UIText>
    </UICard.Content>
  </UICard>
);

export default QuizCard;
