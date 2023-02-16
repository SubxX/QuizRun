import { createContext, ReactNode, useContext, useMemo } from 'react';
import { IOrganization } from '@web/api/organization.api';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorView, NotFoundView, UIButton } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';
import { useOrganizationDetailsQuery } from '@web/queries/organization.query';
import Loader from './Loader';

const OrganizationDetails = createContext(
  {} as {
    organization?: IOrganization;
    id?: string;
  }
);

export const useOrgDetailsContext = () => useContext(OrganizationDetails);

const ContenxtWrapper = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useOrganizationDetailsQuery(id as string);
  const loading = isLoading;

  const err = error as Error;

  const values = useMemo(
    () => ({
      organization: data,
      id,
    }),
    [id, data]
  );

  if (loading) return <Loader />;

  if (err)
    return (
      <Container className="h-full flex-center">
        {err?.message === '404' ? (
          <NotFoundView>
            <UIButton
              css={{ marginTop: '$5' }}
              onClick={navigate.bind(this, -1)}
            >
              I understand take me back
            </UIButton>
          </NotFoundView>
        ) : (
          <ErrorView errorMessage={err?.message} />
        )}
      </Container>
    );

  return (
    <OrganizationDetails.Provider value={values}>
      {children}
    </OrganizationDetails.Provider>
  );
};

export default ContenxtWrapper;
