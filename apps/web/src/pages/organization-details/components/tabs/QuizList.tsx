import {
  UICard,
  UIDialog,
  UIIconButton,
  UIText,
  useBoolean,
} from '@quizrun/ui';
import { CgPlayListAdd } from 'react-icons/cg';
import CreateEditQuiz from '@web/shared/CreateEditQuiz';
import { RiEditLine } from 'react-icons/ri';
import PermissionHandler from '../PermissionHandler';
import { useOrgDetailsContext } from '../../Context';
import QuizQuestionsManager from '../questions-manager';
import { IoIosSettings } from 'react-icons/io';
import { useEffect, useMemo, useState } from 'react';
import { IQuiz } from '@web/api/quiz.api';

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
      {quizes.map((q) => (
        <UICard hover key={q.id}>
          <UICard.Header
            title={q.name}
            subtitle={q.description}
            actions={
              <PermissionHandler>
                <>
                  <UIIconButton
                    size="sm"
                    onClick={openQuestionsManager.bind(this, q)}
                  >
                    <IoIosSettings size={18} />
                  </UIIconButton>
                  <UIIconButton size="sm" onClick={openEditQuiz.bind(this, q)}>
                    <RiEditLine size={16} />
                  </UIIconButton>
                </>
              </PermissionHandler>
            }
          />
          <UICard.Content>
            <UIText fontSize="xs" color="light-white">
              0 Questions
            </UIText>
          </UICard.Content>
        </UICard>
      ))}

      {/*  Add Quiz Dialog trigger */}
      <PermissionHandler>
        <UICard as="button" hover onClick={openEditQuiz.bind(this, undefined)}>
          <UICard.Content
            css={{ color: '$light-white', spaceX: '$3' }}
            className="flex-center h-full"
          >
            <CgPlayListAdd size={40} />
            <UIText fontSize="sm">Create Quiz</UIText>
          </UICard.Content>
        </UICard>
      </PermissionHandler>

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
