import { UIInput, UIButton, Card } from '@quizrun/ui';
import { IoDocument } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <form className="w-full max-w-[300px]">
      <Card>
        <Card.Header
          Icon={IoDocument}
          title="Sign in"
          subtitle="Already a member - plase login to view your taken quizes."
        />

        <Card.Content>
          <UIInput
            label="Email"
            type="email"
            placeholder="Enter email"
            id="email"
            autoFocus={true}
          />

          <UIInput
            containerClassName="mt-2"
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
          />

          <UIButton type="submit" className=" w-full mt-4">
            Login
          </UIButton>

          <hr className="border-white border-opacity-[0.15] mt-5" />

          <span className="block text-center text-xs mt-3 text-white text-opacity-30">
            Dont have an account ?{' '}
            <Link to="/signup" className="text-primary cursor-pointer">
              Signup
            </Link>
          </span>
        </Card.Content>
      </Card>
    </form>
  );
};

export default Signin;
