import {
  ToolTip,
  UIAvatar,
  UIBox,
  UICard,
  UIFlexBox,
  UIText,
} from '@quizrun/ui';
import { Link, useNavigate } from 'react-router-dom';
import { IQuiz } from '@web/api/quiz.api';
import { ReactNode, useMemo } from 'react';
import { preventDefault } from '@web/utils/app.utils';

type Props = {
  quiz: IQuiz;
  actions?: ReactNode;
  footerActions?: ReactNode;
  as?: any;
};

const QuizCard = ({ quiz, actions, footerActions, as = Link }: Props) => {
  const quizId = quiz.id;
  const organization = quiz.organization;
  const navigate = useNavigate();

  const visitOrganization = (e: any) => {
    e.stopPropagation();
    preventDefault(e);

    if (typeof organization === 'string') return;
    navigate(`/organization/${organization?.id}`);
  };

  const props = useMemo(
    () => (as === Link ? { as, to: `/quiz/${quizId}`, hover: true } : { as }),
    [quizId, as]
  );

  return (
    <UICard {...props}>
      <UICard.Header title={quiz.name} actions={actions} />

      <UICard.Content css={{ color: '$light-white', fontSize: '$xs' }}>
        <UIText css={{ lineClamper: 3, minHeight: 52, marginBottom: '$2' }}>
          {quiz.description}
        </UIText>

        <UIFlexBox items="center" justify="between">
          <UIText fontSize="xs" color="light-white">
            {quiz?.questions?.length ?? 0} Questions
          </UIText>
          {organization && typeof organization !== 'string' && (
            <ToolTip title={organization?.name} side="bottom">
              <UIBox>
                <UIAvatar
                  onClick={visitOrganization}
                  aria-label={`Visit ${organization?.name}`}
                >
                  {organization?.name}
                </UIAvatar>
              </UIBox>
            </ToolTip>
          )}
        </UIFlexBox>

        {footerActions}
      </UICard.Content>
    </UICard>
  );
};

export default QuizCard;
