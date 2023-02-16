import {
  UIDialog,
  UIFlexBox,
  UIText,
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
import { useMemo } from 'react';
import { IQuiz } from '@web/api/quiz.api';
import { BsClipboardData } from 'react-icons/bs';
import QuizCard from '@web/shared/QuizCard';
import { useDeleteQuizMutation } from '@web/queries/quiz.queries';
import { BsTrash, BsThreeDotsVertical } from 'react-icons/bs';
import {
  NavigateOptions,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { preventDefault } from '@web/utils/app.utils';

const QuizList = () => {
  const { id, organization } = useOrgDetailsContext();
  const { mutateAsync: deleteQuiz } = useDeleteQuizMutation();

  const navigate = useNavigate();
  const { state } = useLocation();

  const quizzes = organization?.quizzes ?? [];
  const selectedQuiz = state as IQuiz;
  const dialogType = useSearchParams()[0]?.get('type');

  const openAddQuiz = (e: any) => {
    preventDefault(e);
    navigate(`/organization/${id}?type=add`);
  };

  const openEditQuiz = (e: any, quiz: IQuiz) => {
    preventDefault(e);
    navigate(`/organization/${id}?quiz=${quiz.id}&type=edit`, { state: quiz });
  };

  const openManager = (e: any, quiz: IQuiz, options: NavigateOptions = {}) => {
    preventDefault(e);
    navigate(`/organization/${id}?quiz=${quiz.id}&type=manager`, {
      state: quiz,
      ...options,
    });
  };

  const closeDialog = (quiz?: IQuiz) => {
    quiz ? openManager(null, quiz, { replace: true }) : navigate(-1);
  };

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
          <UIButton onClick={openAddQuiz}>Add Quiz</UIButton>
        </PermissionHandler>
      </UIFlexBox>

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        {quizzes?.map((quiz) => (
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
                        organization: id as string,
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

        {!quizzes?.length && (
          <UIFlexBox css={{ color: '$light-white' }} gap="3" items="center">
            <BsClipboardData size={30} />
            <UIText fontSize="sm">No quizzes</UIText>
          </UIFlexBox>
        )}
      </UIGridBox>

      <PermissionHandler>
        {/* Quiz Dialog for adding & editing a quiz */}
        <UIDialog open={dialogType === 'edit' || dialogType === 'add'}>
          <UIDialog.Content>
            <UIDialog.Header {...quizDialogHeaderProps} />
            <CreateEditQuiz
              closeDialog={closeDialog}
              quizData={selectedQuiz}
              organization={id as string}
            />
          </UIDialog.Content>
        </UIDialog>

        {/*  Add & Manage Quiz Questions Dialog */}
        <UIDialog open={dialogType === 'manager'}>
          <UIDialog.Content drawer={true}>
            <QuizQuestionsManager
              closeDialog={closeDialog}
              quizData={selectedQuiz}
            />
          </UIDialog.Content>
        </UIDialog>
      </PermissionHandler>
    </>
  );
};

export default QuizList;
