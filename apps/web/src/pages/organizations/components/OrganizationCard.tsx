import { UICard, UIText, UIBox } from '@quizrun/ui';
import { MdFoundation } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IOrganization } from '@web/store/organization.store';

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
          css={{
            marginTop: '$2',
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': 3,
            lineClamp: 3,
            '-webkit-box-orient': 'vertical',
            minHeight: 52,
          }}
        >
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
