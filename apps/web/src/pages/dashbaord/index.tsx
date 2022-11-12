import { UICard, UIGridBox, UIBox, UIText } from '@quizrun/ui';
import { MdScience } from 'react-icons/md';
import { GiMechanicalArm, GiCircuitry } from 'react-icons/gi';

const Dashboard = () => {
  return (
    <UIBox
      css={{
        margin: '0 auto',
        padding: '$4',
        maxWidth: '896px',
        height: '100%',
      }}
    >
      <UIBox as="header" css={{ marginBottom: '$8' }}>
        <UIText as="h4" fontSize="lg" weight="medium" className="truncate">
          JIS Institute of Engineering
        </UIText>
      </UIBox>

      <UIGridBox columns={{ '@sm': 2, '@lg': 3 }} gap="3">
        <UICard>
          <UICard.Header
            Icon={MdScience}
            title="Computer science"
            subtitle="It is the study of computers and computational systems."
          />
        </UICard>

        <UICard>
          <UICard.Header
            Icon={GiMechanicalArm}
            title="Mechanical"
            subtitle="It is an engineering branch that combines engineering physics and mathematics."
          />
        </UICard>

        <UICard>
          <UICard.Header
            Icon={GiCircuitry}
            title="Electrical"
            subtitle="It is an engineering discipline concerned with the study, design, and application of electronic devices."
          />
        </UICard>
      </UIGridBox>
    </UIBox>
  );
};

export default Dashboard;
