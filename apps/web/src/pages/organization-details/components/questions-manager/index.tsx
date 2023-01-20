import {
  UIBox,
  UIDialog,
  useBoolean,
  UIIconButton,
  ToolTip,
  UIFlexBox,
} from '@quizrun/ui';
import Header from '@web/layouts/dashboard-layout/components/Header';
import CreateEditQuestion from './CreateEditQuestion';
import QuestionCard from './QuestionCard';
import { MdOutlineClear, MdAddCircle } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { useGetQuestionsByQuizQuery } from '@web/queries/questions.queries';
import { IQuiz } from '@web/api/quiz.api';

//

type props = { closeDialog: () => void; quizData?: IQuiz };

const QuestionsManager = ({ closeDialog, quizData }: props) => {
  const { value: form, on: showForm, off: hideForm } = useBoolean(); // For questions dialog state
  const { data: questions = [] } = useGetQuestionsByQuizQuery(
    quizData?.id as string
  );

  return (
    <UIBox
      css={{
        height: '100%',
        overflowY: 'auto',
        padding: '0 $4',
        paddingBottom: '65px',
      }}
    >
      <Header
        title="Test Quiz"
        subtitle="Manage questions of this quiz"
        isSticky
        css={{ background: '$blackish' }}
        actions={
          <>
            <ToolTip title="Add Questions" side="bottom">
              <UIIconButton
                color="primary"
                onClick={showForm}
                disabled={form}
                aria-label="Add questions"
              >
                <MdAddCircle size={20} />
              </UIIconButton>
            </ToolTip>

            <UIIconButton
              onClick={closeDialog}
              aria-label="Close questions manager"
            >
              <MdOutlineClear size={22} />
            </UIIconButton>
          </>
        }
      />

      <UIBox css={{ spaceY: '$3', marginTop: '$6' }}>
        {questions.map((qs, i) => (
          <QuestionCard key={i} {...qs} />
        ))}
      </UIBox>

      <UIFlexBox
        gap="2"
        css={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        {/* <UIIconButton rounded color="primary">
          <AiFillSave />
        </UIIconButton> */}

        <UIIconButton rounded>
          <FaRandom />
        </UIIconButton>
      </UIFlexBox>

      {/* Create / Edit question */}
      <UIDialog open={form}>
        <UIDialog.Content>
          <UIDialog.Header
            title="Create question"
            description="add question to this quiz"
          />
          <CreateEditQuestion closeDialog={hideForm} quizData={quizData} />
        </UIDialog.Content>
      </UIDialog>
    </UIBox>
  );
};

export default QuestionsManager;

// const questions = [
//   {
//     id: '1',
//     name: 'Who created HTML',
//     answers: [{ value: 'asd' }, { value: 'test' }, { value: 'haha' }],
//     quiz: '545ba150-5d42-4bdb-8dc1-774bf90db293',
//     correctAnswer: 0,
//   },
//   {
//     id: '2',
//     name: 'Who created CSS',
//     description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta explicabo, tempore magni corrupti odio dolor dignissimos culpa, reiciendis, odit iure labore provide'n't distinctio saepe quibusdam suscipit cumque ducimus recusandae iste?`,
//     answers: [{ value: 'asd' }, { value: 'test' }],
//     quiz: '545ba150-5d42-4bdb-8dc1-774bf90db293',
//     correctAnswer: 0,
//   },
//   {
//     id: '3',
//     name: 'Who created Javascript',
//     answers: [
//       { value: 'asd' },
//       { value: 'test' },
//       { value: 'test' },
//       { value: 'test' },
//     ],
//     quiz: '545ba150-5d42-4bdb-8dc1-774bf90db293',
//     correctAnswer: 0,
//   },
//   {
//     id: '4',
//     name: 'Who created Java',
//     answers: [{ value: 'asd' }, { value: 'test' }],
//     quiz: '545ba150-5d42-4bdb-8dc1-774bf90db293',
//     correctAnswer: 0,
//   },
//   {
//     id: '5',
//     name: 'Who created Java',
//     answers: [{ value: 'asd' }, { value: 'test' }],
//     quiz: '545ba150-5d42-4bdb-8dc1-774bf90db293',
//     correctAnswer: 0,
//   },
//   {
//     id: '6',
//     name: 'Who created Java',
//     answers: [{ value: 'asd' }, { value: 'test' }],
//     quiz: '545ba150-5d42-4bdb-8dc1-774bf90db293',
//     correctAnswer: 0,
//   },
// ]
