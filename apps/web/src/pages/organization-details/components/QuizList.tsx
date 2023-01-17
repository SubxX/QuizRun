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
import { Link } from 'react-router-dom';
import PermissionHandler from './PermissionHandler';

const QuizList = () => {
  const { value: open, on, off } = useBoolean();

  return (
    <>
      <UICard hover>
        <UICard.Header
          title="HTML"
          subtitle="The HyperText Markup Language or HTML is the standard markup language for documents designed"
          actions={
            <PermissionHandler>
              <Link to={`/quiz-details/asd`}>
                <UIIconButton size="sm">
                  <RiEditLine size={18} />
                </UIIconButton>
              </Link>
            </PermissionHandler>
          }
        />
        <UICard.Content>
          <UIText fontSize="xs" color="light-white">
            12 Questions
          </UIText>
        </UICard.Content>
      </UICard>

      <PermissionHandler>
        <>
          <UICard as="button" hover onClick={on}>
            <UICard.Content
              css={{ color: '$light-white', spaceX: '$3' }}
              className="flex-center h-full"
            >
              <CgPlayListAdd size={40} />
              <UIText fontSize="sm">Create Quiz</UIText>
            </UICard.Content>
          </UICard>
          {/* Quiz Dialog for adding & editing a quiz */}
          <UIDialog open={open}>
            <UIDialog.Content>
              <UIDialog.Header
                title="Create Quiz"
                description="Manage your organization quizes from one place add/edit your quize anytime."
              />
              <CreateEditQuiz closeDialog={off} />
            </UIDialog.Content>
          </UIDialog>
        </>
      </PermissionHandler>
    </>
  );
};

export default QuizList;
