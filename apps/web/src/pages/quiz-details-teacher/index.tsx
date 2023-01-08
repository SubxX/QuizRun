import {
  UIText,
  UIBox,
  UIDialog,
  useBoolean,
  UIButton,
  UIFlexBox,
  UIIconButton,
  ToolTip,
} from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import CreateEditQuestion from './components/CreateEditQuestion';
import { RiEditLine } from 'react-icons/ri';
import QuestionCard from './components/QuestionCard';

const questions = [
  {
    name: 'Who created HTML',
    answers: [{ value: 'asd' }, { value: 'test' }, { value: 'haha' }],
  },
  {
    name: 'Who created CSS',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta explicabo, tempore magni corrupti odio dolor dignissimos culpa, reiciendis, odit iure labore provident distinctio saepe quibusdam suscipit cumque ducimus recusandae iste?',
    answers: [{ value: 'asd' }, { value: 'test' }],
  },
  {
    name: 'Who created Javascript',
    answers: [
      { value: 'asd' },
      { value: 'test' },
      { value: 'test' },
      { value: 'test' },
    ],
  },
  {
    name: 'Who created Java',
    answers: [{ value: 'asd' }, { value: 'test' }],
  },
];

const QuizDetailsTeacher = () => {
  const { value: open, off: closeDialog, on: openDialog } = useBoolean();

  return (
    <Container>
      <UIBox>
        <Header
          backButton
          title="Html Quiz"
          subtitle="The HyperText Markup Language or HTML is the standard markup language for documents designed"
          actions={
            <ToolTip title="Edit Quiz">
              <UIIconButton>
                <RiEditLine size={18} />
              </UIIconButton>
            </ToolTip>
          }
        />

        <UIFlexBox justify="between" items="center">
          <UIText color="custom-white" fontSize="xl">
            Questions
          </UIText>
          <UIButton onClick={openDialog}>Add Question</UIButton>
        </UIFlexBox>

        <UIBox css={{ spaceY: '$3', marginTop: '$6' }}>
          {questions.map((qs, i) => (
            <QuestionCard key={i} {...qs} />
          ))}
        </UIBox>

        {/*  Question creation dialog */}
        <UIDialog open={open}>
          <UIDialog.Content>
            <UIDialog.Header
              title="Create Question"
              description="Create or edit question under this quiz"
            />
            <CreateEditQuestion closeDialog={closeDialog} />
          </UIDialog.Content>
        </UIDialog>
      </UIBox>
    </Container>
  );
};

export default QuizDetailsTeacher;
