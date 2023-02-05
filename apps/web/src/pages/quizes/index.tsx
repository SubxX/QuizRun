import { UIGridBox, LoaderView } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { useGetAllQuizs } from '@web/queries/quiz.queries';
import QuizCard from '@web/shared/QuizCard';

const ALlQuizes = () => {
  const { data: quizes = [], isLoading } = useGetAllQuizs();

  if (isLoading) return <LoaderView />;

  return (
    <Container>
      <Header title="Quizes" />

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        {quizes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </UIGridBox>
    </Container>
  );
};

export default ALlQuizes;
