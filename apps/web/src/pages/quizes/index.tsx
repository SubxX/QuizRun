import { UIGridBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { useGetAllQuizs } from '@web/queries/quiz.queries';
import CardsSkeletonLoader from '@web/shared/CardsSkeletonLoader';
import QuizCard from '@web/shared/QuizCard';

const ALlQuizzes = () => {
  const { data: quizzes = [], isLoading } = useGetAllQuizs();
  return (
    <Container>
      <Header title="Quizzes" />

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        {isLoading && <CardsSkeletonLoader />}

        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </UIGridBox>
    </Container>
  );
};

export default ALlQuizzes;
