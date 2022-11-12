import { UICard } from '@quizrun/ui';
import { MdScience } from 'react-icons/md';
import { GiMechanicalArm, GiCircuitry } from 'react-icons/gi';

const Dashboard = () => {
  return (
    <div className="mx-auto p-4 max-w-4xl h-full">
      <header className="mb-8">
        <h4 className="text-lg font-medium truncate">
          JIS Institute of Engineering
        </h4>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </div>
  );
};

export default Dashboard;
