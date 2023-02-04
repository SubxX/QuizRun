import {
  UIDialog,
  UIFlexBox,
  UIText,
  useBoolean,
  UIGridBox,
  UIButton,
  UIIconButton,
} from '@quizrun/ui';
import CreateEditQuiz from '@web/shared/CreateEditQuiz';
import PermissionHandler from './PermissionHandler';
import { useOrgDetailsContext } from '../Context';
import QuizQuestionsManager from './questions-manager';
import { useEffect, useMemo, useState } from 'react';
import { IQuiz } from '@web/api/quiz.api';
import { BsClipboardData } from 'react-icons/bs';
import QuizCard from '@web/shared/QuizCard';
import { IoIosSettings } from 'react-icons/io';
import { RiEditLine } from 'react-icons/ri';

const QuizList = () => {
  const { quizes, id } = useOrgDetailsContext();
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();
  const { value: isOpen, on: open, off: close } = useBoolean(); // Add & Edit quiz dialog state
  const { value: drawer, off: closeDrawer, on: openDrawer } = useBoolean(); // Qustions manager dialog state

  const openEditQuiz = (e: any, quiz?: IQuiz) => {
    e.preventDefault();
    open();
    setSelectedQuiz(quiz);
  };

  const openQuestionsManager = (e: any, quiz?: IQuiz) => {
    e.preventDefault();
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
      <UIFlexBox
        gap="2"
        justify="between"
        css={{ margin: '$6 0', fontSize: '$lg' }}
      >
        <UIText>Quizes</UIText>
        <PermissionHandler>
          <UIButton onClick={open}>Add Quiz</UIButton>
        </PermissionHandler>
      </UIFlexBox>

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        {quizes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            actions={
              <PermissionHandler>
                <UIIconButton
                  size="sm"
                  onClick={(e) => openQuestionsManager(e, quiz)}
                >
                  <IoIosSettings size={18} />
                </UIIconButton>
                <UIIconButton size="sm" onClick={(e) => openEditQuiz(e, quiz)}>
                  <RiEditLine size={16} />
                </UIIconButton>
              </PermissionHandler>
            }
          />
        ))}

        {!quizes.length && (
          <UIFlexBox css={{ color: '$light-white' }} gap="3" items="center">
            <BsClipboardData size={30} />
            <UIText fontSize="sm">No quizes</UIText>
          </UIFlexBox>
        )}
      </UIGridBox>

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
