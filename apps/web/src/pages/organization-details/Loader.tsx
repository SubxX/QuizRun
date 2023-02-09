import Container from '@web/layouts/dashboard-layout/components/Container';
import CardsSkeletonLoader from '@web/shared/CardsSkeletonLoader';
import { UIGridBox, UIFlexBox, UIBox } from '@quizrun/ui';

const Loader = () => {
  return (
    <Container>
      <UIFlexBox gap={3} items="center" css={{ marginBottom: '$8' }}>
        <UIBox loading css={{ height: 40, width: 40, flex: 'none' }} />
        <UIBox
          loading
          css={{
            height: 27,
            maxWidth: 300,
            width: '100%',
            '@md': { height: 36 },
          }}
        />
      </UIFlexBox>

      <UIBox loading css={{ height: 100, width: '100%' }} />

      <UIBox loading css={{ margin: '$6 0', height: 27, width: 65 }} />

      <UIGridBox columns={{ '@md': '2', '@lg': '3' }} gap="3">
        <CardsSkeletonLoader />
      </UIGridBox>
    </Container>
  );
};

export default Loader;
