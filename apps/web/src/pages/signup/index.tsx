import {
  UIInput,
  UIButton,
  UICard,
  UISeparator,
  UIText,
  useBoolean,
} from '@quizrun/ui';
import { IoDocument } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';
import useAuth from '@web/hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { value: loading, set: setLoading } = useBoolean();
  const { signup } = useAuth();
  const { control, handleSubmit, getValues } = useForm<SignUpForm>();

  const submitForm = async (payload: SignUpForm) => {
    const { email, password, confirmPassword, ...rest } = payload;
    try {
      setLoading(true);
      await signup(email, password, rest);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UICard
      as="form"
      css={{ width: '100%', maxWidth: '300px' }}
      onSubmit={handleSubmit(submitForm)}
    >
      <UICard.Header
        Icon={IoDocument}
        title="Sign up"
        subtitle="Become a member - so that we can store your quiz history."
      />

      <UICard.Content css={{ spaceY: '$2' }}>
        <Controller
          name="name"
          rules={{ required: 'Name is required' }}
          control={control}
          render={({
            field: { onChange, value = '' },
            formState: { errors },
          }) => (
            <UIInput
              onChange={onChange}
              value={value}
              label="Name"
              type="text"
              placeholder="Enter name"
              id="name"
              autoFocus={true}
              startAdornment={<MdAlternateEmail />}
              error={errors?.email?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'Invalid email',
            },
          }}
          control={control}
          render={({
            field: { onChange, value = '' },
            formState: { errors },
          }) => (
            <UIInput
              onChange={onChange}
              value={value}
              label="Email"
              type="email"
              placeholder="Enter email"
              id="email"
              autoFocus={true}
              startAdornment={<MdAlternateEmail />}
              error={errors?.email?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({
            field: { onChange, value = '' },
            formState: { errors },
          }) => (
            <UIInput
              onChange={onChange}
              value={value}
              label="Password"
              type="password"
              placeholder="Enter password"
              id="password"
              startAdornment={<MdLockOutline />}
              error={errors?.password?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: 'Confirm Password is required',
            validate: (value) => {
              return value !== getValues('password')
                ? 'Please confirm password'
                : true;
            },
          }}
          render={({
            field: { onChange, value = '' },
            formState: { errors },
          }) => (
            <UIInput
              onChange={onChange}
              value={value}
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              id="confirm-password"
              startAdornment={<MdLockOutline />}
              error={errors?.confirmPassword?.message}
              disabled={loading}
            />
          )}
        />

        <UIButton
          type="submit"
          fullWidth
          css={{ marginTop: '$4' }}
          loading={loading}
        >
          Become a member
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
          Already have an account ?{' '}
          <UIText as={Link} to="/auth/signin" color="primary">
            Login
          </UIText>
        </UIText>
      </UICard.Content>
    </UICard>
  );
};

export default Signup;
