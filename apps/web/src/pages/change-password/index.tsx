import { UIButton, UICard, UIInput, useBoolean } from '@quizrun/ui';
import useAuth from '@web/hooks/useAuth';
import Container from '@web/layouts/dashboard-layout/components/Container';
import { useForm, Controller } from 'react-hook-form';
import { CgProfile } from 'react-icons/cg';
import { MdLockOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';

type FormI = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { control, handleSubmit, getValues } = useForm<FormI>();
  const { value: loading, set: setLoading } = useBoolean();
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotifications();

  const onSubmit = async ({ password }: FormI) => {
    try {
      setLoading(true);
      await changePassword({ password });
      notify(`Password changed successfully!`, 'success');
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex-center h-full w-full">
      <UICard
        as="form"
        css={{ maxWidth: '300px', margin: '0 auto 0 auto', width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <UICard.Header title="Change password" Icon={CgProfile} />

        <UICard.Content css={{ spaceY: '$2' }}>
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
              required: 'Password is required',
              validate: (confirmPassword: string) => {
                if (
                  confirmPassword &&
                  confirmPassword !== getValues('password')
                )
                  return 'Password mismatch';
                return true;
              },
            }}
            render={({
              field: { onChange, value = '' },
              formState: { errors },
            }) => (
              <UIInput
                onChange={onChange}
                value={value}
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                label="Confirm Password"
                startAdornment={<MdLockOutline />}
                error={errors?.confirmPassword?.message}
                disabled={loading}
              />
            )}
          />

          <UIButton fullWidth css={{ marginTop: '$4' }} type="submit">
            Update
          </UIButton>
          <UIButton
            fullWidth
            css={{ marginTop: '$2' }}
            color="light"
            onClick={navigate.bind(this, -1)}
          >
            Cancel
          </UIButton>
        </UICard.Content>
      </UICard>
    </Container>
  );
};

export default ChangePassword;
