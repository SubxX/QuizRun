import { UIBox } from '@quizrun/ui';

const Loader = () => {
  return (
    <>
      <UIBox
        loading
        css={{ height: '48px', width: '100%', marginBottom: 20 }}
      />
      <UIBox loading css={{ height: '218px', width: '100%' }} />
    </>
  );
};

export default Loader;
