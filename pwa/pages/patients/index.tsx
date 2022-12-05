import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/patient/List";
import { PagedCollection } from "../../types/collection";
import { Patient } from "../../types/Patient";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getPatients = async () =>
  await fetch<PagedCollection<Patient>>("/patients");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: patients, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Patient>> | undefined
  >("patients", getPatients);
  const collection = useMercure(patients, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Patient List</title>
        </Head>
      </div>
      <List patients={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("patients", getPatients);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
