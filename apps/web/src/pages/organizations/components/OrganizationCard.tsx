import { UICard, UIText, UIBox, UIFlexBox } from '@quizrun/ui';
import { MdFoundation, MdOutlineLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

type Props = {
  id?: number;
};

const OrganizationCard = ({ id }: Props) => {
  return (
    <UICard hover as={Link} to={`/organization/${id}`}>
      <UICard.Content
        css={{
          color: '$light-white',
          fontSize: '$xs',
        }}
      >
        <UIText fontSize="xl" color="white-muted" weight="medium">
          Technique Polytechnic Institute
        </UIText>
        <UIText as="span" css={{ marginTop: '$2', display: 'block' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </UIText>

        <UIBox
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '$2',
            margin: '$2 0 $1 0',
          }}
        >
          <MdFoundation color="white" size={18} />
          <UIText>2016</UIText>
        </UIBox>

        <UIFlexBox items="center" gap="2">
          <MdOutlineLocationOn color="white" size={18} />
          <UIText>Sughandhya, India WestBengal</UIText>
        </UIFlexBox>
      </UICard.Content>
    </UICard>
  );
};

export default OrganizationCard;
