import { MdScience } from 'react-icons/md';
import { UICard } from '@quizrun/ui';
import { GiMechanicalArm, GiCircuitry } from 'react-icons/gi';

const DepartmentList = ({ departments }: any) => {
  return (
    <>
      {departments.map((d: any) => {
        const department = d?.department_id;
        return (
          <UICard key={department.id}>
            <UICard.Header
              // Icon={MdScience}
              title={department?.name ?? ''}
              subtitle={department?.description ?? ''}
            />
          </UICard>
        );
      })}
      {/* <UICard>
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
      </UICard> */}
    </>
  );
};

export default DepartmentList;
