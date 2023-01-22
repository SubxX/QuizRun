import {
  UICard,
  UIChip,
  UIBox,
  UIText,
  UIFlexBox,
  UIIconButton,
  UIAlertDialog,
} from '@quizrun/ui';

import { IQuestion } from '@web/api/questions.api';
import { BiTrash } from 'react-icons/bi';
import { useDeleteQuestionMutation } from '@web/queries/questions.queries';
import { ReactNode } from 'react';

const QuestionCard = ({
  name,
  description,
  answers,
  id,
  quiz,
  children,
}: IQuestion & { children: ReactNode }) => {
  const { mutateAsync: deleteQuestion, isLoading } =
    useDeleteQuestionMutation();

  return (
    <UICard css={{ background: '$card' }}>
      <UICard.Content css={{ display: 'flex', gap: '$4' }}>
        {children}
        <UIBox css={{ spaceY: '$2', flex: '1' }}>
          <UIFlexBox items="center" justify="between">
            <UIText fontSize="base">{name}</UIText>
            <UIAlertDialog
              subtitle="You are about to delete this question"
              onResolve={deleteQuestion.bind(this, { id, quiz })}
            >
              <div>
                <UIIconButton size="sm">
                  <BiTrash />
                </UIIconButton>
              </div>
            </UIAlertDialog>
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
