import { useQuizDetailsContext } from '../Context';
import { UIBox, UIButton, UIFlexBox, UIText } from '@quizrun/ui';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useSubmitQuizMutation } from '@web/queries/take-quiz.util';
import { useUserQuery } from '@web/queries/auth.queries';

const QuizQuestions = () => {
  const { data: user } = useUserQuery();
  const { quiz, activeQuestion, setActiveQuestion } = useQuizDetailsContext();
  const { mutateAsync, isLoading } = useSubmitQuizMutation();

  const { control, watch } = useForm();
  const values = watch();

  const checkAnswers = (payload: Record<string, number>) => {
    const result = { correct: 0, incorrect: 0 };
    quiz?.questions?.reduce((acc, qs) => {
      const correctAnswer = qs.correctAnswer;
      payload[qs.id] === correctAnswer
        ? (acc.correct += 1)
        : (acc.incorrect += 1);
      return acc;
    }, result);
    return result;
  };

  const backToPrev = () => setActiveQuestion((prev) => prev - 1);

  const next = () => {
    const totalQuestions = quiz?.questions?.length ?? 0;
    const current = activeQuestion + 1;
    // Submit
    if (totalQuestions === current) {
      const data = checkAnswers(values);
      mutateAsync({
        quiz: quiz?.id as string,
        user: user?.id as string,
        ...data,
      });
      return;
    }
    setActiveQuestion((prev) => prev + 1);
  };

  return (
    <form>
      {quiz?.questions?.map((question, idx) =>
        idx === activeQuestion ? (
          <UIBox css={{ width: '100%' }} key={question.id}>
            <UIText fontSize="2xl">{question.name}</UIText>
            <UIText fontSize="xs" color="light-white">
              {question.description}
            </UIText>

            <UIBox as="ul" css={{ spaceY: '$2', marginTop: '$4' }}>
              {question.answers.map((ans, idx) => (
                <Controller
                  key={`${question.id}-${idx}`}
                  control={control}
                  name={question.id}
                  render={({ field: { onChange, value } }) => (
                    <li>
                      <UIButton
                        color="light"
                        fullWidth
                        disabled={value === idx}
                        onClick={() => onChange({ target: { value: idx } })}
                      >
                        {ans.value}
                      </UIButton>
                    </li>
                  )}
                />
              ))}
            </UIBox>

            <UIFlexBox
              justify="between"
              items="center"
              css={{ marginTop: '$4' }}
            >
              <UIButton
                color="light"
                onClick={backToPrev}
                disabled={activeQuestion === 0}
              >
                Back
              </UIButton>
              <UIButton
                disabled={!Object.hasOwn(values, question.id)}
                onClick={next}
                loading={isLoading}
              >
                Next
              </UIButton>
            </UIFlexBox>
          </UIBox>
        ) : null
      )}
    </form>
  );
};

export default QuizQuestions;
