import { UICard, UIText, UIBox } from '@quizrun/ui';
import { MdFoundation } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IOrganization } from '@web/api/organization.api';

const OrganizationCard = ({ org }: { org: IOrganization }) => {
  return (
    <UICard hover as={Link} to={`/organization/${org.id}`}>
      <UICard.Content
        css={{
          color: '$light-white',
          fontSize: '$xs',
        }}
      >
        <UIText
          fontSize="xl"
          color="white-muted"
          weight="medium"
          className="truncate"
        >
          {org.name}
        </UIText>
        <UIText
          as="span"
          css={{ lineClamper: 3, marginTop: '$2', minHeight: 54 }}
        >
          {org.description}
        </UIText>

        <UIBox
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '$2',
            margin: '$2 0 0 0',
          }}
        >
          <MdFoundation color="white" size={18} />
          <UIText>{new Date(org.created_at as string).getFullYear()}</UIText>
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
