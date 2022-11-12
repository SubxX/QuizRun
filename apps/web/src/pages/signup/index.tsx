import { UIInput, UIButton, UICard, UISeparator } from '@quizrun/ui';
import { IoDocument } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';

const Signup = () => {
  return (
    <UICard as="form" css={{ width: '100%', maxWidth: '300px' }}>
      <UICard.Header
        Icon={IoDocument}
        title="Sign up"
        subtitle="Become a member - so that we can store your quiz history."
      />

      <UICard.Content css={{ spaceY: '$2' }}>
        <UIInput
          label="Email"
          type="email"
          placeholder="Enter email"
          id="email"
          autoFocus={true}
          startAdornment={<MdAlternateEmail className="opacity-50" />}
        />

        <UIInput
          label="Password"
          type="password"
          placeholder="Enter password"
          id="password"
          startAdornment={<MdLockOutline className="opacity-50" />}
        />

        <UIInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          id="confirm-password"
          startAdornment={<MdLockOutline className="opacity-50" />}
        />

        <UIButton fullWidth css={{ marginTop: '$4' }}>
          Become a member
        </UIButton>

        <UISeparator css={{ marginTop: '$4' }} />

        <span className="block text-center text-xs mt-3 text-white text-opacity-30">
          Already have an account ?{' '}
          <Link to="/signin" className="text-primary cursor-pointer">
            Login
          </Link>
        </span>
      </UICard.Content>
    </UICard>
  );
};

export default Signup;
