import { UIBox } from '@quizrun/ui';
import img from '@web/assets/grid.svg';

const BgComponent = () => {
  return (
    <>
      <UIBox
        css={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #34B27B 0%, rgba(217, 217, 217, 0) 100%)',
          opacity: 0.02,
          width: '100%',
          height: '100%',
          position: 'absolute',
          maxWidth: 800,
          maxHeight: 800,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: -1,
        }}
      />
      <UIBox
        css={{
          background: `url(${img})`,
          opacity: 0.1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          maxWidth: 300,
          maxHeight: 300,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: -2,
        }}
      />
    </>
  );
};

export default BgComponent;
