import { UIButton, UICard, UIText, UIBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { useFieldArray, useForm } from 'react-hook-form';
import { BiAddToQueue } from 'react-icons/bi';
import SingleQuestion from './components/SingleQuestion';
import { IQuizQuestionsForm } from './interface/quiz.interface';

const QuizDetailsTeacher = () => {
  const { control, handleSubmit } = useForm<IQuizQuestionsForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () =>
    append({
      name: '',
      description: '',
      answers: [
        { value: '', isCorrect: false },
        { value: '', isCorrect: false },
      ],
    });
  const removeQuestion = (i: number) => remove(i);

  const submit = (value: any) => {
    console.log(value);
  };

  return (
    <Container css={{ paddingTop: 0 }}>
      <UIBox as="form" onSubmit={handleSubmit(submit)}>
        <Header
          backButton
          title="Create Quiz"
          // subtitle="Create new quiz for your orgnization"
          actions={<UIButton type="submit">Save</UIButton>}
          isSticky
        />
        <UIBox css={{ spaceY: '$3' }}>
          <UIText color="light-white" fontSize="lg">
            Questions
          </UIText>

          {fields.map((field, index) => (
            <SingleQuestion
              key={field.id}
              control={control}
              index={index}
              removeQuestion={removeQuestion}
            />
          ))}
          <UICard
            css={{
              border: '2px dashed rgba($white-rgb,0.1)',
              width: '100%',
              marginTop: '$5',
            }}
            as="button"
            hover
            onClick={addQuestion}
            type="button"
          >
            <UICard.Content
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '$light-white',
              }}
            >
              <BiAddToQueue size={20} />
              <UIText css={{ marginLeft: '$2' }}>Add</UIText>
            </UICard.Content>
          </UICard>
        </UIBox>
      </UIBox>
    </Container>
  );
};

export default QuizDetailsTeacher;
