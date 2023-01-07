import {
  UIBox,
  UIButton,
  UIInput,
  UITextarea,
  UISelect,
  useBoolean,
  UIFlexBox,
} from '@quizrun/ui';
import { useForm, Controller } from 'react-hook-form';

import { useUserStore } from '@web/store/user.store';
import { useDepartmentStore } from '@web/store/department.store';
import { IQuizForm } from '@web/pages/create-quiz/interface/quiz.interface';

type Props = {
  closeDialog: any;
  quizData?: IQuizForm;
  updateQuiz?: (quiz: IQuizForm) => void;
};

const CreateEditQuiz = ({ closeDialog, quizData, updateQuiz }: Props) => {
  const { handleSubmit, control } = useForm<IQuizForm>();
  const { data } = useDepartmentStore();

  const { value: loading, set: setLoading } = useBoolean();
  const isEditing = Boolean(quizData);

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
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <UISelect onValueChange={onChange} value={value}>
            <UISelect.Trigger
              placeholder="Test"
              label="Department"
              error={errors?.department?.message}
            />

            <UISelect.Content>
              <UISelect.Group>
                {data.map((org) => (
                  <UISelect.Item key={`cq-pp-${org.id}`} value={org.id}>
                    {org.name}
                  </UISelect.Item>
                ))}
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
