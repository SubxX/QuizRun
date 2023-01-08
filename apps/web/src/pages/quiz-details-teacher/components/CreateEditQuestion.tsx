import {
  UIBox,
  UIButton,
  UIInput,
  UITextarea,
  useBoolean,
  UIFlexBox,
  UIIconButton,
  UISeparator,
  UIText,
  ToolTip,
} from '@quizrun/ui';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { IQuestion } from '../interface/quiz.interface';
import { BiTrash } from 'react-icons/bi';
import { IoAddOutline } from 'react-icons/io5';
// import {
//   IoCheckmarkCircleOutline,
//   IoCheckmarkCircleSharp,
// } from 'react-icons/io5';

type Props = {
  closeDialog: any;
  questionData?: IQuestion;
  updateQuestion?: (qestion: IQuestion) => void;
};
const MAX_OPTION = 6;

const CreateEditQuiz = ({
  closeDialog,
  questionData,
  updateQuestion,
}: Props) => {
  const { handleSubmit, control, register } = useForm<IQuestion>();

  const { value: loading, set: setLoading } = useBoolean();
  const isEditing = Boolean(questionData);

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

  const onSubmit = (values: any) => {
    try {
      setLoading(true);
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
              <>
                <UIInput
                  placeholder="Enter question title"
                  onChange={onChange}
                  value={value}
                  error={errors?.name?.message}
                />
              </>
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
          <UIText css={{ color: '$light-white', flex: 1 }}>Add answers</UIText>

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
                render={({ field: { onChange, value, name } }) => (
                  <ToolTip
                    title={value !== i ? 'Mark as correct' : ''}
                    side="bottom"
                  >
                    <input
                      name={name}
                      type="radio"
                      value={i}
                      onChange={(e) => onChange({ target: { value: i } })}
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
