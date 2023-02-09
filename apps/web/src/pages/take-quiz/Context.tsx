import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useState,
  SetStateAction,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorView, NotFoundView, UIBox, UIButton } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import { useGetQuizByIdQuery } from '@web/queries/quiz.queries';
import { IQuiz } from '@web/api/quiz.api';
import { useGetQuizSubmissionQuery } from '@web/queries/take-quiz.util';
import { IQuizSubmission } from '@web/api/take-quiz.api';
import Loader from './Loader';
import BgComponent from './components/BgComponent';

const QuizDetails = createContext(
  {} as {
    quiz?: IQuiz;
    id?: string;
    activeQuestion: number;
    setActiveQuestion: Dispatch<SetStateAction<number>>;
    submission?: IQuizSubmission | null;
  }
);

export const useQuizDetailsContext = () => useContext(QuizDetails);

const ContenxtWrapper = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(-1);

  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id as string);
  const { data: submission, isLoading: sLoading } = useGetQuizSubmissionQuery(
    id as string
  );

  const loading = isLoading || sLoading;
  const err = error as Error;

  const values = useMemo(
    () => ({
      id,
      quiz,
      activeQuestion,
      setActiveQuestion,
      submission,
    }),
    [id, quiz, activeQuestion, submission]
  );

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

  return (
    <QuizDetails.Provider value={values}>
      <Container className="flex-center h-full">
        <UIBox css={{ maxWidth: '320px', width: '100%' }}>
          {loading ? <Loader /> : children}
        </UIBox>
        <BgComponent />
      </Container>
    </QuizDetails.Provider>
  );
};

export default ContenxtWrapper;
