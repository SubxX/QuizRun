import {
  UIBox,
  UIDialog,
  useBoolean,
  UIIconButton,
  ToolTip,
  UIFlexBox,
  UIText,
} from '@quizrun/ui';
import Header from '@web/layouts/dashboard-layout/components/Header';
import CreateEditQuestion from './CreateEditQuestion';
import QuestionCard from './QuestionCard';
import { MdOutlineClear, MdAddCircle, MdDragIndicator } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  useGetQuestionsByQuizQuery,
  useUpdateQuestionsOrderMutation,
} from '@web/queries/questions.queries';
import { IQuiz } from '@web/api/quiz.api';
import { useEffect, useState } from 'react';
import { IQuestion } from '@web/api/questions.api';
import { AiFillSave } from 'react-icons/ai';
import { randomizeArrayOrder } from '@web/utils/app.utils';

type props = { closeDialog: () => void; quizData?: IQuiz };

const QuestionsManager = ({ closeDialog, quizData }: props) => {
  const { value: form, set: setFormVisibility, on: showForm } = useBoolean(); // For questions dialog state
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>();

  const { data: questions = [] } = useGetQuestionsByQuizQuery(
    quizData?.id as string,
    { onSuccess: (data) => setLocalQuestions(data) }
  );
  const [localQuestions, setLocalQuestions] = useState<IQuestion[]>([]);
  const [orderChanged, setOrderChanged] = useState(false);
  const { mutate: updateOrder, isLoading } = useUpdateQuestionsOrderMutation();

  useEffect(() => {
    setOrderChanged(
      localQuestions.some((itm, i) => itm?.id !== questions[i]?.id)
    );
  }, [localQuestions, questions]);

  function onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) return;
    // Else
    const newItems = [...localQuestions];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setLocalQuestions(newItems);
  }

  const saveOrder = () => updateOrder(localQuestions);
  const cancelChanges = () => setLocalQuestions(questions);

  const randomizeQuestionsOrder = () => {
    const randomOrderedResult = randomizeArrayOrder([...localQuestions]);
    setLocalQuestions(randomOrderedResult);
  };

  const openEditQuestion = (question: IQuestion) => {
    setSelectedQuestion(question);
    setFormVisibility(true);
  };

  const closeQuestionDialog = () => {
    setFormVisibility(false);
    setSelectedQuestion(undefined);
  };

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
        title={quizData?.name ?? 'N/A'}
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
              onClick={() => closeDialog()}
              aria-label="Close questions manager"
            >
              <MdOutlineClear size={22} />
            </UIIconButton>
          </>
        }
      />

      <UIBox css={{ marginTop: '$6' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {localQuestions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <QuestionCard
                          question={item}
                          openEditQuestion={openEditQuestion}
                        >
                          <button
                            {...provided.dragHandleProps}
                            disabled={isLoading}
                          >
                            <MdDragIndicator />
                          </button>
                        </QuestionCard>
                        <div style={{ paddingBottom: 12 }} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {!questions.length && (
          <UIText color="light-white" css={{ textAlign: 'center' }}>
            No questions yet
          </UIText>
        )}
      </UIBox>

      <UIFlexBox
        gap="2"
        css={{
          position: 'absolute',
          bottom: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        {orderChanged && (
          <>
            <ToolTip title="Save order" side="top">
              <UIIconButton
                rounded
                color="primary"
                onClick={saveOrder}
                loading={isLoading}
              >
                <AiFillSave />
              </UIIconButton>
            </ToolTip>

            <ToolTip title="Cancel changes" side="top">
              <UIIconButton
                rounded
                onClick={cancelChanges}
                disabled={isLoading}
              >
                <MdOutlineClear />
              </UIIconButton>
            </ToolTip>
          </>
        )}

        {localQuestions?.length > 4 && (
          <ToolTip title="Randomize order" side="top">
            <UIIconButton
              rounded
              onClick={randomizeQuestionsOrder}
              disabled={isLoading}
            >
              <FaRandom />
            </UIIconButton>
          </ToolTip>
        )}
      </UIFlexBox>

      {/* Create / Edit question */}
      <UIDialog open={form}>
        <UIDialog.Content>
          <UIDialog.Header
            title="Create question"
            description="add question to this quiz"
          />
          <CreateEditQuestion
            questionData={selectedQuestion}
            closeDialog={closeQuestionDialog}
            quizData={quizData}
            nextOrder={questions.length + 1}
          />
        </UIDialog.Content>
      </UIDialog>
    </UIBox>
  );
};

export default QuestionsManager;
