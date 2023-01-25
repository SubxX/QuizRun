import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorView, NotFoundView, UIButton, LoaderView } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import { useGetQuizByIdQuery } from '@web/queries/quiz.queries';
import { IQuiz } from '@web/api/quiz.api';

const QuizDetails = createContext(
  {} as {
    quiz?: IQuiz;
    id?: string;
  }
);

export const useQuizDetailsContext = () => useContext(QuizDetails);

const ContenxtWrapper = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id as string);
  const err = error as Error;

  const values = useMemo(
    () => ({
      id,
      quiz,
    }),
    [id, quiz]
  );

  if (isLoading) return <LoaderView />;

  if (err)
    return (
      <Container className="h-full flex-center">
        {err?.message === '404' ? (
          <NotFoundView>
            <UIButton
              css={{ marginTop: '$5' }}
              onClick={navigate.bind(this, -1)}
            >
              I understand take me back
            </UIButton>
          </NotFoundView>
        ) : (
          <ErrorView errorMessage={err?.message} />
        )}
      </Container>
    );

  return <QuizDetails.Provider value={values}>{children}</QuizDetails.Provider>;
};

export default ContenxtWrapper;
