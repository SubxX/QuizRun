import { UIBox, UIText } from '../components';

const ErrorView = ({ title, description, errorMessage }: any) => (
  <UIBox
    className="flex-center"
    css={{
      padding: '$4',
      height: '100%',
    }}
  >
    <UIBox css={{ spaceY: '$2', textAlign: 'center', maxWidth: '400px' }}>
      <UIText fontSize="2xl" weight="bold">
        {title ?? 'We hit a roadblocker !'}
      </UIText>
      <UIText fontSize="sm" color="white-muted">
        {description ??
          `This seems like an internal problem please try refresing this page
          if it still occures please contact our suppport team.`}
      </UIText>
      {Boolean(errorMessage) && (
        <>
          <UIText fontSize="sm" color="white-muted">
            error message received from backend
          </UIText>
          <UIBox
            as="code"
            css={{
              padding: '$2 $3',
              borderRadius: '$lg',
              background: '$blackish',
              display: 'inline-block',
              fontSize: '$xs',
            }}
          >
            {errorMessage}
          </UIBox>
        </>
      )}
    </UIBox>
  </UIBox>
);

export default ErrorView;
