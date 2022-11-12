import { UIInput, UIButton, UICard, UISeparator, UIText } from '@quizrun/ui';
import { IoDocument } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <UICard as="form" css={{ width: '100%', maxWidth: '300px' }}>
      <UICard.Header
        Icon={IoDocument}
        title="Sign in"
        subtitle="Already a member - plase login to view your taken quizes."
      />

      <UICard.Content css={{ spaceY: '$2' }}>
        <UIInput
          label="Email"
          type="email"
          placeholder="Enter email"
          id="email"
          autoFocus={true}
        />

        <UIInput
          label="Password"
          type="password"
          placeholder="Enter password"
          id="password"
        />

        <UIButton type="submit" fullWidth css={{ marginTop: '$4' }}>
          Login
        </UIButton>

        <UISeparator css={{ marginTop: '$4' }} />

        <UIText
          as="span"
          fontSize="xs"
          css={{
            color: 'rgba($white-rgb,0.4)',
            textAlign: 'center',
            display: 'block',
          }}
        >
          Dont have an account ?{' '}
          <UIText as={Link} to="/signup" color="primary">
            Signup
          </UIText>
        </UIText>
      </UICard.Content>
    </UICard>
  );
};

export default Signin;
