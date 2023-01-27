import { UIBox } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import Header from '@web/layouts/dashboard-layout/components/Header';
import { useGetQuizByIdQuery } from '@web/queries/quiz.queries';
import { useGetQuizSubmissionsQuery } from '@web/queries/take-quiz.util';
import { useParams } from 'react-router-dom';

const QuizLeaderboard = () => {
  const { id } = useParams();
  const { data: quiz } = useGetQuizByIdQuery(id as string);
  const { data: submissions } = useGetQuizSubmissionsQuery(id as string);

  return (
    <Container>
      <Header title={quiz?.name ?? ''} subtitle="Leaderboard" backButton />

      <table>
        <tbody>
          <UIBox as="tr" css={{ fontSize: '$sm' }}>
            <th>Name</th>
            <th>Taken at</th>
            <th>Correct</th>
          </UIBox>
          {submissions?.map((s) => (
            <UIBox
              as="tr"
              css={{ fontSize: '$xs', color: '$custom-white' }}
              key={s.id}
            >
              <td>John Doe</td>
              <td>{new Date(s.created_at as string).toDateString()}</td>
              <td>{s.correct}</td>
            </UIBox>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default QuizLeaderboard;
