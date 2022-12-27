import { UIFlexBox, NotFoundView } from '@quizrun/ui';

const NotFoundPage = () => {
  return (
    <UIFlexBox
      css={{ padding: '$4', minHeight: '100vh' }}
      items="center"
      justify="center"
    >
      <NotFoundView />
    </UIFlexBox>
  );
};

export default NotFoundPage;
