import {
  UIBox,
  UIButton,
  UIInput,
  UITextarea,
  UISelect,
  UIFlexBox,
} from '@quizrun/ui';
import { useForm, Controller } from 'react-hook-form';
import { useDepartmentsQuery } from '@web/queries/department.query';
import { IQuiz } from '@web/api/quiz.api';
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from '@web/queries/quiz.queries';
import { useUserQuery } from '@web/queries/auth.queries';

type IQuizForm = Omit<IQuiz, 'id' | 'created_at' | 'created_by' | 'questions'>;
type Props = {
  closeDialog: any;
  quizData?: IQuiz;
  organization: string;
  selectQuiz?: (quiz: IQuiz) => void;
};

const CreateEditQuiz = ({
  closeDialog,
  quizData,
  organization,
  selectQuiz,
}: Props) => {
  const { data: user } = useUserQuery();
  const { data = [] } = useDepartmentsQuery();
  const isEdit = Boolean(quizData);

  const { handleSubmit, control } = useForm<IQuizForm>({
    defaultValues: {
      name: quizData?.name ?? '',
      department: quizData?.department,
      description: quizData?.description ?? '',
      organization: quizData?.organization ?? organization,
    },
  });

  const isEditing = Boolean(quizData);
  const { mutateAsync: createQuiz, isLoading: addLoading } =
    useCreateQuizMutation();
  const { mutateAsync: updateQuiz, isLoading: editLoading } =
    useUpdateQuizMutation();
  const loading = addLoading || editLoading;

  const onSubmit = async (values: IQuizForm) => {
    try {
      if (isEdit) {
        await updateQuiz({ ...values, id: quizData?.id as string });
      } else {
        const newQuiz = await createQuiz({
          ...values,
          created_by: user?.id as string,
        });
        selectQuiz?.(newQuiz);
      }
      closeDialog();
    } catch (error) {
      console.log(error);
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
          <UIInput
            label="Quiz Name"
            id="quiz-name"
            placeholder="Enter Quiz name"
            onChange={onChange}
            value={value}
            error={errors?.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={'department'}
        rules={{ required: 'Department is require' }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <UISelect onValueChange={onChange} value={value}>
            <UISelect.Trigger
              placeholder="Select Department"
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
          <UITextarea
            label="Description"
            id="quiz_description"
            placeholder="Enter Quiz description"
            onChange={onChange}
            value={value}
            error={errors?.description?.message}
          />
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
