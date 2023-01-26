import { UICard, UIDialog, UIFlexBox, UIText, useBoolean } from '@quizrun/ui';
import { CgPlayListAdd } from 'react-icons/cg';
import CreateEditQuiz from '@web/shared/CreateEditQuiz';
import PermissionHandler from '../PermissionHandler';
import { useOrgDetailsContext } from '../../Context';
import QuizQuestionsManager from '../questions-manager';
import { useEffect, useMemo, useState } from 'react';
import { IQuiz } from '@web/api/quiz.api';
import { BsClipboardData } from 'react-icons/bs';
import QuizCard from './QuizCard';

const QuizList = () => {
  const { quizes, id } = useOrgDetailsContext();
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();
  const { value: isOpen, on: open, off: close } = useBoolean(); // Add & Edit quiz dialog state
  const { value: drawer, off: closeDrawer, on: openDrawer } = useBoolean(); // Qustions manager dialog state

  const openEditQuiz = (quiz?: IQuiz) => {
    open();
    setSelectedQuiz(quiz);
  };

  const openQuestionsManager = (quiz?: IQuiz) => {
    openDrawer();
    setSelectedQuiz(quiz);
  };

  // Clearing selected quiz internal state if both dialog is close
  useEffect(() => {
    if (!isOpen && !drawer) setSelectedQuiz(undefined);
  }, [isOpen, drawer]);

  const quizDialogHeaderProps = useMemo(
    () => ({
      title: selectedQuiz ? `Edit "${selectedQuiz.name}" quiz` : 'Create Quiz',
      description:
        'Manage your organization quizes from one place add/edit your quize anytime.',
    }),
    [selectedQuiz]
  );

  return (
    <>
      {/*  Add Quiz Dialog trigger */}
      <PermissionHandler>
        {(hasAccess) =>
          hasAccess ? (
            <UICard as="button" hover onClick={open}>
              <UICard.Content
                css={{ color: '$light-white', spaceX: '$3' }}
                className="flex-center h-full"
              >
                <CgPlayListAdd size={40} />
                <UIText fontSize="sm">Create Quiz</UIText>
              </UICard.Content>
            </UICard>
          ) : !quizes.length ? (
            <UIFlexBox css={{ color: '$light-white' }} gap="3" items="center">
              <BsClipboardData size={30} />
              <UIText fontSize="sm">No quizes</UIText>
            </UIFlexBox>
          ) : null
        }
      </PermissionHandler>

      {quizes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          openEditQuiz={openEditQuiz}
          openQuestionsManager={openQuestionsManager}
        />
      ))}

      {/* Quiz Dialog for adding & editing a quiz */}
      <UIDialog open={isOpen}>
        <UIDialog.Content>
          <UIDialog.Header {...quizDialogHeaderProps} />
          <CreateEditQuiz
            closeDialog={close}
            quizData={selectedQuiz}
            organization={id as string}
          />
        </UIDialog.Content>
      </UIDialog>

      {/*  Add & Manage Quiz Questions Dialog */}
      <UIDialog open={drawer}>
        <UIDialog.Content drawer={true}>
          <QuizQuestionsManager
            closeDialog={closeDrawer}
            quizData={selectedQuiz}
          />
        </UIDialog.Content>
      </UIDialog>
    </>
  );
};

export default QuizList;
