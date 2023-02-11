import { UICard } from '@quizrun/ui';
import { useMemo } from 'react';

type Props = {
  cardCount?: number;
};

const CardsSkeletonLoader = ({ cardCount = 6 }: Props) => {
  const array = useMemo(() => new Array(cardCount).fill(null), [cardCount]);
  return (
    <>
      {array.map((a, i) => (
        <UICard
          key={`loader-card-${i}`}
          css={{
            height: 160,
            animationDelay: `${0.05 * i}s`,
          }}
          loading
        />
      ))}
    </>
  );
};

export default CardsSkeletonLoader;
