import {
  UIButton,
  UICard,
  UIText,
  UIBox,
  UIInput,
  UITextarea,
  UISelect,
} from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { BiAddToQueue } from 'react-icons/bi';
import SingleQuestion from './components/SingleQuestion';
import { IQuizForm } from './interface/quiz.interface';

const CreateQuiz = () => {
  const { control, handleSubmit } = useForm<IQuizForm>();
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
        <UIBox
          css={{
            display: 'grid',
            gap: '$5',
            '@md': {
              gridTemplateColumns: '1fr 2fr',
            },
          }}
        >
          <UIBox css={{ spaceY: '$3' }}>
            <Controller
              control={control}
              name={'name'}
              rules={{ required: 'Name is require' }}
              render={({
                field: { onChange, value = '' },
                formState: { errors },
              }) => (
                <>
                  <UIInput
                    label="Quiz Name"
                    id="quiz-name"
                    placeholder="Enter Quiz name"
                    onChange={onChange}
                    value={value}
                    error={errors?.name?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name={'department'}
              rules={{ required: 'Department is require' }}
              render={({
                field: { onChange, value },
                formState: { errors },
              }) => (
                <UISelect onValueChange={onChange} value={value}>
                  <UISelect.Trigger
                    placeholder="Test"
                    label="Department"
                    error={errors?.department?.message}
                  />

                  <UISelect.Content>
                    <UISelect.Group>
                      <UISelect.Label>Fruits</UISelect.Label>
                      <UISelect.Item value="apple">Apple</UISelect.Item>
                      <UISelect.Item value="banana">Banana</UISelect.Item>
                      <UISelect.Item value="blueberry">Blueberry</UISelect.Item>
                      <UISelect.Item value="grapes">Grapes</UISelect.Item>
                      <UISelect.Item value="pineapple">Pineapple</UISelect.Item>
                    </UISelect.Group>
                  </UISelect.Content>
                </UISelect>
              )}
            />

            <Controller
              control={control}
              name={'description'}
              rules={{ required: 'Description is require' }}
              render={({
                field: { onChange, value = '' },
                formState: { errors },
              }) => (
                <>
                  <UITextarea
                    label="Description"
                    id="quiz_description"
                    placeholder="Enter Quiz description"
                    onChange={onChange}
                    value={value}
                    error={errors?.description?.message}
                  />
                </>
              )}
            />
          </UIBox>

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
      </UIBox>
    </Container>
  );
};

export default CreateQuiz;
