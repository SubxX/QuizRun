import { UICard, UIIconButton, UIText } from '@quizrun/ui';
import { Link } from 'react-router-dom';
import { IQuiz } from '@web/api/quiz.api';
import PermissionHandler from '../PermissionHandler';
import { IoIosSettings } from 'react-icons/io';
import { RiEditLine } from 'react-icons/ri';

type Props = {
  quiz: IQuiz;
  openQuestionsManager: (quiz: IQuiz) => void;
  openEditQuiz: (quiz: IQuiz) => void;
};

const QuizCard = ({ quiz, openQuestionsManager, openEditQuiz }: Props) => {
  function handleQuetionsManager(e: any) {
    e.preventDefault();
    openQuestionsManager(quiz);
  }

  function handleEditQuiz(e: any) {
    e.preventDefault();
    openEditQuiz(quiz);
  }

  return (
    <UICard hover as={Link} to={`/quiz/${quiz.id}`}>
      <UICard.Header
        title={quiz.name}
        actions={
          <PermissionHandler>
            <UIIconButton size="sm" onClick={handleQuetionsManager}>
              <IoIosSettings size={18} />
            </UIIconButton>
            <UIIconButton size="sm" onClick={handleEditQuiz}>
              <RiEditLine size={16} />
            </UIIconButton>
          </PermissionHandler>
        }
      />

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
};

export default QuizCard;
