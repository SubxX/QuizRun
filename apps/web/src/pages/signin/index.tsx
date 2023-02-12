import {
  UIInput,
  UIButton,
  UICard,
  UISeparator,
  UIText,
  useBoolean,
  UIBox,
} from '@quizrun/ui';
import { IoDocument } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';
import useAuth from '@web/hooks/useAuth';

type SigninForm = {
  email: string;
  password: string;
};

const Signin = () => {
  const { login } = useAuth();
  const { value: loading, set: setLoading } = useBoolean();
  const { control, handleSubmit, setValue } = useForm<SigninForm>();

  const onSubmit = async ({ email, password }: SigninForm) => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function useTestAccount() {
    const payload = { email: 'john.doe@gmail.com', password: 'password' };
    setValue('email', payload.email);
    setValue('password', payload.password);
    onSubmit(payload);
  }

  return (
    <UIBox css={{ width: '100%', maxWidth: '300px' }}>
      <UICard as="form" onSubmit={handleSubmit(onSubmit)}>
        <UICard.Header
          Icon={IoDocument}
          title="Sign in"
          subtitle="Already a member - plase login to view your taken quizes."
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

          <UIButton
            type="submit"
            fullWidth
            css={{ marginTop: '$4' }}
            loading={loading}
          >
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
            <UIText as={Link} to="/auth/signup" color="primary">
              Signup
            </UIText>
          </UIText>
        </UICard.Content>
      </UICard>

      <UIBox css={{ textAlign: 'center', marginTop: '$4' }}>
        <UIBox
          as="button"
          disabled={loading}
          css={{
            fontSize: '$xs',
            color: '$light-white',
            cursor: !loading ? 'pointer' : 'not-allowed',
          }}
          onClick={useTestAccount}
        >
          Use test account
        </UIBox>
      </UIBox>
    </UIBox>
  );
};

export default Signin;
