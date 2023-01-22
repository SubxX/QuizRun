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
import { MdOutlineClear, MdAddCircle } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  useGetQuestionsByQuizQuery,
  useUpdateQuestionsOrderMutation,
} from '@web/queries/questions.queries';
import { IQuiz } from '@web/api/quiz.api';
import { MdDragIndicator } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { IQuestion } from '@web/api/questions.api';
import { AiFillSave } from 'react-icons/ai';
import { randomizeArrayOrder } from '@web/utils/app.utils';

type props = { closeDialog: () => void; quizData?: IQuiz };

const QuestionsManager = ({ closeDialog, quizData }: props) => {
  const { value: form, on: showForm, off: hideForm } = useBoolean(); // For questions dialog state
  const { data: questions = [] } = useGetQuestionsByQuizQuery(
    quizData?.id as string,
    { onSuccess: (data) => setLocalQuestions(data) }
  );
  const [localQuestions, setLocalQuestions] = useState<IQuestion[]>([]);
  const [orderChanged, setOrderChanged] = useState(false);
  const { mutate: updateOrder, isLoading: orderChangeLoading } =
    useUpdateQuestionsOrderMutation();

  useEffect(() => {
    setOrderChanged(
      localQuestions.some((itm, i) => itm?.id !== questions[i]?.id)
    );
  }, [localQuestions, questions]);

  function onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = [...localQuestions];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setLocalQuestions(newItems);
  }

  const saveOrder = () => updateOrder(localQuestions.map((q) => q.id));

  const randomizeQuestionsOrder = () => {
    const randomOrderedResult = randomizeArrayOrder([...localQuestions]);
    setLocalQuestions(randomOrderedResult);
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

      <UIBox css={{ marginTop: '$6' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {localQuestions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <QuestionCard {...item}>
                          <button
                            {...provided.dragHandleProps}
                            disabled={orderChangeLoading}
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
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        {orderChanged && (
          <UIIconButton
            rounded
            color="primary"
            onClick={saveOrder}
            loading={orderChangeLoading}
          >
            <AiFillSave />
          </UIIconButton>
        )}

        <UIIconButton rounded onClick={randomizeQuestionsOrder}>
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
          <CreateEditQuestion
            closeDialog={hideForm}
            quizData={quizData}
            nextOrder={questions.length + 1}
          />
        </UIDialog.Content>
      </UIDialog>
    </UIBox>
  );
};

export default QuestionsManager;
