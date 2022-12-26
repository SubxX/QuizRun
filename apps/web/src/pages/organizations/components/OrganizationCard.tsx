import { UICard, UIText, UIBox, UIFlexBox } from '@quizrun/ui';
import { MdFoundation, MdOutlineLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Organization } from '@web/store/organization.store';

const OrganizationCard = ({ org }: { org: Organization }) => {
  return (
    <UICard hover as={Link} to={`/organization/${org.id}`}>
      <UICard.Content
        css={{
          color: '$light-white',
          fontSize: '$xs',
        }}
      >
        <UIText fontSize="xl" color="white-muted" weight="medium">
          {org.name}
        </UIText>
        <UIText as="span" css={{ marginTop: '$2', display: 'block' }}>
          {org.description}
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
          <UIText>{new Date(org.created_at).getFullYear()}</UIText>
        </UIBox>

        {/* <UIFlexBox items="center" gap="2">
          <MdOutlineLocationOn color="white" size={18} />
          <UIText>Sughandhya, India WestBengal</UIText>
        </UIFlexBox> */}
      </UICard.Content>
    </UICard>
  );
};

export default OrganizationCard;
