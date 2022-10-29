import { UIInput, UIButton, Card } from '@quizrun/ui';
import { IoDocument } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';

const Signup = () => {
  return (
    <form className="w-full max-w-[300px]">
      <Card>
        <Card.Header
          Icon={IoDocument}
          title="Sign up"
          subtitle="Become a member - so that we can store your quiz history."
        />

        <Card.Content>
          <UIInput
            label="Email"
            type="email"
            placeholder="Enter email"
            id="email"
            autoFocus={true}
            startAdornment={<MdAlternateEmail className="opacity-50" />}
          />

          <UIInput
            containerClassName="mt-2"
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            startAdornment={<MdLockOutline className="opacity-50" />}
          />

          <UIInput
            containerClassName="mt-2"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            id="confirm-password"
            startAdornment={<MdLockOutline className="opacity-50" />}
          />

          <UIButton className=" w-full mt-4">Become a member</UIButton>

          <hr className="border-white border-opacity-[0.15] mt-5" />

          <span className="block text-center text-xs mt-3 text-white text-opacity-30">
            Already have an account ?{' '}
            <Link to="/signin" className="text-primary cursor-pointer">
              Login
            </Link>
          </span>
        </Card.Content>
      </Card>
    </form>
  );
};

export default Signup;
