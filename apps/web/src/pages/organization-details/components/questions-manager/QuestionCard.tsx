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
import { FaEdit } from 'react-icons/fa';
import { useDeleteQuestionMutation } from '@web/queries/questions.queries';
import { ReactNode } from 'react';

type Props = {
  question: IQuestion;
  children: ReactNode;
  openEditQuestion: (question: IQuestion) => void;
};

const QuestionCard = ({ question, children, openEditQuestion }: Props) => {
  const { name, description, answers, id, quiz } = question;
  const { mutateAsync: deleteQuestion } = useDeleteQuestionMutation();

  return (
    <UICard css={{ background: '$card' }}>
      <UICard.Content css={{ display: 'flex', gap: '$4' }}>
        {children}
        <UIBox css={{ spaceY: '$2', flex: '1' }}>
          <UIFlexBox justify="between">
            <UIText fontSize="base">{name}</UIText>

            <UIFlexBox gap="2">
              <UIIconButton
                size="sm"
                onClick={openEditQuestion.bind(this, question)}
              >
                <FaEdit />
              </UIIconButton>
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
