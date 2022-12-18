import { UIInput, UIButton, UICard, UISeparator, UIText } from '@quizrun/ui';
import { IoDocument } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';
import useAuth from '@web/hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { control, handleSubmit, getValues } = useForm<SignUpForm>();

  const submitForm = async (payload: SignUpForm) => {
    try {
      setLoading(true);
      setTimeout(() => setLoading(false), 2500);
      await signup(payload.email, payload.password);
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
              startAdornment={<MdAlternateEmail className="opacity-50" />}
              error={errors?.email?.message}
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
              startAdornment={<MdLockOutline className="opacity-50" />}
              error={errors?.password?.message}
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
              startAdornment={<MdLockOutline className="opacity-50" />}
              error={errors?.confirmPassword?.message}
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
