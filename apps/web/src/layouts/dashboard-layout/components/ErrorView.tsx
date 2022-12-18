import { UIBox, UIText } from '@quizrun/ui';

const ErrorView = () => {
  return (
    <UIBox
      css={{
        height: '100vh',
        padding: '$4',
        textAlign: 'center',
      }}
      className="flex-center"
    >
      <UIBox css={{ maxWidth: '320px', width: '100%', spaceY: '$2' }}>
        <UIText fontSize="2xl">Something went wrong</UIText>
        <UIText fontSize="sm" color="light-white">
          Seems like something went wrong this is not your fault please try
          refreshing your page.
        </UIText>
      </UIBox>
    </UIBox>
  );
};

export default ErrorView;
