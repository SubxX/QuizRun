import { UIButton } from '@web/ui';
import { MdFileCopy } from 'react-icons/md';

const NoQuizes = () => {
  return (
    <div className="h-[inherit] flex items-center justify-center text-center">
      <div>
        <MdFileCopy size={50} className="inline-block opacity-50" />
        <span className="block my-4 text-2xl text-custom-white">
          No Quizes taken
        </span>
        <UIButton>Take a Quiz</UIButton>
      </div>
    </div>
  );
};

export default NoQuizes;
