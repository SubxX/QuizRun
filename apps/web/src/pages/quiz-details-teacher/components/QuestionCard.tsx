import {
  UICard,
  UIChip,
  UIBox,
  UIText,
  UIFlexBox,
  UIIconButton,
} from '@quizrun/ui';
import { MdDragIndicator } from 'react-icons/md';
import { IQuestion } from '../interface/quiz.interface';
import { BiTrash } from 'react-icons/bi';

const QuestionCard = ({
  name,
  description,
  answers,
}: Omit<IQuestion, 'correctAnswer'>) => {
  return (
    <UICard>
      <UICard.Content css={{ display: 'flex', gap: '$4' }}>
        <button>
          <MdDragIndicator />
        </button>
        <UIBox css={{ spaceY: '$2', flex: '1' }}>
          <UIFlexBox items="center" justify="between">
            <UIText fontSize="base">{name}</UIText>
            <UIIconButton size="sm">
              <BiTrash />
            </UIIconButton>
          </UIFlexBox>

          {Boolean(description) && (
            <UIText fontSize="sm" color="light-white">
              {description}
            </UIText>
          )}
          <div />
          <UIChip>{answers.length} Answers</UIChip>
        </UIBox>
      </UICard.Content>
    </UICard>
  );
};

export default QuestionCard;
