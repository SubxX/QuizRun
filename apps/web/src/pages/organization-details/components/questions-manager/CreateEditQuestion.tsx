import {
  UIBox,
  UIButton,
  UIInput,
  UITextarea,
  UIFlexBox,
  UIIconButton,
  UISeparator,
  UIText,
  ToolTip,
} from '@quizrun/ui';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { IQuestion } from '@web/api/questions.api';
import { BiTrash } from 'react-icons/bi';
import { IoAddOutline } from 'react-icons/io5';
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@web/queries/questions.queries';
import { useUserQuery } from '@web/queries/auth.queries';
import { IQuiz } from '@web/api/quiz.api';
import { TbAlertOctagon } from 'react-icons/tb';

type IQuestionForm = Omit<IQuestion, 'quiz' | 'created_at'>;
type Props = {
  closeDialog?: any;
  questionData?: IQuestion;
  quizData?: IQuiz;
  nextOrder: number;
};
const MAX_OPTION = 6;

const CreateEditQuiz = ({
  closeDialog,
  questionData,
  quizData,
  nextOrder,
}: Props) => {
  const { data: user } = useUserQuery();
  const { mutateAsync: createQuestion, isLoading: crateLoading } =
    useCreateQuestionMutation();
  const { mutateAsync: updateQuestion, isLoading: updateLoading } =
    useUpdateQuestionMutation();

  const isEditing = Boolean(questionData);
  const loading = crateLoading || updateLoading;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IQuestionForm>({
    defaultValues: {
      name: questionData?.name ?? '',
      description: questionData?.description ?? '',
      answers: questionData?.answers ?? [{ value: '' }, { value: '' }],
      correctAnswer: questionData?.correctAnswer ?? 0,
    },
  });

  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'answers',
    rules: {
      required: 'This field is required',
      minLength: { value: 2, message: 'Add atleast 2 option' },
      maxLength: {
        value: MAX_OPTION,
        message: `Max ${MAX_OPTION} option allowed`,
      },
    },
  });

  const addOption = () => append({ value: '' });
  const removeOption = (index: number) => remove(index);

  const onSubmit = async (values: IQuestionForm) => {
    try {
      const newQuestionPayload = {
        ...values,
        created_by: user?.id as string,
        quiz: quizData?.id as string,
        order: nextOrder,
      };

      !isEditing
        ? await createQuestion(newQuestionPayload)
        : await updateQuestion({ ...values, id: questionData?.id as string });
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UIBox as="form" css={{ spaceY: '$2' }} onSubmit={handleSubmit(onSubmit)}>
      <UIBox>
        <UIBox css={{ spaceY: '$3' }}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Title is require' }}
            render={({
              field: { onChange, value = '' },
              formState: { errors },
            }) => (
              <UIInput
                placeholder="Enter question title"
                onChange={onChange}
                value={value}
                error={errors?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value = '' } }) => (
              <UITextarea
                placeholder="Enter question description if any"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </UIBox>

        <UISeparator css={{ margin: '$5 0 ' }} />

        <UIFlexBox items="center">
          <UIFlexBox className="flex-1" items="center">
            <UIText css={{ color: '$light-white', marginRight: '$2' }}>
              Add answers
            </UIText>
            {Boolean(errors.answers?.root) && (
              <ToolTip
                title={errors.answers?.root?.message}
                align="center"
                side="bottom"
              >
                <UIBox css={{ display: 'inline-flex', color: '$error' }}>
                  <TbAlertOctagon />
                </UIBox>
              </ToolTip>
            )}
          </UIFlexBox>

          <UIIconButton
            size="sm"
            onClick={addOption}
            disabled={options.length === MAX_OPTION}
          >
            <IoAddOutline />
          </UIIconButton>
        </UIFlexBox>

        <UIBox css={{ spaceY: '$3', marginTop: '$5' }}>
          {options.map((field, i) => (
            <UIFlexBox css={{ spaceX: '$3' }} items="center" key={field.id}>
              <Controller
                control={control}
                name="correctAnswer"
                rules={{ required: 'Please select a correct answer' }}
                render={({ field: { onChange, value, name } }) => (
                  <ToolTip
                    title={value !== i ? 'Mark as correct' : ''}
                    side="bottom"
                  >
                    <input
                      type="checkbox"
                      name={name}
                      checked={i === value}
                      onChange={() => onChange({ target: { value: i } })}
                    />
                  </ToolTip>
                )}
              />

              <div className="w-full">
                <Controller
                  control={control}
                  rules={{ required: 'Value is require' }}
                  name={`answers.${i}.value`}
                  render={({
                    field: { onChange, value = '' },
                    formState: { errors },
                  }) => (
                    <UIInput
                      placeholder={`Enter answer option ${i + 1}`}
                      onChange={onChange}
                      value={value}
                      error={errors?.answers?.[i]?.value?.message}
                    />
                  )}
                />
              </div>
              <UIIconButton size="sm" onClick={removeOption.bind(this, i)}>
                <BiTrash size={18} />
              </UIIconButton>
            </UIFlexBox>
          ))}
        </UIBox>
      </UIBox>

      <UIFlexBox justify="end" css={{ marginTop: '$5', spaceX: '$2' }}>
        <UIButton type="submit" loading={loading}>
          {isEditing ? 'Save' : 'Submit'}
        </UIButton>
        <UIButton color="light" onClick={closeDialog} disabled={loading}>
          Cancel
        </UIButton>
      </UIFlexBox>
    </UIBox>
  );
};

export default CreateEditQuiz;
