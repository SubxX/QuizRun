import {
  UIDialog,
  UIFlexBox,
  UIText,
  useBoolean,
  UIGridBox,
  UIButton,
  UIIconButton,
  UIAlertDialog,
  UIDropdownMenu,
} from '@quizrun/ui';
import CreateEditQuiz from '@web/shared/CreateEditQuiz';
import PermissionHandler from './PermissionHandler';
import { useOrgDetailsContext } from '../Context';
import QuizQuestionsManager from './questions-manager';
import { useEffect, useMemo, useState } from 'react';
import { IQuiz } from '@web/api/quiz.api';
import { BsClipboardData } from 'react-icons/bs';
import QuizCard from '@web/shared/QuizCard';
import { useDeleteQuizMutation } from '@web/queries/quiz.queries';
import { BsTrash, BsThreeDotsVertical } from 'react-icons/bs';

const QuizList = () => {
  const { quizes, id } = useOrgDetailsContext();
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();
  const { value: isOpen, on: open, off: close } = useBoolean(); // Add & Edit quiz dialog state
  const { value: drawer, off: closeDrawer, on: openDrawer } = useBoolean(); // Qustions manager dialog state

  const { mutateAsync: deleteQuiz } = useDeleteQuizMutation();

  const preventDefault = (e: any) => e?.preventDefault();

  const openEditQuiz = (e: any, quiz?: IQuiz) => {
    preventDefault(e);
    open();
    setSelectedQuiz(quiz);
  };

  const openManager = (e: any, quiz?: IQuiz) => {
    preventDefault(e);
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
        'Manage your organization quizzes from one place add/edit your quiz anytime.',
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
        <UIText>Quizzes</UIText>
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
                <UIDropdownMenu>
                  <UIDropdownMenu.Trigger asChild>
                    <UIIconButton size="sm">
                      <BsThreeDotsVertical size={16} />
                    </UIIconButton>
                  </UIDropdownMenu.Trigger>
                  <UIDropdownMenu.Content align="end" onClick={preventDefault}>
                    <UIDropdownMenu.Item onClick={(e) => openEditQuiz(e, quiz)}>
                      Edit
                    </UIDropdownMenu.Item>
                    <UIDropdownMenu.Item onClick={(e) => openManager(e, quiz)}>
                      Manage questions
                    </UIDropdownMenu.Item>

                    {/* Delete question alert */}
                    <UIAlertDialog
                      subtitle="You are about to delete this quiz and its questions"
                      onResolve={deleteQuiz.bind(this, {
                        id: quiz.id,
                        organization: quiz.organization,
                      })}
                    >
                      <UIDropdownMenu.Item
                        color="danger"
                        onSelect={preventDefault}
                      >
                        Delete
                        <UIDropdownMenu.RightSlot>
                          <BsTrash />
                        </UIDropdownMenu.RightSlot>
                      </UIDropdownMenu.Item>
                    </UIAlertDialog>
                  </UIDropdownMenu.Content>
                </UIDropdownMenu>
              </PermissionHandler>
            }
          />
        ))}

        {!quizes.length && (
          <UIFlexBox css={{ color: '$light-white' }} gap="3" items="center">
            <BsClipboardData size={30} />
            <UIText fontSize="sm">No quizzes</UIText>
          </UIFlexBox>
        )}

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
      </UIGridBox>
    </>
  );
};

export default QuizList;
