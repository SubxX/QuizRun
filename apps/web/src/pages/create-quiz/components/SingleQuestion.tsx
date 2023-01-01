import {
  UIBox,
  UICard,
  UIFlexBox,
  UIIconButton,
  UIInput,
  UISeparator,
  UIText,
  UITextarea,
} from '@quizrun/ui';
import { MdDragHandle } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { IoAddOutline } from 'react-icons/io5';
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from 'react-icons/io5';
import { Control, useFieldArray, Controller } from 'react-hook-form';
import { IQuizForm } from '../interface/quiz.interface';

type Props = {
  control: Control<IQuizForm, any>;
  index: number;
  removeQuestion: (index: number) => void;
};

const SingleQuestion = ({ index, control, removeQuestion }: Props) => {
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  const addOption = () => append({ isCorrect: false, value: '' });
  const removeOption = (index: number) => remove(index);

  return (
    <UICard>
      <UICard.Content css={{ display: 'flex', spaceX: '$4' }}>
        <div>
          <MdDragHandle size={26} />
          <UIIconButton size="sm" onClick={removeQuestion.bind(this, index)}>
            <BiTrash size={18} />
          </UIIconButton>
        </div>

        <UIBox css={{ flex: 1 }}>
          <UIBox css={{ spaceY: '$3' }}>
            <Controller
              control={control}
              name={`questions.${index}.name`}
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
                    error={errors?.questions?.[0]?.name?.message}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={`questions.${index}.description`}
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

          <UIFlexBox>
            <UIText css={{ color: '$light-white', flex: 1 }}>
              Add answers
            </UIText>
            <UIIconButton size="sm" onClick={addOption}>
              <IoAddOutline />
            </UIIconButton>
          </UIFlexBox>

          <UIBox css={{ spaceY: '$3', marginTop: '$5' }}>
            {options.map((field, i) => (
              <UIFlexBox css={{ spaceX: '$3' }} items="center" key={field.id}>
                <IoCheckmarkCircleOutline size={32} />
                <div className="w-full">
                  <Controller
                    control={control}
                    rules={{ required: 'Value is require' }}
                    name={`questions.${index}.answers.${i}.value`}
                    render={({
                      field: { onChange, value = '' },
                      formState: { errors },
                    }) => (
                      <UIInput
                        placeholder={`Enter answer option ${i + 1}`}
                        onChange={onChange}
                        value={value}
                        error={
                          errors?.questions?.[index]?.answers?.[i]?.value
                            ?.message
                        }
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
      </UICard.Content>
    </UICard>
  );
};

export default SingleQuestion;
