import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
} from 'react';
import { IOrganization } from '@web/store/organization.store';
import useFetch from '@web/hooks/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrganizationDetails } from '@web/api/organization.api';
import { ErrorView, NotFoundView, UIButton, LoaderView } from '@quizrun/ui';
import Container from '@web/layouts/dashboard-layout/components/Container';

const OrganizationDetails = createContext(
  {} as {
    organization?: IOrganization;
    id?: string;
    mutateData: Dispatch<SetStateAction<IOrganization | undefined>>;
  }
);

export const useOrgDetailsContext = () => useContext(OrganizationDetails);

const ContenxtWrapper = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, data, error, mutateData } = useFetch(
    () => getOrganizationDetails(id as string),
    [id]
  );

  const values = useMemo(
    () => ({
      organization: data,
      id,
      mutateData,
    }),
    [id, data]
  );

  if (loading) return <LoaderView />;

  if (error)
    return (
      <Container className="h-full flex-center">
        {error?.message === '404' ? (
          <NotFoundView>
            <UIButton
              css={{ marginTop: '$5' }}
              onClick={navigate.bind(this, -1)}
            >
              I understand take me back
            </UIButton>
          </NotFoundView>
        ) : (
          <ErrorView errorMessage={error?.message} />
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
