import { UIBox, UIButton, UICard, UIText } from '@quizrun/ui';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const EmailConfirmed = () => {
  const navigate = useNavigate();

  return (
    <UICard
      css={{
        width: '100%',
        maxWidth: '300px',
        textAlign: 'center',
        paddingTop: '0',
      }}
    >
      <UICard.Content>
        <UIBox css={{ color: '$primary', marginTop: '-40px' }}>
          <BsCheckCircleFill size={80} />
        </UIBox>
        <UIText fontSize="3xl" color="primary">
          Congratulations!
        </UIText>
        <UIText fontSize="sm" color="light-white">
          Your email has already been confirmed. You can now signin to the app.
        </UIText>

        <UIButton css={{ marginTop: '$4' }} onClick={() => navigate('/')}>
          Take me to dashboard
        </UIButton>
      </UICard.Content>
    </UICard>
  );
};

export default EmailConfirmed;
